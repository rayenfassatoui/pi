import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditRecipe from './pages/AddEditRecipe';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import ShoppingList from './pages/ShoppingList';
import UserProfile from './pages/UserProfile';
import CookingTimer from './components/CookingTimer';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-recipe" element={<AddEditRecipe />} />
              <Route path="/edit-recipe/:id" element={<AddEditRecipe />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:id" element={<CollectionDetail />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
            </Routes>
          </div>
          <CookingTimer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
