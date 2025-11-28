import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import StepsEditor from '../components/StepsEditor';
import { toast } from 'sonner';

const AddEditRecipe = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const [photo, setPhoto] = useState('');
    const [steps, setSteps] = useState([]);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                setCategories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();

        if (isEditMode) {
            const fetchRecipe = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                    const recipe = res.data;
                    setValue('title', recipe.title);
                    setValue('ingredients', recipe.ingredients.join(', '));
                    setValue('tags', recipe.tags?.join(', '));
                    setPhoto(recipe.photo);
                    setSteps(recipe.steps || []);
                    setCategory(recipe.category || '');
                    
                    // Backward compatibility for old instructions
                    if ((!recipe.steps || recipe.steps.length === 0) && recipe.instructions) {
                        setSteps([{ text: recipe.instructions }]);
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            fetchRecipe();
        }
    }, [id, isEditMode, setValue]);

    const onSubmit = async (data) => {
        const recipeData = {
            ...data,
            ingredients: data.ingredients.split(',').map(item => item.trim()),
            tags: data.tags ? data.tags.split(',').map(item => item.trim()) : [],
            photo,
            steps,
            category,
            instructions: steps.map(s => s.text).join('\n') // Fallback for backward compatibility
        };

        try {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            };

            if (isEditMode) {
                await axios.put(`http://localhost:5000/api/recipes/${id}`, recipeData, config);
                toast.success('Recipe updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/recipes', recipeData, config);
                toast.success('Recipe created successfully');
            }
            navigate('/');
        } catch (err) {
            toast.error('Error saving recipe');
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        {isEditMode ? (
                            <Edit className="h-6 w-6 text-primary" />
                        ) : (
                            <PlusCircle className="h-6 w-6 text-primary" />
                        )}
                        <CardTitle className="text-3xl">
                            {isEditMode ? 'Edit Recipe' : 'Create New Recipe'}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Recipe Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Delicious Chocolate Cake"
                                {...register('title', { required: true })}
                            />
                            {errors.title && (
                                <p className="text-sm text-destructive">Title is required</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
                            <Textarea
                                id="ingredients"
                                {...register('ingredients', { required: true })}
                                rows="4"
                                placeholder="2 cups flour, 1 cup sugar, 3 eggs, 1 cup milk..."
                            />
                            {errors.ingredients && (
                                <p className="text-sm text-destructive">Ingredients are required</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Instructions</Label>
                            <StepsEditor steps={steps} onChange={setSteps} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                                id="tags"
                                {...register('tags')}
                                placeholder="healthy, quick, dessert..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Recipe Photo</Label>
                            <ImageUpload value={photo} onChange={setPhoto} />
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" size="lg" className="flex-1">
                                {isEditMode ? 'Update Recipe' : 'Create Recipe'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddEditRecipe;
