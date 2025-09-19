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
        
        Invoke-WebRequest -Uri $pgUrl -OutFile $pgInstaller
        Start-Process $pgInstaller -Wait -ArgumentList "--mode unattended --superpassword admin123 --servicename postgresql --serviceaccount postgres --servicepassword admin123"
        Remove-Item $pgInstaller
        
        # Iniciar servicio PostgreSQL
        Start-Service postgresql
        
        Write-Success "PostgreSQL instalado correctamente"
    } catch {
        Write-Error "Error instalando PostgreSQL: $($_.Exception.Message)"
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
        
        # Crear base de datos
        & psql -U postgres -h localhost -c "CREATE DATABASE campusapp;" 2>$null
        
        # Ejecutar script de esquema
        Write-Info "Ejecutando script de esquema..."
        & psql -U postgres -h localhost -d campusapp -f "database\schema.sql"
        
        # Ejecutar script de datos
        Write-Info "Ejecutando script de datos..."
        & psql -U postgres -h localhost -d campusapp -f "database\seed.sql"
        
        Write-Success "Base de datos creada y configurada correctamente"
    } catch {
        Write-Error "Error creando base de datos: $($_.Exception.Message)"
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
        Copy-Item "backend\env.example" "backend\.env"
        Write-Success "Archivo .env creado"
    }
    
    # Iniciar backend
    Write-Info "Iniciando backend..."
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"
    
    # Esperar un poco
    Start-Sleep -Seconds 3
    
    # Iniciar frontend
    Write-Info "Iniciando frontend..."
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm start"
    
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
