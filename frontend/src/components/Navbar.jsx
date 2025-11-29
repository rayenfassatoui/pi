import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { ChefHat, Home, PlusCircle, User, LogOut, LogIn, UserPlus, BookMarked, ShoppingCart, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import logo from '@/assets/logo.png';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center space-x-3 group">
                    <img src={logo} alt="RecipeShare Logo" className="h-10 w-10 rounded-xl shadow-lg transition-transform group-hover:scale-105" />
                    <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary via-violet-500 to-indigo-600 bg-clip-text text-transparent">
                        RecipeShare
                    </span>
                </Link>

                <div className="flex items-center space-x-4">
                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center space-x-1">
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                            <Link to="/">
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Link>
                        </Button>

                        {user ? (
                            <>
                                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                                    <Link to="/add-recipe">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Recipe
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                                    <Link to="/my-recipes">
                                        <ChefHat className="mr-2 h-4 w-4" />
                                        My Recipes
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                                    <Link to="/collections">
                                        <BookMarked className="mr-2 h-4 w-4" />
                                        Collections
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                                    <Link to="/shopping-list">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Shopping List
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                                    <Link to="/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </Button>
                                <Button variant="default" size="sm" onClick={logout} className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                                    <Link to="/login">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Login
                                    </Link>
                                </Button>
                                <Button size="sm" asChild className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                                    <Link to="/register">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Register
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <ThemeToggle />

                    {/* Mobile Menu Toggle */}
                    <Button variant="ghost" size="icon" className="xl:hidden" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
                    >
                        <div className="container flex flex-col space-y-4 p-4">
                            <Button variant="ghost" size="sm" asChild className="justify-start" onClick={closeMobileMenu}>
                                <Link to="/">
                                    <Home className="mr-2 h-4 w-4" />
                                    Home
                                </Link>
                            </Button>

                            {user ? (
                                <>
                                    <Button variant="ghost" size="sm" asChild className="justify-start" onClick={closeMobileMenu}>
                                        <Link to="/add-recipe">
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Recipe
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild className="justify-start" onClick={closeMobileMenu}>
                                        <Link to="/my-recipes">
                                            <ChefHat className="mr-2 h-4 w-4" />
                                            My Recipes
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild className="justify-start" onClick={closeMobileMenu}>
                                        <Link to="/collections">
                                            <BookMarked className="mr-2 h-4 w-4" />
                                            Collections
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild className="justify-start" onClick={closeMobileMenu}>
                                        <Link to="/shopping-list">
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Shopping List
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild className="justify-start" onClick={closeMobileMenu}>
                                        <Link to="/profile">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </Button>
                                    <Button variant="default" size="sm" onClick={() => { logout(); closeMobileMenu(); }} className="justify-start bg-primary hover:bg-primary/90">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" asChild className="justify-start" onClick={closeMobileMenu}>
                                        <Link to="/login">
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Login
                                        </Link>
                                    </Button>
                                    <Button size="sm" asChild className="justify-start bg-primary hover:bg-primary/90" onClick={closeMobileMenu}>
                                        <Link to="/register">
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Register
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
