import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import AdvancedSearch from '../components/AdvancedSearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChefHat } from 'lucide-react';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('newest');
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page,
                search,
                category,
                sort,
                ...filters
            });
            const res = await axios.get(`http://localhost:5000/api/recipes?${queryParams}`);
            setRecipes(res.data.recipes);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRecipes();
    }, [page, search, category, sort, filters]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchRecipes();
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-12 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl">
                <div className="flex justify-center">
                    <ChefHat className="h-16 w-16 text-primary" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Discover Delicious Recipes
                </h1>
                <p className="text-xl text-muted-foreground">
                    Share your culinary creations with the world
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 mt-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search for recipes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-12"
                        />
                    </div>
                    <Button type="submit">
                        <Search className="h-4 w-4" />
                    </Button>
                    <AdvancedSearch onSearch={setFilters} />
                </form>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <CategoryFilter selectedCategory={category} onSelectCategory={setCategory} />
                
                <select 
                    value={sort} 
                    onChange={(e) => setSort(e.target.value)}
                    className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Popular</option>
                    <option value="highest-rated">Highest Rated</option>
                </select>
            </div>

            {/* Recipes Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-4 text-muted-foreground">Loading recipes...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map(recipe => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>

                    {recipes.length === 0 && (
                        <div className="text-center py-20">
                            <ChefHat className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
                            <p className="mt-4 text-xl text-muted-foreground">No recipes found.</p>
                            <p className="text-sm text-muted-foreground">Try a different search term</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                Previous
                            </Button>
                            <span className="px-4 py-2 text-sm">
                                Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
                            </span>
                            <Button
                                variant="outline"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
