import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [stats, setStats] = useState({ recipeCount: 0, totalRatings: 0, averageRating: 0 });
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const recipesRes = await axios.get(`http://localhost:5000/api/users/${user._id}/recipes`);
                    setRecipes(recipesRes.data);

                    const statsRes = await axios.get(`http://localhost:5000/api/users/${user._id}/stats`);
                    setStats(statsRes.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [user]);

    if (!user) return <div>Please login to view your recipes.</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">My Recipes</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Recipes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{stats.recipeCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{stats.totalRatings}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default MyRecipes;
