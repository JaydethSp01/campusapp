# Campus App - Instalador Automático para Windows
# Ejecutar como Administrador

param(
    [switch]$SkipDatabase = $false,
    [switch]$SkipDependencies = $false
)

# Configuración de colores
$Host.UI.RawUI.ForegroundColor = "White"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    } else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($message) { Write-ColorOutput Green "✓ $message" }
function Write-Error($message) { Write-ColorOutput Red "✗ $message" }
function Write-Warning($message) { Write-ColorOutput Yellow "⚠ $message" }
function Write-Info($message) { Write-ColorOutput Cyan "ℹ $message" }

# Verificar si se ejecuta como administrador
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "Este script debe ejecutarse como Administrador"
    Write-Info "Haz clic derecho en PowerShell y selecciona 'Ejecutar como administrador'"
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Info "========================================"
Write-Info "    CAMPUS APP - INSTALADOR AUTOMATICO"
Write-Info "========================================"
Write-Info ""

# Función para verificar si un comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Función para instalar Node.js
function Install-NodeJS {
    Write-Info "Instalando Node.js..."
    try {
        $nodeUrl = "https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi"
        $nodeInstaller = "$env:TEMP\nodejs-installer.msi"
        
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller
        Start-Process msiexec.exe -Wait -ArgumentList "/i $nodeInstaller /quiet /norestart"
        Remove-Item $nodeInstaller
        
        # Actualizar PATH
        $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")
        
        Write-Success "Node.js instalado correctamente"
    } catch {
        Write-Error "Error instalando Node.js: $($_.Exception.Message)"
        exit 1
    }
}

# Función para instalar PostgreSQL
function Install-PostgreSQL {
    Write-Info "Instalando PostgreSQL..."
    try {
        $pgUrl = "https://get.enterprisedb.com/postgresql/postgresql-13.7-1-windows-x64.exe"
        $pgInstaller = "$env:TEMP\postgresql-installer.exe"
        
        Write-Info "Descargando PostgreSQL..."
        Invoke-WebRequest -Uri $pgUrl -OutFile $pgInstaller -UseBasicParsing
        
        Write-Info "Instalando PostgreSQL (esto puede tomar varios minutos)..."
        $installArgs = @(
            "--mode", "unattended",
            "--superpassword", "admin123",
            "--servicename", "postgresql",
            "--serviceaccount", "postgres",
            "--servicepassword", "admin123",
            "--enable-components", "server,pgAdmin,commandlinetools",
            "--disable-components", "stackbuilder"
        )
        
        Start-Process $pgInstaller -ArgumentList $installArgs -Wait
        
        # Esperar un poco para que se complete la instalación
        Start-Sleep -Seconds 10
        
        # Agregar PostgreSQL al PATH
        $pgPath = "C:\Program Files\PostgreSQL\13\bin"
        if (Test-Path $pgPath) {
            $env:PATH += ";$pgPath"
            [Environment]::SetEnvironmentVariable("PATH", $env:PATH, [EnvironmentVariableTarget]::Machine)
        }
        
        # Iniciar servicio PostgreSQL
        Write-Info "Iniciando servicio PostgreSQL..."
        Start-Service postgresql
        
        # Esperar a que el servicio esté listo
        $timeout = 60
        $elapsed = 0
        do {
            Start-Sleep -Seconds 2
            $elapsed += 2
            $service = Get-Service postgresql -ErrorAction SilentlyContinue
        } while ($service.Status -ne "Running" -and $elapsed -lt $timeout)
        
        if ($service.Status -eq "Running") {
            Write-Success "PostgreSQL instalado y ejecutándose correctamente"
        } else {
            Write-Warning "PostgreSQL instalado pero no se pudo iniciar automáticamente"
        }
        
        Remove-Item $pgInstaller -ErrorAction SilentlyContinue
    } catch {
        Write-Error "Error instalando PostgreSQL: $($_.Exception.Message)"
        Write-Info "Intenta instalar PostgreSQL manualmente desde: https://www.postgresql.org/download/windows/"
        exit 1
    }
}

# Función para instalar pgAdmin
function Install-pgAdmin {
    Write-Info "Instalando pgAdmin..."
    try {
        $pgAdminUrl = "https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v6.21/windows/pgadmin4-6.21-x64.exe"
        $pgAdminInstaller = "$env:TEMP\pgadmin-installer.exe"
        
        Invoke-WebRequest -Uri $pgAdminUrl -OutFile $pgAdminInstaller
        Start-Process $pgAdminInstaller -Wait -ArgumentList "--mode unattended --master-password admin123"
        Remove-Item $pgAdminInstaller
        
        Write-Success "pgAdmin instalado correctamente"
    } catch {
        Write-Error "Error instalando pgAdmin: $($_.Exception.Message)"
        exit 1
    }
}

# Función para crear base de datos
function New-CampusDatabase {
    Write-Info "Creando base de datos..."
    try {
        $env:PGPASSWORD = "admin123"
        
        # Esperar a que PostgreSQL esté completamente listo
        Write-Info "Esperando a que PostgreSQL esté listo..."
        $maxAttempts = 30
        $attempt = 0
        do {
            $attempt++
            try {
                & psql -U postgres -h localhost -c "SELECT 1;" 2>$null
                if ($LASTEXITCODE -eq 0) {
                    break
                }
            } catch {
                # Ignorar errores de conexión
            }
            Start-Sleep -Seconds 2
        } while ($attempt -lt $maxAttempts)
        
        if ($attempt -eq $maxAttempts) {
            Write-Error "No se pudo conectar a PostgreSQL después de $maxAttempts intentos"
            exit 1
        }
        
        # Crear base de datos
        Write-Info "Creando base de datos campusapp..."
        & psql -U postgres -h localhost -c "DROP DATABASE IF EXISTS campusapp;"
        & psql -U postgres -h localhost -c "CREATE DATABASE campusapp;"
        
        if ($LASTEXITCODE -ne 0) {
            throw "Error creando la base de datos"
        }
        
        # Ejecutar script de esquema
        Write-Info "Ejecutando script de esquema..."
        if (Test-Path "database\schema.sql") {
            & psql -U postgres -h localhost -d campusapp -f "database\schema.sql"
            if ($LASTEXITCODE -ne 0) {
                throw "Error ejecutando script de esquema"
            }
        } else {
            Write-Warning "Archivo database\schema.sql no encontrado"
        }
        
        # Ejecutar script de datos
        Write-Info "Ejecutando script de datos..."
        if (Test-Path "database\seed.sql") {
            & psql -U postgres -h localhost -d campusapp -f "database\seed.sql"
            if ($LASTEXITCODE -ne 0) {
                throw "Error ejecutando script de datos"
            }
        } else {
            Write-Warning "Archivo database\seed.sql no encontrado"
        }
        
        Write-Success "Base de datos creada y configurada correctamente"
    } catch {
        Write-Error "Error creando base de datos: $($_.Exception.Message)"
        Write-Info "Verifica que PostgreSQL esté ejecutándose y que los archivos de base de datos existan"
        exit 1
    }
}

# Función para instalar dependencias
function Install-Dependencies {
    Write-Info "Instalando dependencias del backend..."
    try {
        Set-Location "backend"
        & npm install
        if ($LASTEXITCODE -ne 0) {
            throw "Error instalando dependencias del backend"
        }
        Write-Success "Dependencias del backend instaladas"
        
        Set-Location "..\frontend"
        & npm install
        if ($LASTEXITCODE -ne 0) {
            throw "Error instalando dependencias del frontend"
        }
        Write-Success "Dependencias del frontend instaladas"
        
        Set-Location ".."
    } catch {
        Write-Error "Error instalando dependencias: $($_.Exception.Message)"
        exit 1
    }
}

# Función para iniciar servicios
function Start-Services {
    Write-Info "Iniciando servicios..."
    
    # Crear archivo .env si no existe
    if (-not (Test-Path "backend\.env")) {
        if (Test-Path "backend\env.example") {
            Copy-Item "backend\env.example" "backend\.env"
            Write-Success "Archivo .env creado"
        } else {
            Write-Warning "Archivo env.example no encontrado, creando .env básico"
            $envContent = @"
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campusapp
DB_USER=postgres
DB_PASSWORD=admin123

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
JWT_REFRESH_SECRET=tu_refresh_secret_muy_seguro_aqui

# Server
PORT=3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=1000
"@
            $envContent | Out-File -FilePath "backend\.env" -Encoding UTF8
        }
    }
    
    # Verificar que las dependencias estén instaladas
    if (-not (Test-Path "backend\node_modules")) {
        Write-Info "Instalando dependencias del backend..."
        Set-Location "backend"
        & npm install
        Set-Location ".."
    }
    
    if (-not (Test-Path "frontend\node_modules")) {
        Write-Info "Instalando dependencias del frontend..."
        Set-Location "frontend"
        & npm install
        Set-Location ".."
    }
    
    # Iniciar backend
    Write-Info "Iniciando backend en puerto 3000..."
    $backendScript = @"
cd '$PWD\backend'
Write-Host 'Iniciando backend...' -ForegroundColor Green
npm run dev
"@
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript
    
    # Esperar un poco para que el backend inicie
    Start-Sleep -Seconds 5
    
    # Iniciar frontend
    Write-Info "Iniciando frontend en puerto 8081..."
    $frontendScript = @"
cd '$PWD\frontend'
Write-Host 'Iniciando frontend...' -ForegroundColor Green
npm start
"@
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript
    
    Write-Success "Servicios iniciados"
}

# Verificar e instalar Node.js
if (-not (Test-Command "node")) {
    Write-Warning "Node.js no encontrado. Instalando..."
    Install-NodeJS
} else {
    Write-Success "Node.js ya está instalado"
}

# Verificar e instalar PostgreSQL
if (-not (Test-Command "psql")) {
    Write-Warning "PostgreSQL no encontrado. Instalando..."
    Install-PostgreSQL
} else {
    Write-Success "PostgreSQL ya está instalado"
}

# Verificar e instalar pgAdmin
if (-not (Test-Command "pgAdmin4")) {
    Write-Warning "pgAdmin no encontrado. Instalando..."
    Install-pgAdmin
} else {
    Write-Success "pgAdmin ya está instalado"
}

# Instalar dependencias si no se especifica --SkipDependencies
if (-not $SkipDependencies) {
    Install-Dependencies
}

# Crear base de datos si no se especifica --SkipDatabase
if (-not $SkipDatabase) {
    New-CampusDatabase
}

# Iniciar servicios
Start-Services

# Mostrar información final
Write-Info ""
Write-Info "========================================"
Write-Info "    INSTALACION COMPLETADA"
Write-Info "========================================"
Write-Info ""
Write-Success "Backend ejecutándose en: http://localhost:3000"
Write-Success "Frontend ejecutándose en: http://localhost:8081"
Write-Info ""
Write-Warning "CREDENCIALES DE ACCESO:"
Write-Info ""
Write-Info "ADMINISTRADOR:"
Write-Info "  Email: admin@campusapp.com"
Write-Info "  Password: admin123"
Write-Info ""
Write-Info "DOCENTE:"
Write-Info "  Email: docente@campusapp.com"
Write-Info "  Password: docente123"
Write-Info ""
Write-Info "ESTUDIANTE:"
Write-Info "  Email: estudiante@campusapp.com"
Write-Info "  Password: estudiante123"
Write-Info ""
Write-Warning "CREDENCIALES DE BASE DE DATOS (pgAdmin):"
Write-Info "  Host: localhost"
Write-Info "  Puerto: 5432"
Write-Info "  Usuario: postgres"
Write-Info "  Password: admin123"
Write-Info "  Base de datos: campusapp"
Write-Info ""
Write-Success "Presiona cualquier tecla para continuar..."
Read-Host
