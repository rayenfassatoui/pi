import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const CommentSection = ({ recipeId, comments = [], onCommentAdded, onCommentDeleted }) => {
    const [text, setText] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            const res = await fetch(`http://localhost:5000/api/recipes/${recipeId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ text })
            });

            if (res.ok) {
                const updatedComments = await res.json();
                onCommentAdded(updatedComments);
                setText('');
                toast.success('Comment added');
            } else {
                toast.error('Failed to add comment');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    const handleDelete = async (commentId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/recipes/${recipeId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });

            if (res.ok) {
                const updatedComments = await res.json();
                onCommentDeleted(updatedComments);
                toast.success('Comment deleted');
            } else {
                toast.error('Failed to delete comment');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-bold">Comments</h3>
            
            {user && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Add a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button type="submit">Post Comment</Button>
                </form>
            )}

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="flex gap-4 p-4 border rounded-lg">
                        <Avatar>
                            <AvatarImage src={comment.user?.avatar} />
                            <AvatarFallback>{comment.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{comment.user?.name}</p>
                                    <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                </div>
                                {user && user._id === comment.user?._id && (
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(comment._id)}>
                                        Delete
                                    </Button>
                                )}
                            </div>
                            <p className="mt-2">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
