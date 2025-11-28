import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import axios from 'axios';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
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
    }, []);

    return (
        <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge 
                variant={selectedCategory === '' ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => onSelectCategory('')}
            >
                All
            </Badge>
            {categories.map((cat) => (
                <Badge 
                    key={cat._id}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'}
                    className="cursor-pointer whitespace-nowrap"
                    onClick={() => onSelectCategory(cat.name)}
                >
                    {cat.name}
                </Badge>
            ))}
        </div>
    );
};

export default CategoryFilter;
