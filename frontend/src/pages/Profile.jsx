import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import UserList from '../components/UserList';
import ImageUpload from '../components/ImageUpload';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('recipes');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        bio: '',
        avatar: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users/profile', {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setProfile(res.data);
            setEditForm({
                bio: res.data.bio || '',
                avatar: res.data.avatar || ''
            });
        } catch (err) {
            console.error(err);
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const res = await axios.put('http://localhost:5000/api/users/profile', editForm, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setProfile(prev => ({ ...prev, ...res.data }));
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update profile');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center py-20">
                <User className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-4 text-xl text-muted-foreground">Please login to view profile.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Profile Card */}
            <Card>
                <CardContent className="pt-6">
                    {isEditing ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Edit Profile</h2>
                                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={editForm.avatar} />
                                        <AvatarFallback>{profile.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="w-full max-w-xs">
                                        <Label>Profile Picture</Label>
                                        <ImageUpload 
                                            value={editForm.avatar} 
                                            onChange={(url) => setEditForm(prev => ({ ...prev, avatar: url }))} 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Bio</Label>
                                    <Textarea 
                                        value={editForm.bio} 
                                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                    />
                                </div>

                                <Button onClick={handleUpdateProfile} className="w-full">
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                                <AvatarImage src={profile.avatar} />
                                <AvatarFallback className="text-4xl">{profile.name?.[0]}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 text-center md:text-left space-y-2">
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                {profile.bio && <p className="text-muted-foreground max-w-md">{profile.bio}</p>}
                                
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground pt-2">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {profile.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Joined {new Date(profile.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 min-w-[200px]">
                                <div className="grid grid-cols-3 gap-2 text-center bg-muted/50 p-3 rounded-lg">
                                    <div>
                                        <div className="font-bold text-lg">{profile.recipes?.length || 0}</div>
                                        <div className="text-xs text-muted-foreground">Recipes</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{profile.followers?.length || 0}</div>
                                        <div className="text-xs text-muted-foreground">Followers</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{profile.following?.length || 0}</div>
                                        <div className="text-xs text-muted-foreground">Following</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Tabs Navigation */}
            <div className="flex border-b overflow-x-auto">
                <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'recipes' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('recipes')}
                >
                    My Recipes
                </button>
                <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'favorites' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
                <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'followers' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('followers')}
                >
                    Followers
                </button>
                <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'following' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('following')}
                >
                    Following
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'recipes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profile.recipes?.map(recipe => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                        {profile.recipes?.length === 0 && (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                You haven't shared any recipes yet.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profile.favorites?.map(recipe => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                        {profile.favorites?.length === 0 && (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                No favorite recipes yet.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'followers' && (
                    <UserList users={profile.followers} />
                )}

                {activeTab === 'following' && (
                    <UserList users={profile.following} />
                )}
            </div>
        </div>
    );
};

export default Profile;
