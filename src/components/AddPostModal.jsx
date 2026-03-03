import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { usePosts } from '@/context/PostsContext';

export default function AddPostModal({ onClose }) {
  const { addPost } = usePosts();
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [tags, setTags] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caption.trim() && image) {
      addPost({
        image,
        caption: caption.trim(),
        githubUrl: githubUrl.trim() || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-border rounded-2xl p-5 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Add New Post</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-all duration-200 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <div className="relative">
              {previewImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden animate-fade-in">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setPreviewImage(null); setImage(''); }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary hover:border-primary/50 transition-all duration-300 group">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Caption */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-medium mb-2">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe your project..."
              rows={3}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 resize-none text-sm"
            />
          </div>

          {/* GitHub URL */}
          <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <label className="block text-sm font-medium mb-2">GitHub URL (optional)</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm"
            />
          </div>

          {/* Tags */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, AWS..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!caption.trim() || !image}
            className="w-full py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50 text-sm animate-slide-up hover:scale-[1.02] active:scale-[0.98]"
            style={{ animationDelay: '0.25s' }}
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}
