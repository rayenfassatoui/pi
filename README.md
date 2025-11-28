# 🍳 FlavorFusion - Advanced Recipe Management Platform

A feature-rich, full-stack MERN application designed for food enthusiasts to discover, create, share, and manage cooking recipes. This platform goes beyond simple recipe storage by integrating social networking, nutrition analysis, and smart kitchen tools.

## 🚀 Features

### 🌟 Core Experience
- **Recipe Management**: Create, edit, and delete recipes with rich text and step-by-step instructions.
- **Advanced Search**: Filter by ingredients, cooking time, rating, and categories.
- **Interactive Ratings**: Rate and review recipes from the community.
- **Dark Mode**: Fully supported dark/light theme toggle.

### 🤝 Social & Community
- **User Profiles**: Customizable profiles with bio, avatar, and social stats.
- **Follow System**: Follow your favorite chefs and see their latest creations.
- **Comments**: Engage with the community through recipe comments.

### 🥗 Smart Kitchen Tools
- **Nutrition Analysis**: Automatic calculation of calories and macros based on ingredients.
- **Shopping List**: Add ingredients from multiple recipes to a consolidated checklist.
- **Cooking Timer**: Built-in multi-timer for precise cooking.
- **Collections**: Organize recipes into private or public cookbooks (e.g., "Sunday Brunch", "Keto Favorites").
- **Print Friendly**: Optimized print view for physical copies or PDF export.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Shadcn/UI, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Authentication**: JWT (JSON Web Tokens).
- **Image Storage**: Local storage with Multer (can be extended to Cloudinary/S3).

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/rayenfassatoui/pi.git
cd pi
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipe-app
JWT_SECRET=your_super_secret_key_change_this
```
Start the server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

## 📱 Usage

1.  **Register/Login**: Create an account to unlock all features.
2.  **Create Recipe**: Click "Add Recipe" to share your culinary masterpiece.
3.  **Explore**: Use the search bar or browse categories.
4.  **Connect**: Visit user profiles and follow them.
5.  **Cook**: Use the "Cooking Mode" timer and check off ingredients.

## 📂 Project Structure

```
pi/
├── backend/                 # Express API
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   └── uploads/             # Image storage
└── frontend/                # React App
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/           # Full page views
    │   └── context/         # Global state (Auth)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
