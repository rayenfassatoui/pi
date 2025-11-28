import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const UserList = ({ users }) => {
    if (!users || users.length === 0) {
        return <div className="text-center text-muted-foreground py-8">No users found.</div>;
    }

    return (
        <div className="grid gap-4">
            {users.map(user => (
                <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Link to={`/user/${user._id}`} className="font-medium hover:underline">
                                {user.name}
                            </Link>
                            {user.bio && (
                                <p className="text-sm text-muted-foreground line-clamp-1">{user.bio}</p>
                            )}
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                        <Link to={`/user/${user._id}`}>View Profile</Link>
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default UserList;
