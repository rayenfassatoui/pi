import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Edit, Trash2, User, Calendar, ChefHat, Star, ShoppingCart, BookMarked, Printer } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import NutritionInfo from '../components/NutritionInfo';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [collections, setCollections] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                setRecipe(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecipe();
    }, [id]);

    const fetchCollections = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/collections', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCollections(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                navigate('/');
                toast.success('Recipe deleted');
            } catch (err) {
                toast.error('Error deleting recipe');
            }
        }
    };

    const handleAddToFavorites = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users/favorites/${id}`, {}, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            toast.success('Added to favorites!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error adding to favorites');
        }
    };

    const handleAddToCollection = async (collectionId) => {
        try {
            await axios.post(`http://localhost:5000/api/collections/${collectionId}/recipes`, { recipeId: id }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            toast.success('Added to collection');
        } catch (err) {
            toast.error('Failed to add to collection');
        }
    };

    const handleAddToShoppingList = async (ingredient) => {
        try {
            await axios.post('http://localhost:5000/api/shopping-list/items', { text: ingredient, recipeId: id }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            toast.success('Added to shopping list');
        } catch (err) {
            toast.error('Failed to add to shopping list');
        }
    };

    const handleRate = async (value) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/recipes/${id}/rate`, { value }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setRecipe(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!recipe) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                    <p className="mt-4 text-muted-foreground">Loading recipe...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Hero Image */}
            <Card className="overflow-hidden">
                <div className="relative h-96">
                    <img
                        src={recipe.photo || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop'}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-5xl font-bold mb-4">{recipe.title}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold">{recipe.averageRating?.toFixed(1) || '0.0'}</span>
                                <span className="text-gray-200">({recipe.ratings?.length || 0} ratings)</span>
                            </div>
                            {user && (
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} onClick={() => handleRate(star)} className="hover:scale-110 transition-transform">
                                            <Star className={`h-5 w-5 ${star <= (recipe.ratings?.find(r => r.user === user._id)?.value || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 border-2 border-white">
                                    <AvatarFallback>{recipe.author?.name?.[0]}</AvatarFallback>
                                </Avatar>
                                <span>By {recipe.author?.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
                {user && (
                    <>
                        <Button variant="outline" onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                        </Button>
                        <Button variant="outline" onClick={handleAddToFavorites}>
                            <Heart className="mr-2 h-4 w-4" />
                            Add to Favorites
                        </Button>
                        <Dialog onOpenChange={(open) => open && fetchCollections()}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <BookMarked className="mr-2 h-4 w-4" />
                                    Save to Collection
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Select Collection</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2">
                                    {collections.map(collection => (
                                        <Button 
                                            key={collection._id} 
                                            variant="ghost" 
                                            className="w-full justify-start"
                                            onClick={() => handleAddToCollection(collection._id)}
                                        >
                                            {collection.name}
                                        </Button>
                                    ))}
                                    {collections.length === 0 && <p className="text-center text-muted-foreground">No collections found</p>}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
                {user && user._id === recipe.author?._id && (
                    <>
                        <Button variant="outline" asChild>
                            <Link to={`/edit-recipe/${recipe._id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Ingredients & Nutrition */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <ChefHat className="h-5 w-5 text-primary" />
                                <h3 className="text-xl font-bold">Ingredients</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {recipe.ingredients.map((ing, index) => (
                                    <li key={index} className="flex items-start gap-2 justify-between group">
                                        <div className="flex items-start gap-2">
                                            <Badge variant="outline" className="mt-0.5">
                                                {index + 1}
                                            </Badge>
                                            <span>{ing}</span>
                                        </div>
                                        {user && (
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleAddToShoppingList(ing)}
                                            >
                                                <ShoppingCart className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <NutritionInfo ingredients={recipe.ingredients} />
                </div>

                {/* Instructions */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <h3 className="text-xl font-bold">Instructions</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recipe.steps && recipe.steps.length > 0 ? (
                                recipe.steps.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-none">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-lg leading-relaxed">{step.text}</p>
                                            {step.image && (
                                                <img 
                                                    src={step.image} 
                                                    alt={`Step ${index + 1}`} 
                                                    className="rounded-lg max-h-64 object-cover"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="prose prose-sm max-w-none">
                                    <p className="whitespace-pre-line leading-relaxed">
                                        {recipe.instructions}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <CommentSection 
                recipeId={id} 
                comments={recipe.comments} 
                onCommentAdded={(comments) => setRecipe({ ...recipe, comments })} 
                onCommentDeleted={(comments) => setRecipe({ ...recipe, comments })} 
            />
        </div>
    );
};

export default RecipeDetails;
