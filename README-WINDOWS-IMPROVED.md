# 🚀 Campus App - Instalador Automático Mejorado para Windows

Este script mejorado instala y configura automáticamente todo el entorno necesario para ejecutar Campus App en Windows.

## ✨ Características del Script Mejorado

- ✅ **Instalación automática** de Node.js, PostgreSQL y pgAdmin
- ✅ **Configuración automática** de la base de datos
- ✅ **Verificación de dependencias** antes de instalar
- ✅ **Manejo de errores** robusto con mensajes informativos
- ✅ **Creación automática** del archivo .env
- ✅ **Inicio automático** del backend y frontend
- ✅ **Validación de conexión** a PostgreSQL
- ✅ **Instalación de componentes** necesarios (pgAdmin, commandlinetools)

## 🚀 Instalación Rápida

### **Opción 1: Script de PowerShell (Recomendado)**

#### **Paso 1: Descargar el proyecto**

```bash
git clone https://github.com/JaydethSp01/campusapp.git
cd campusapp
```

#### **Paso 2: Habilitar ejecución de scripts en PowerShell**

**IMPORTANTE**: Si PowerShell te da error de "execution policy", sigue estos pasos:

1. **Abrir PowerShell como Administrador**:

   - Presiona `Windows + X`
   - Selecciona "Windows PowerShell (Administrador)" o "Terminal (Administrador)"

2. **Ejecutar este comando**:

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

   - Escribe `Y` y presiona Enter cuando te pregunte

3. **Verificar que funcionó**:
   ```powershell
   Get-ExecutionPolicy
   ```
   - Debe mostrar: `RemoteSigned`

#### **Paso 3: Ejecutar el script**

```powershell
.\setup-windows.ps1
```

### **Opción 2: Script de Batch (Alternativa)**

Si PowerShell sigue dando problemas, usa el script de batch:

1. **Descargar el proyecto** (mismo paso anterior)
2. **Ejecutar como Administrador**:
   - Haz clic derecho en `setup-windows.bat`
   - Selecciona "Ejecutar como administrador"

### **Opción 3: Ejecutar línea por línea (Si todo falla)**

Si ambos scripts fallan, puedes ejecutar los comandos manualmente:

1. **Instalar Node.js**:

   - Descarga desde: https://nodejs.org/
   - Instala la versión LTS

2. **Instalar PostgreSQL**:

   - Descarga desde: https://www.postgresql.org/download/windows/
   - Usuario: postgres, Password: admin123

3. **Instalar dependencias**:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. **Crear base de datos**:
   ```bash
   psql -U postgres -c "CREATE DATABASE campusapp;"
   psql -U postgres -d campusapp -f database/schema.sql
   psql -U postgres -d campusapp -f database/seed.sql
   ```

## 📋 Requisitos del Sistema

- **Windows 10/11** (64-bit)
- **Conexión a Internet** (para descargar dependencias)
- **Permisos de Administrador** (para instalar software)
- **Espacio en disco**: ~2GB (Node.js + PostgreSQL + dependencias)

## 🔧 Lo que Instala el Script

### **Software Requerido:**

- **Node.js v18.17.0** - Runtime de JavaScript
- **PostgreSQL 13.7** - Base de datos con pgAdmin incluido
- **pgAdmin 4** - Interfaz gráfica para PostgreSQL

### **Dependencias del Proyecto:**

- **Backend**: Express.js, TypeScript, y todas las dependencias
- **Frontend**: React Native, Expo, y todas las dependencias

### **Base de Datos:**

- Crea la base de datos `campusapp`
- Ejecuta los scripts de esquema y datos iniciales
- Configura usuarios y roles automáticamente

## 🎯 Después de la Instalación

### **Servicios Iniciados:**

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:8081

### **Credenciales de Acceso:**

#### 👨‍💼 Administrador:

- **Email**: admin@campusapp.com
- **Password**: admin123

#### 👨‍🏫 Docente:

- **Email**: docente@campusapp.com
- **Password**: docente123

#### 👨‍🎓 Estudiante:

- **Email**: estudiante@campusapp.com
- **Password**: estudiante123

### **Credenciales de Base de Datos (pgAdmin):**

- **Host**: localhost
- **Puerto**: 5432
- **Usuario**: postgres
- **Password**: admin123
- **Base de datos**: campusapp

## 🛠️ Comandos Útiles

### **Reiniciar Servicios:**

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

### **Verificar Estado de la Base de Datos:**

```bash
psql -U postgres -h localhost -d campusapp -c "SELECT * FROM usuarios;"
```

### **Conectar a pgAdmin:**

1. Abre pgAdmin desde el menú de inicio
2. Crea nueva conexión con los datos de arriba
3. Explora la base de datos `campusapp`

## 🐛 Solución de Problemas

### **Error: "No se puede ejecutar scripts"**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Error: "Node.js no encontrado"**

- Verifica que Node.js esté instalado: `node --version`
- Reinicia la terminal después de la instalación

### **Error: "PostgreSQL no responde"**

- Verifica que el servicio esté ejecutándose: `services.msc`
- Busca "postgresql" y asegúrate de que esté "En ejecución"

### **Error: "Puerto 3000 en uso"**

- Cambia el puerto en `backend\.env`
- O mata el proceso: `netstat -ano | findstr :3000`

### **Error: "Base de datos no encontrada"**

- Ejecuta el script de nuevo: `.\setup-windows.ps1`
- O crea manualmente: `psql -U postgres -c "CREATE DATABASE campusapp;"`

## 🔄 Actualizaciones

Para actualizar el proyecto:

1. `git pull origin main`
2. Ejecutar `setup-windows.ps1` nuevamente
3. O solo instalar dependencias: `npm install` en cada carpeta

## 📱 Uso de la Aplicación

### **Para Estudiantes:**

- Accede a reportes, bienestar, menú
- Ve estadísticas personales
- Recibe notificaciones

### **Para Docentes:**

- Panel de control con métricas
- Gestión de estudiantes
- Reportes y análisis

### **Para Administradores:**

- Dashboard completo
- Gestión de usuarios
- Configuración del sistema

## 🎉 ¡Listo!

El script mejorado garantiza que:

- ✅ Todo se instale correctamente
- ✅ La base de datos se configure automáticamente
- ✅ Los servicios se inicien sin problemas
- ✅ Tengas acceso inmediato a la aplicación

**¡Disfruta usando Campus App! 🚀**
