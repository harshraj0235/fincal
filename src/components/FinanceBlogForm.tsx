import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Image, Video, Link as LinkIcon } from 'lucide-react';
import { addFinancePost, FinancePost } from '../data/financePosts';

interface FinanceBlogFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinanceBlogForm: React.FC<FinanceBlogFormProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in the title and content fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() + '-' + Date.now();

      const newPost: FinancePost = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        link: link.trim() || undefined,
        image: image.trim() || undefined,
        video: video.trim() || undefined,
        slug,
        createdAt: new Date().toISOString(),
        author: author.trim() || 'Anonymous',
        category: category.trim() || 'Finance'
      };

      addFinancePost(newPost);
      
      // Reset form
      setTitle('');
      setContent('');
      setLink('');
      setImage('');
      setVideo('');
      setAuthor('');
      setCategory('');
      
      onClose();
      
      // Navigate to the new post
      navigate(`/finance/${slug}`);
    } catch (error) {
      console.error('Error adding post:', error);
      alert('There was an error adding your post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Add Finance Blog Post</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog post title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your finance blog content here..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {content.length} characters
            </p>
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author Name
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="Personal Finance">Personal Finance</option>
              <option value="Investment">Investment</option>
              <option value="Tax Planning">Tax Planning</option>
              <option value="Insurance">Insurance</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Cryptocurrency">Cryptocurrency</option>
              <option value="Banking">Banking</option>
              <option value="Business Finance">Business Finance</option>
              <option value="Retirement Planning">Retirement Planning</option>
            </select>
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <LinkIcon size={16} />
              External Link (optional)
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Image size={16} />
              Image URL (optional)
            </label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Video URL */}
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Video size={16} />
              Video URL (optional)
            </label>
            <input
              type="url"
              id="video"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Submit Post
                </>
              )}
            </button>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceBlogForm; 