import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import FollowButton from '../components/FollowButton';
import UserList from '../components/UserList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Calendar } from 'lucide-react';

const UserProfile = () => {
    const { id } = useParams();
    const { user: currentUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('recipes');
    const [stats, setStats] = useState({ followers: 0, following: 0, recipes: 0 });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/users/${id}/profile`);
                setProfile(res.data);
                setStats({
                    followers: res.data.followers?.length || 0,
                    following: res.data.following?.length || 0,
                    recipes: res.data.recipes?.length || 0
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!profile) {
        return <div className="text-center py-20">User not found</div>;
    }

    const isOwnProfile = currentUser && currentUser._id === profile._id;
    const isFollowing = profile.followers?.some(f => f._id === currentUser?._id);

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header Section */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                            <AvatarImage src={profile.avatar} />
                            <AvatarFallback className="text-4xl">{profile.name?.[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-bold">{profile.name}</h1>
                            {profile.bio && <p className="text-muted-foreground max-w-md">{profile.bio}</p>}
                            
                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Joined {new Date(profile.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            {!isOwnProfile && (
                                <FollowButton 
                                    userId={profile._id} 
                                    isFollowing={isFollowing}
                                    onToggle={(newStatus) => {
                                        setStats(prev => ({
                                            ...prev,
                                            followers: newStatus ? prev.followers + 1 : prev.followers - 1
                                        }));
                                    }}
                                />
                            )}
                            <div className="grid grid-cols-3 gap-2 text-center bg-muted/50 p-3 rounded-lg">
                                <div>
                                    <div className="font-bold text-lg">{stats.recipes}</div>
                                    <div className="text-xs text-muted-foreground">Recipes</div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{stats.followers}</div>
                                    <div className="text-xs text-muted-foreground">Followers</div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{stats.following}</div>
                                    <div className="text-xs text-muted-foreground">Following</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs Navigation */}
            <div className="flex border-b">
                <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'recipes' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('recipes')}
                >
                    Recipes
                </button>
                <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'followers' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('followers')}
                >
                    Followers
                </button>
                <button
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
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
                                No recipes shared yet.
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

export default UserProfile;
