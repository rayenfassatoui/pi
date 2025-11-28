import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { SlidersHorizontal } from 'lucide-react';

const AdvancedSearch = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        ingredient: '',
        minRating: '',
        maxTime: ''
    });
    const [open, setOpen] = useState(false);

    const handleSearch = () => {
        onSearch(filters);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Advanced Search</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Ingredient</Label>
                        <Input 
                            placeholder="e.g. Chicken, Tomato" 
                            value={filters.ingredient}
                            onChange={(e) => setFilters({ ...filters, ingredient: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Minimum Rating</Label>
                        <Input 
                            type="number" 
                            min="1" 
                            max="5" 
                            placeholder="1-5"
                            value={filters.minRating}
                            onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                        />
                    </div>
                    <Button onClick={handleSearch} className="w-full">Apply Filters</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AdvancedSearch;
