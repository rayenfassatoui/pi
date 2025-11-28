import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { ChefHat, Home, PlusCircle, User, LogOut, LogIn, UserPlus, BookMarked, ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center space-x-2">
                    <ChefHat className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        RecipeShare
                    </span>
                </Link>

                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" asChild>
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </Button>

                    {user ? (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/add-recipe">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Recipe
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/my-recipes">
                                    <ChefHat className="mr-2 h-4 w-4" />
                                    My Recipes
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/collections">
                                    <BookMarked className="mr-2 h-4 w-4" />
                                    Collections
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/shopping-list">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Shopping List
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/profile">
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/login">
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Login
                                </Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link to="/register">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Register
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
