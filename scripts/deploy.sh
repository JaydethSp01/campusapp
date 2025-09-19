#!/bin/bash

# CampusApp Deploy Script
echo "🚀 Desplegando CampusApp..."

# Build backend
echo "🔨 Construyendo backend..."
cd backend
npm run build
cd ..

# Build frontend for Android
echo "📱 Construyendo frontend para Android..."
cd frontend
npx react-native run-android --mode=release
cd ..

echo "✅ Despliegue completado!"
echo ""
echo "📋 URLs de acceso:"
echo "Backend API: http://localhost:3000"
echo "Health Check: http://localhost:3000/health"
echo "Frontend: Aplicación móvil instalada en el dispositivo"


