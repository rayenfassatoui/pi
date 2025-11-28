# Cooking Recipe Management App

A full-stack MERN application for sharing and managing cooking recipes.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally (or update `.env` with cloud URI)
- OR Docker installed (to run MongoDB in a container)

## Setup & Installation

### 1. Database Setup (if MongoDB is not installed)
If you have Docker, you can run:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=your_secret_key
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

You need to run both the backend and frontend servers.

### Start Backend
```bash
cd backend
npm start
# OR for development with nodemon (if installed)
# npm run dev
# OR simply
node server.js
```
The backend will run on `http://localhost:5000`.

### Start Frontend
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Features
- User Authentication (Login/Register)
- Create, Edit, Delete Recipes
- Search and Pagination
- User Profile and Favorites
