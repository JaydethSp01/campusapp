#!/bin/bash

# CampusApp Setup Script
echo "🚀 Configurando CampusApp..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 16+ primero."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL no está instalado. Por favor instala PostgreSQL primero."
    exit 1
fi

# Install backend dependencies
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

# Create uploads directory
echo "📁 Creando directorio de uploads..."
mkdir -p backend/uploads

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "⚙️ Creando archivo de configuración..."
    cp backend/env.example backend/.env
    echo "✅ Archivo .env creado. Por favor configura las variables de entorno."
fi

echo "✅ Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las variables de entorno en backend/.env"
echo "2. Crea la base de datos PostgreSQL: createdb campusapp"
echo "3. Ejecuta las migraciones: npm run db:migrate"
echo "4. Ejecuta los datos de prueba: npm run db:seed"
echo "5. Inicia el backend: cd backend && npm run dev"
echo "6. Inicia el frontend: cd frontend && npm start"

