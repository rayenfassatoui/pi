import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User, Star } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
    return (
        <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative overflow-hidden">
                <img
                    src={recipe.photo || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop'}
                    alt={recipe.title}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                />
                {recipe.category && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        {recipe.category}
                    </Badge>
                )}
                <Badge className="absolute top-2 right-2 bg-background/90">
                    <Clock className="mr-1 h-3 w-3" />
                    New
                </Badge>
            </div>

            <CardHeader>
                <h3 className="text-xl font-bold line-clamp-2">{recipe.title}</h3>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback>{recipe.author?.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <span>By {recipe.author?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.averageRating?.toFixed(1) || '0.0'}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Link
                    to={`/recipe/${recipe._id}`}
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    View Recipe
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RecipeCard;
