import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const CollectionDetail = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState(null);

    const fetchCollection = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/collections`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            const found = res.data.find(c => c._id === id);
            setCollection(found);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCollection();
    }, [id]);

    const handleRemoveRecipe = async (recipeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/collections/${id}/recipes/${recipeId}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchCollection();
            toast.success('Recipe removed from collection');
        } catch (err) {
            toast.error('Failed to remove recipe');
        }
    };

    if (!collection) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">{collection.name}</h1>
            <p className="text-muted-foreground">{collection.recipes.length} recipes</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.recipes.map((recipe) => (
                    <div key={recipe._id} className="relative group">
                        <RecipeCard recipe={recipe} />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRemoveRecipe(recipe._id);
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionDetail;
