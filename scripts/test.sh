#!/bin/bash

# CampusApp Test Script
echo "🧪 Ejecutando pruebas de CampusApp..."

# Backend tests
echo "🔧 Ejecutando pruebas del backend..."
cd backend
npm test
cd ..

# Frontend tests
echo "📱 Ejecutando pruebas del frontend..."
cd frontend
npm test
cd ..

echo "✅ Pruebas completadas!"

