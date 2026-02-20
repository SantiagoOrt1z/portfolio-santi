# Portfolio Terminal Web Interactiva

Aplicación web que simula una terminal interactiva, desarrollada con React y Node.js.

## 🚀 Funcionalidades

- Entrada de comandos interactiva
- Navegación por historial (↑ ↓)
- Scroll automático
- Comunicación con backend vía API REST
- Cursor personalizado animado
- Interfaz minimalista en pantalla completa
- Tipeo letra por letra

## 🛠 Tecnologías utilizadas

Frontend:

- React
- CSS personalizado

Backend:

- Node.js
- Express

## 📡 API

POST /api/commands

Request:
{
"command": "string"
}

Response:
{
"output": "string"
}

## 💻 Ejecutar en local

### Backend

cd backend  
npm install  
node index.js

Corre en http://localhost:3001

### Frontend

cd frontend  
npm install  
npm run dev

Corre en http://localhost:5173

Escribir "help" en el input, para conocer comandos. Gracias !! :D

---

Proyecto desarrollado como parte de un proceso de formación orientado a posiciones Junior en desarrollo web.
