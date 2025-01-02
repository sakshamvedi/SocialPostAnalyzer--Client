import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Heart,
    MessageCircle,
    Share2,
    MoreVertical,
    Image as ImageIcon,
    Video,
    SmilePlus,
    Send,
    X,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Plus,

} from "lucide-react";

const initialPosts = [
    {
        id: 1,
        author: "Vishu",
        avatar: "https://avatar.iran.liara.run/public/42",
        timestamp: "2 hours ago",
        content: "Just launched our new social media campaign! 🚀 The engagement metrics are looking promising. What strategies have worked best for your brands?",
        likes: 24,
        comments: 8,
        shares: 3,
        liked: false,
    },
    {
        id: 2,
        author: "Radhey Gupta",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s",
        timestamp: "5 hours ago",
        content: "Our latest carousel post achieved 2x more engagement than regular posts. Looks like visual storytelling is the way to go! 📈",
        likes: 45,
        comments: 12,
        shares: 7,
        liked: false,
    }
];

const PostCreator = () => {
    const [content, setContent] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        if (files.length) {
            setIsUploading(true);

            const newMediaPromises = files.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            url: reader.result,
                            type: file.type.startsWith('image/') ? 'image' : 'video',
                            file: file
                        });
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(newMediaPromises).then(newMedia => {
                setMediaFiles(prev => [...prev, ...newMedia]);
                setIsUploading(false);
            });
        }
    };

    const removeMedia = (index) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        if (currentSlide >= index && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % mediaFiles.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + mediaFiles.length) % mediaFiles.length);
    };

    return (
        <Card className="mb-6">
            <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                    <img
                        src="https://avatar.iran.liara.run/public/41"
                        alt="User avatar"
                        className="rounded-full h-32 w-32"
                    />
                    <div className="flex-1">
                        <textarea
                            className="w-full p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="What's on your mind?"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        {/* Media Preview Carousel */}
                        {mediaFiles.length > 0 && (
                            <div className="relative mt-3 rounded-lg overflow-hidden bg-black">
                                {/* Media Counter */}
                                {mediaFiles.length > 1 && (
                                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm z-20">
                                        {currentSlide + 1} / {mediaFiles.length}
                                    </div>
                                )}

                                {/* Navigation Arrows */}
                                {mediaFiles.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 z-20"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 z-20"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                    </>
                                )}

                                {/* Media Display */}
                                <div className="relative aspect-video">
                                    <button
                                        onClick={() => removeMedia(currentSlide)}
                                        className="absolute top-2 left-2 p-1 bg-black/70 rounded-full text-white hover:bg-black/90 z-20"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>

                                    {mediaFiles.map((media, index) => (
                                        <div
                                            key={index}
                                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300
                        ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                        >
                                            {media.type === 'image' ? (
                                                <img
                                                    src={media.url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <video
                                                    src={media.url}
                                                    controls
                                                    className="w-full h-full object-contain"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Dot Indicators */}
                                {mediaFiles.length > 1 && (
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
                                        {mediaFiles.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`w-2 h-2 rounded-full transition-all
                          ${index === currentSlide ? 'bg-white w-4' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Upload Progress */}
                        {isUploading && (
                            <div className="flex items-center justify-center mt-3 text-blue-600">
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                <span>Uploading media...</span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*,video/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    multiple
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-gray-600"
                                >
                                    <Plus className="h-5 w-5" />
                                    Add Media
                                </button>

                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <SmilePlus className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>

                            <button
                                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 
                  ${(!content && mediaFiles.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!content && mediaFiles.length === 0}
                            >
                                <Send className="h-4 w-4" />
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
const Post = ({ post, onLike }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    return (
        <Card className="mb-4">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <img
                            src={post.avatar}
                            alt={post.author}
                            className="rounded-full h-10 w-10"

                        />
                        <div>
                            <h3 className="font-semibold">{post.author}</h3>
                            <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                <p className="text-gray-800">{post.content}</p>
            </CardContent>

            <CardFooter className="flex flex-col border-t pt-3">
                <div className="flex justify-between items-center w-full">
                    <button
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${post.liked ? 'text-red-500' : 'text-gray-600'}`}
                        onClick={() => onLike(post.id)}
                    >
                        <Heart className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                    </button>

                    <button
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                        <Share2 className="h-5 w-5" />
                        <span>{post.shares}</span>
                    </button>
                </div>

                {showComments && (
                    <div className="w-full mt-4">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/api/placeholder/32/32"
                                alt="User avatar"
                                className="rounded-full"
                            />
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="w-full px-4 py-2 pr-10 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

const PostsSection = () => {
    const [posts, setPosts] = useState(initialPosts);

    const handleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                    liked: !post.liked
                };
            }
            return post;
        }));
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <PostCreator />
            <div className="space-y-4">
                {posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        onLike={handleLike}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostsSection;