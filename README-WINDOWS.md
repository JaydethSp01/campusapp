# Campus App - Instalador Automático para Windows

Este proyecto incluye un instalador automático que configura todo el entorno necesario para ejecutar la aplicación Campus App en Windows.

## 🚀 Instalación Rápida

### Opción 1: Script de PowerShell (Recomendado)
1. **Ejecutar como Administrador**: Haz clic derecho en PowerShell y selecciona "Ejecutar como administrador"
2. **Ejecutar el script**:
   ```powershell
   .\setup-windows.ps1
   ```

### Opción 2: Script de Batch
1. **Ejecutar como Administrador**: Haz clic derecho en el archivo `setup-windows.bat` y selecciona "Ejecutar como administrador"
2. **El script se ejecutará automáticamente**

## 📋 Requisitos del Sistema

- **Windows 10/11** (64-bit)
- **Conexión a Internet** (para descargar dependencias)
- **Permisos de Administrador** (para instalar software)

## 🔧 Lo que Instala el Script

### Software Requerido:
- **Node.js v18.17.0** - Runtime de JavaScript
- **PostgreSQL 13.7** - Base de datos
- **pgAdmin 4** - Interfaz gráfica para PostgreSQL

### Dependencias del Proyecto:
- **Backend**: Express.js, TypeScript, y todas las dependencias
- **Frontend**: React Native, Expo, y todas las dependencias

### Base de Datos:
- Crea la base de datos `campusapp`
- Ejecuta los scripts de esquema y datos iniciales
- Configura usuarios y roles

## 🎯 Después de la Instalación

### Servicios Iniciados:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:8081

### Credenciales de Acceso:

#### 👨‍💼 Administrador:
- **Email**: admin@campusapp.com
- **Password**: admin123

#### 👨‍🏫 Docente:
- **Email**: docente@campusapp.com
- **Password**: docente123

#### 👨‍🎓 Estudiante:
- **Email**: estudiante@campusapp.com
- **Password**: estudiante123

### Credenciales de Base de Datos (pgAdmin):
- **Host**: localhost
- **Puerto**: 5432
- **Usuario**: postgres
- **Password**: admin123
- **Base de datos**: campusapp

## 🛠️ Comandos Útiles

### Reiniciar Servicios:
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

### Verificar Estado de la Base de Datos:
```bash
psql -U postgres -h localhost -d campusapp -c "SELECT * FROM usuarios;"
```

### Limpiar e Instalar de Nuevo:
```bash
# Limpiar dependencias
cd backend && npm ci
cd ../frontend && npm ci

# Reinstalar base de datos
psql -U postgres -h localhost -c "DROP DATABASE IF EXISTS campusapp;"
psql -U postgres -h localhost -c "CREATE DATABASE campusapp;"
psql -U postgres -h localhost -d campusapp -f database/schema.sql
psql -U postgres -h localhost -d campusapp -f database/seed.sql
```

## 🐛 Solución de Problemas

### Error: "No se puede ejecutar scripts"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "Node.js no encontrado"
- Verifica que Node.js esté instalado: `node --version`
- Reinicia la terminal después de la instalación

### Error: "PostgreSQL no responde"
- Verifica que el servicio esté ejecutándose: `services.msc`
- Busca "postgresql" y asegúrate de que esté "En ejecución"

### Error: "Puerto 3000 en uso"
- Cambia el puerto en `backend/.env`
- O mata el proceso: `netstat -ano | findstr :3000`

## 📱 Uso de la Aplicación

### Para Estudiantes:
- Accede a reportes, bienestar, menú
- Ve estadísticas personales
- Recibe notificaciones

### Para Docentes:
- Panel de control con métricas
- Gestión de estudiantes
- Reportes y análisis

### Para Administradores:
- Dashboard completo
- Gestión de usuarios
- Configuración del sistema

## 🔄 Actualizaciones

Para actualizar el proyecto:
1. `git pull origin main`
2. Ejecutar `setup-windows.ps1` nuevamente
3. O solo instalar dependencias: `npm install` en cada carpeta

## 📞 Soporte

Si encuentras problemas:
1. Verifica que todos los servicios estén ejecutándose
2. Revisa los logs en las ventanas de terminal
3. Verifica la conexión a la base de datos
4. Reinicia los servicios si es necesario

---

**¡Disfruta usando Campus App! 🎉**
