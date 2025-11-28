import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserPlus, UserMinus } from 'lucide-react';

const FollowButton = ({ userId, isFollowing: initialIsFollowing, onToggle }) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);

    const handleFollowToggle = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to follow users');
                return;
            }

            const config = {
                headers: { 'x-auth-token': token }
            };

            if (isFollowing) {
                await axios.post(`http://localhost:5000/api/follow/unfollow/${userId}`, {}, config);
                toast.success('Unfollowed user');
            } else {
                await axios.post(`http://localhost:5000/api/follow/follow/${userId}`, {}, config);
                toast.success('Followed user');
            }

            setIsFollowing(!isFollowing);
            if (onToggle) onToggle(!isFollowing);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || 'Error updating follow status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button 
            variant={isFollowing ? "outline" : "default"} 
            onClick={handleFollowToggle}
            disabled={loading}
            size="sm"
        >
            {isFollowing ? (
                <>
                    <UserMinus className="mr-2 h-4 w-4" />
                    Unfollow
                </>
            ) : (
                <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Follow
                </>
            )}
        </Button>
    );
};

export default FollowButton;
