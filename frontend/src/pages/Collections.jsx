import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Collections = () => {
    const [collections, setCollections] = useState([]);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchCollections = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/collections', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setCollections(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    const handleCreateCollection = async () => {
        if (!newCollectionName.trim()) return;
        try {
            await axios.post('http://localhost:5000/api/collections', { name: newCollectionName }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setNewCollectionName('');
            setIsDialogOpen(false);
            fetchCollections();
            toast.success('Collection created');
        } catch (err) {
            toast.error('Failed to create collection');
        }
    };

    const handleDeleteCollection = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/collections/${id}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchCollections();
            toast.success('Collection deleted');
        } catch (err) {
            toast.error('Failed to delete collection');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">My Collections</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Collection
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Collection</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <Input
                                placeholder="Collection Name"
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                            />
                            <Button onClick={handleCreateCollection} className="w-full">Create</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {collections.map((collection) => (
                    <Card key={collection._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">
                                <Link to={`/collections/${collection._id}`} className="hover:underline flex items-center gap-2">
                                    <FolderOpen className="h-5 w-5" />
                                    {collection.name}
                                </Link>
                            </CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCollection(collection._id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{collection.recipes.length} recipes</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Collections;
