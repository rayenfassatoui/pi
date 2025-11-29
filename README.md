# 🍳 RecipeShare - Modern Recipe Sharing Platform

A beautiful, feature-rich full-stack MERN application for food enthusiasts to discover, create, share, and manage cooking recipes. Built with a modern **Deep Indigo & Slate** design theme featuring glassmorphism effects and premium UI/UX.

## ✨ Design Highlights

- 🎨 **Modern Premium Design**: Deep Indigo & Slate color palette with violet accents
- 🪟 **Glassmorphism Effects**: Translucent navbar with backdrop blur
- 🎭 **Custom Typography**: Inter (body text) and Outfit (headings) fonts from Google Fonts
- 📱 **Fully Responsive**: Adaptive layouts from mobile (375px) to desktop (1920px+)
- 🌗 **Dark Mode Support**: Seamless theme switching
- 🎬 **Smooth Animations**: Powered by Framer Motion

## 🚀 Features

### 🌟 Core Recipe Management
- **Create & Edit Recipes**: Rich recipe creation with image uploads, ingredients, and step-by-step instructions
- **Advanced Search & Filtering**: Search by name, category, ingredients, and ratings
- **Smart Pagination**: Browse recipes efficiently with paginated results
- **Categories**: Organize recipes by type (Breakfast, Dinner, Dessert, etc.)
- **Ratings & Reviews**: 5-star rating system with user reviews

### 👤 User Features
- **User Authentication**: Secure JWT-based login/registration
- **Personal Profile**: Manage your profile with avatar and bio
- **My Recipes**: View and manage all your created recipes
- **Favorites/Collections**: Save and organize your favorite recipes
- **Shopping List**: Generate shopping lists from recipe ingredients

### 🎯 Modern UI Components
- **Premium Navbar**: Glassmorphic design with responsive mobile menu
- **Recipe Cards**: Elegant cards with hover effects and gradient overlays
- **Theme Toggle**: Smooth dark/light mode switching
- **Interactive Elements**: Micro-animations and hover states throughout

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS 3
- **UI Library**: Shadcn/UI components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Inter, Outfit)
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + Bcrypt
- **File Upload**: Multer
- **Environment**: dotenv

### DevOps
- **Containerization**: Docker (MongoDB)
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18+)
- **Docker** (for MongoDB)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/rayenfassatoui/pi.git
cd pi
```

### 2. Start MongoDB with Docker
```bash
# Start MongoDB container
docker run -d \
  --name pi-mongodb-1 \
  -p 27017:27017 \
  mongo:latest

# Verify it's running
docker ps
```

Alternatively, if you have a stopped container:
```bash
docker start pi-mongodb-1
```

### 3. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=your_super_secret_key_change_this_in_production
```

Start the backend server:
```bash
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

### 4. Frontend Setup
Open a new terminal and navigate to the frontend:
```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

## 📱 Usage Guide

### Getting Started
1. **Register**: Create a new account at `/register`
2. **Login**: Sign in with your credentials
3. **Explore**: Browse recipes on the home page
4. **Search**: Use the search bar and filters to find specific recipes

### Creating Recipes
1. Click **"Add Recipe"** in the navbar
2. Fill in recipe details (title, description, category)
3. Upload a recipe image
4. Add ingredients and instructions
5. Click **"Create Recipe"** to publish

### Managing Your Profile
- Access **"Profile"** to view your account details
- Visit **"My Recipes"** to manage your created recipes
- Use **"Collections"** to organize saved recipes
- Generate shopping lists from **"Shopping List"**

## 📂 Project Structure

```
pi/
├── backend/                      # Express.js API
│   ├── controllers/              # Request handlers & business logic
│   ├── models/                   # Mongoose schemas (User, Recipe, etc.)
│   ├── routes/                   # API route definitions
│   ├── middleware/               # Auth & validation middleware
│   ├── uploads/                  # User-uploaded images
│   ├── server.js                 # Entry point
│   ├── .env                      # Environment variables (gitignored)
│   └── package.json
│
└── frontend/                     # React SPA
    ├── public/                   # Static assets
    ├── src/
    │   ├── assets/               # Images, logo, etc.
    │   ├── components/           # Reusable UI components
    │   │   ├── Navbar.jsx        # Glassmorphic responsive navbar
    │   │   ├── RecipeCard.jsx    # Recipe display card
    │   │   ├── ThemeToggle.jsx   # Dark mode switcher
    │   │   └── ui/               # Shadcn UI primitives
    │   ├── pages/                # Page components
    │   ├── context/              # React Context (AuthContext)
    │   ├── index.css             # Global styles & theme variables
    │   ├── App.jsx               # Root component
    │   └── main.jsx              # Entry point
    ├── index.html                # HTML template
    ├── tailwind.config.js        # Tailwind configuration
    └── package.json
```

## 🎨 Color Palette

The app uses a carefully curated **Deep Indigo & Slate** theme:

- **Primary**: `hsl(217.2, 91.2%, 59.8%)` - Vibrant Blue
- **Background**: `hsl(222.2, 84%, 4.9%)` - Deep Dark Blue
- **Accent**: `hsl(217.2, 32.6%, 17.5%)` - Slate Blue
- **Gradients**: Primary → Violet → Indigo

## 🔧 Development

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend (run with NODE_ENV=production)
NODE_ENV=production npm start
```

### Responsive Breakpoints
- **Mobile**: < 1280px (Hamburger menu)
- **Desktop**: ≥ 1280px (Full navbar)

## 🐛 Troubleshooting

### MongoDB Connection Error
If you see `ECONNREFUSED ::1:27017`:
```bash
# Check if MongoDB container is running
docker ps

# Start the container if stopped
docker start pi-mongodb-1
```

### Port Already in Use
If port 5000 or 5173 is busy:
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by [Rayen Fassatoui](https://github.com/rayenfassatoui)**
