import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const fetchList = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/shopping-list', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setItems(res.data.items);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItem.trim()) return;

        try {
            const res = await axios.post('http://localhost:5000/api/shopping-list/items', { text: newItem }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setItems(res.data.items);
            setNewItem('');
            toast.success('Item added');
        } catch (err) {
            toast.error('Failed to add item');
        }
    };

    const handleToggleItem = async (itemId, checked) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/shopping-list/items/${itemId}`, { checked }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setItems(res.data.items);
        } catch (err) {
            toast.error('Failed to update item');
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/shopping-list/items/${itemId}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setItems(res.data.items);
            toast.success('Item deleted');
        } catch (err) {
            toast.error('Failed to delete item');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold">Shopping List</h1>
            </div>

            <form onSubmit={handleAddItem} className="flex gap-2">
                <Input
                    placeholder="Add item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                </Button>
            </form>

            <div className="space-y-2">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={item.checked}
                                onCheckedChange={(checked) => handleToggleItem(item._id, checked)}
                            />
                            <span className={item.checked ? 'line-through text-muted-foreground' : ''}>
                                {item.text}
                            </span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item._id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">Your shopping list is empty</p>
                )}
            </div>
        </div>
    );
};

export default ShoppingList;
