import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User, Star } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
    return (
        <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={recipe.photo || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop'}
                    alt={recipe.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {recipe.category && (
                    <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-md text-foreground hover:bg-background/90 shadow-sm">
                        {recipe.category}
                    </Badge>
                )}
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-md text-primary-foreground shadow-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    New
                </Badge>
            </div>

            <CardHeader className="space-y-1">
                <h3 className="text-xl font-heading font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                </h3>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Avatar className="h-8 w-8 ring-2 ring-background">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {recipe.author?.name?.[0] || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{recipe.author?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium bg-yellow-500/10 px-2 py-1 rounded-full text-yellow-600 dark:text-yellow-400">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{recipe.averageRating?.toFixed(1) || '0.0'}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Link
                    to={`/recipe/${recipe._id}`}
                    className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shadow-md hover:shadow-lg hover:shadow-primary/20"
                >
                    View Recipe
                </Link>
            </CardFooter>
        </Card>
    );
};

export default RecipeCard;
