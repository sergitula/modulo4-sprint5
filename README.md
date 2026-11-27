# 🎬 Nodo Cine — Catálogo de Películas (CRUD)

Aplicación web SPA desarrollada para el **Sprint 5** de la diplomatura en **Nodo Tecnológico**. Permite gestionar un catálogo de películas con operaciones CRUD completas contra una API REST en MockAPI, diseñada con una arquitectura escalable pensada como base para el proyecto final.

🔗 **Deploy en vivo:** [https://modulo4-sprint5-nodocine-sergio.netlify.app/]

---

## ✨ Funcionalidades

- **Catálogo (`/movies`):** Muestra las películas en una grilla responsive con póster, género, año y clasificación (`ATP`, `+13`, `+18`).
- **Detalle (`/movies/:id`):** Sinopsis completa y botones para editar o borrar.
- **Crear y Editar (`/movies/create` y `/movies/:id/edit`):** Formularios con validaciones usando React Hook Form y precarga automática al editar.
- **Borrado seguro:** Modal propio (`ConfirmModal`) en lugar de las alertas del navegador, más notificaciones con Toastify en cada acción.
- **Diseño responsive:** Estética *dark-mode* cinematográfica adaptada desde dispositivos móviles (`375px`) hasta escritorio.

---

## 🛠️ Tecnologías utilizadas

- **React + Vite**
- **React Router** (`react-router`)
- **Tailwind CSS v4** (tokens personalizados en `@theme`)
- **Axios** (instancia de la `URL`)
- **React Hook Form** (manejo y validación de formularios)
- **React Toastify** (notificaciones)
- **MockAPI** (backend REST para el recurso `movies`)

---

## 📁 Estructura del proyecto

```text
src/
├── components/
│   ├── layout/          # Estructura fija (Navbar, Footer)
│   ├── ui/              # Componentes reutilizables (ConfirmModal)
│   └── views/           # Vistas asociadas a rutas (MovieList, MovieDetail, MovieCreate, MovieEdit)
├── routes/
│   └── AppRouter.jsx    # Configuración centralizada de rutas
├── services/
│   ├── axiosInstance.js # Instancia base de Axios
│   └── moviesApi.js     # Funciones CRUD (GET, POST, PUT, DELETE)
├── App.jsx
├── index.css            # Design System (colores y tipografías)
└── main.jsx

```

## 🧠 Decisiones técnicas
Separación de capas: Toda la comunicación HTTP vive en src/services/ y el enrutamiento en src/routes/AppRouter.jsx, manteniendo App.jsx exclusivamente para el layout global.

Uso de estado local vs. Contexto: En este sprint cada vista consulta los datos actualizados desde MockAPI al montarse, por lo que no se creó un Contexto global innecesario para el CRUD.

Modal reutilizable: Se implementó ConfirmModal en components/ui/ recibiendo children para mantener coherencia visual y reutilizarlo en futuras acciones destructivas.


## Cómo correrlo:
1. Clonar el repositorio.
2. Crear un archivo `.env` en la raíz del proyecto y agregar la siguiente variable:
   `VITE_API_URL=[https://tu-proyecto.mockapi.io/api/v1](https://tu-proyecto.mockapi.io/api/v1)` 
3. Instalar dependencias e iniciar el servidor:
```bash
pnpm install
pnpm run dev
```