@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    CAMPUS APP - INSTALADOR AUTOMATICO
echo ========================================
echo.

:: Colores para la consola
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RESET=[0m"

echo %BLUE%Iniciando instalacion automatica...%RESET%
echo.

:: Verificar si se ejecuta como administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo %RED%ERROR: Este script debe ejecutarse como Administrador%RESET%
    echo %YELLOW%Haz clic derecho en el archivo y selecciona "Ejecutar como administrador"%RESET%
    pause
    exit /b 1
)

:: Verificar si Node.js esta instalado
echo %BLUE%Verificando Node.js...%RESET%
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo %YELLOW%Node.js no encontrado. Instalando...%RESET%
    echo Descargando Node.js LTS...
    powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi' -OutFile 'nodejs-installer.msi'"
    echo Instalando Node.js...
    msiexec /i nodejs-installer.msi /quiet /norestart
    echo %GREEN%Node.js instalado correctamente%RESET%
    del nodejs-installer.msi
) else (
    echo %GREEN%Node.js ya esta instalado%RESET%
)

:: Verificar si PostgreSQL esta instalado
echo %BLUE%Verificando PostgreSQL...%RESET%
psql --version >nul 2>&1
if %errorLevel% neq 0 (
    echo %YELLOW%PostgreSQL no encontrado. Instalando...%RESET%
    echo Descargando PostgreSQL...
    powershell -Command "Invoke-WebRequest -Uri 'https://get.enterprisedb.com/postgresql/postgresql-13.7-1-windows-x64.exe' -OutFile 'postgresql-installer.exe' -UseBasicParsing"
    echo Instalando PostgreSQL (esto puede tomar varios minutos)...
    postgresql-installer.exe --mode unattended --superpassword "admin123" --servicename "postgresql" --serviceaccount "postgres" --servicepassword "admin123" --enable-components "server,pgAdmin,commandlinetools" --disable-components "stackbuilder"
    echo Esperando a que se complete la instalacion...
    timeout /t 15 /nobreak >nul
    echo %GREEN%PostgreSQL instalado correctamente%RESET%
    del postgresql-installer.exe
) else (
    echo %GREEN%PostgreSQL ya esta instalado%RESET%
)

:: Verificar si pgAdmin esta instalado
echo %BLUE%Verificando pgAdmin...%RESET%
where pgAdmin4 >nul 2>&1
if %errorLevel% neq 0 (
    echo %YELLOW%pgAdmin no encontrado. Instalando...%RESET%
    echo Descargando pgAdmin...
    powershell -Command "Invoke-WebRequest -Uri 'https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v6.21/windows/pgadmin4-6.21-x64.exe' -OutFile 'pgadmin-installer.exe'"
    echo Instalando pgAdmin...
    pgadmin-installer.exe --mode unattended --master-password "admin123"
    echo %GREEN%pgAdmin instalado correctamente%RESET%
    del pgadmin-installer.exe
) else (
    echo %GREEN%pgAdmin ya esta instalado%RESET%
)

:: Instalar dependencias del backend
echo %BLUE%Instalando dependencias del backend...%RESET%
cd backend
call npm install
if %errorLevel% neq 0 (
    echo %RED%Error instalando dependencias del backend%RESET%
    pause
    exit /b 1
)
echo %GREEN%Dependencias del backend instaladas%RESET%

:: Instalar dependencias del frontend
echo %BLUE%Instalando dependencias del frontend...%RESET%
cd ..\frontend
call npm install
if %errorLevel% neq 0 (
    echo %RED%Error instalando dependencias del frontend%RESET%
    pause
    exit /b 1
)
echo %GREEN%Dependencias del frontend instaladas%RESET%

:: Crear base de datos
echo %BLUE%Creando base de datos...%RESET%
cd ..\database
set PGPASSWORD=admin123
psql -U postgres -h localhost -c "CREATE DATABASE campusapp;" 2>nul
if %errorLevel% neq 0 (
    echo %YELLOW%La base de datos ya existe o hubo un error%RESET%
)

:: Ejecutar script de esquema
echo %BLUE%Ejecutando script de esquema...%RESET%
psql -U postgres -h localhost -d campusapp -f schema.sql
if %errorLevel% neq 0 (
    echo %RED%Error ejecutando script de esquema%RESET%
    pause
    exit /b 1
)

:: Ejecutar script de datos
echo %BLUE%Ejecutando script de datos...%RESET%
psql -U postgres -h localhost -d campusapp -f seed.sql
if %errorLevel% neq 0 (
    echo %RED%Error ejecutando script de datos%RESET%
    pause
    exit /b 1
)

echo %GREEN%Base de datos creada y configurada correctamente%RESET%

:: Crear archivo .env para el backend
echo %BLUE%Creando archivo de configuracion...%RESET%
cd ..\backend
copy env.example .env
echo %GREEN%Archivo .env creado%RESET%

:: Iniciar el backend
echo %BLUE%Iniciando backend...%RESET%
start "Backend" cmd /k "cd /d %~dp0backend && npm run dev"

:: Esperar un poco para que el backend inicie
timeout /t 5 /nobreak >nul

:: Iniciar el frontend
echo %BLUE%Iniciando frontend...%RESET%
start "Frontend" cmd /k "cd /d %~dp0frontend && npm start"

:: Esperar un poco para que el frontend inicie
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo    INSTALACION COMPLETADA
echo ========================================
echo.
echo %GREEN%Backend ejecutandose en: http://localhost:3000%RESET%
echo %GREEN%Frontend ejecutandose en: http://localhost:8081%RESET%
echo.
echo %YELLOW%CREDENCIALES DE ACCESO:%RESET%
echo.
echo %BLUE%ADMINISTRADOR:%RESET%
echo   Email: admin@campusapp.com
echo   Password: admin123
echo.
echo %BLUE%DOCENTE:%RESET%
echo   Email: docente@campusapp.com
echo   Password: docente123
echo.
echo %BLUE%ESTUDIANTE:%RESET%
echo   Email: estudiante@campusapp.com
echo   Password: estudiante123
echo.
echo %YELLOW%CREDENCIALES DE BASE DE DATOS (pgAdmin):%RESET%
echo   Host: localhost
echo   Puerto: 5432
echo   Usuario: postgres
echo   Password: admin123
echo   Base de datos: campusapp
echo.
echo %GREEN%Presiona cualquier tecla para continuar...%RESET%
pause >nul
