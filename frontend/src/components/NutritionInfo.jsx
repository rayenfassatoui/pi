import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const NutritionInfo = ({ ingredients }) => {
    // Mock calculation based on number of ingredients
    // In a real app, this would call a nutrition API
    const calculateNutrition = () => {
        const baseCalories = 150;
        const caloriesPerIngredient = 50;
        const totalCalories = baseCalories + (ingredients.length * caloriesPerIngredient);
        
        return {
            calories: totalCalories,
            protein: Math.round(totalCalories * 0.15),
            carbs: Math.round(totalCalories * 0.5),
            fat: Math.round(totalCalories * 0.35),
            fiber: Math.round(ingredients.length * 1.5)
        };
    };

    const nutrition = calculateNutrition();

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Nutrition Facts</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">Estimated per serving</p>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{nutrition.calories}</div>
                        <div className="text-xs text-muted-foreground">Calories</div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Protein</span>
                            <span className="font-medium">{nutrition.protein}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Carbs</span>
                            <span className="font-medium">{nutrition.carbs}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fat</span>
                            <span className="font-medium">{nutrition.fat}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fiber</span>
                            <span className="font-medium">{nutrition.fiber}g</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NutritionInfo;
