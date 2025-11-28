import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Upload, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const ImageUpload = ({ value, onChange }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/recipes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            onChange(res.data.url);
            toast.success('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to upload image');
        }
        setUploading(false);
    };

    const handleRemove = () => {
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-4">
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current.click()}
                    disabled={uploading}
                >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            {value && (
                <div className="relative w-full max-w-md mt-4">
                    <img 
                        src={value} 
                        alt="Recipe preview" 
                        className="w-full h-64 object-cover rounded-lg border"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
