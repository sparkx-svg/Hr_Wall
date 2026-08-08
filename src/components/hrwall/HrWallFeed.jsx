import React, { useState } from 'react';
import { Lightbulb, Briefcase, HelpCircle, BadgeCheck, ThumbsUp, MessageCircle, Link2 } from 'lucide-react';
import { hrFeedPosts } from '../../data/hrWallData';

export default function HrWallFeed() {
  const [posts, setPosts] = useState(hrFeedPosts);
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author: "Saran Prasanth",
      title: "Saran Prasanth",
      role: "AI Content Creator @ PeopleOps Labs",
      city: "Chennai",
      time: "Just now",
      badge: "Community Leader",
      content: newPostText,
      likes: 1,
      comments: 0,
      type: "Community Post"
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
          Exclusive Community Discussions
        </span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          HR Community Feed
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Share HR tips, policy questions, hiring updates, and labor law insights with 12,500+ peers.
        </p>
      </div>

      {/* Post Creator Box */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-md flex items-center justify-center text-white font-bold text-sm">
            SP
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Saran Prasanth</h4>
            <span className="text-xs text-slate-400 font-medium">Posting as Verified HR Professional</span>
          </div>
        </div>
        <form onSubmit={handleCreatePost}>
          <textarea
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-xs text-slate-900 dark:text-slate-100 outline-none resize-none mb-4 focus:border-blue-500"
            rows="3"
            placeholder="Share an HR tip, hiring update, poll, or policy question with the community..."
            value={newPostText}
            onChange={e => setNewPostText(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-3 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1"><Lightbulb className="w-3.5 h-3.5" strokeWidth={1.75} /> HR Tip</span>
              <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" strokeWidth={1.75} /> Hiring Update</span>
              <span className="inline-flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} /> Question</span>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-md text-xs">
              Publish Post
            </button>
          </div>
        </form>
      </div>

      {/* Feed Stream */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-6 hover:shadow-sm transition-shadow duration-150">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md flex items-center justify-center font-bold text-sm">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                    {post.author}
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-500" strokeWidth={1.75} />
                  </h4>
                  <span className="text-xs text-slate-400 block">{post.role} • {post.city}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full">
                {post.badge}
              </span>
            </div>

            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
              {post.content}
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-6 text-xs text-slate-500 font-semibold">
              <button onClick={() => handleLike(post.id)} className="hover:text-blue-600 flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.75} /> {post.likes} Likes
              </button>
              <button className="hover:text-blue-600 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} /> {post.comments} Comments
              </button>
              <button className="hover:text-blue-600 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
