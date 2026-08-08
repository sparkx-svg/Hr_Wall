import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Briefcase, HelpCircle, BadgeCheck, ThumbsUp, MessageCircle, Link2, MoreHorizontal, Pencil, Trash2, Check, X } from 'lucide-react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

export default function HrWallFeed() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const menuRef = useRef(null);

  // Close the "..." menu on an outside click.
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Subscribe to the shared "posts" collection in Firestore.
  // onSnapshot keeps this live: any post anyone publishes shows up
  // for every visitor in real time, without a page refresh.
  useEffect(() => {
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    if (!currentUser) {
      alert('Please sign in to post.');
      return;
    }

    await addDoc(collection(db, 'posts'), {
      author: currentUser.displayName || 'HR Wall Member',
      authorId: currentUser.uid,
      role: 'HR Wall Member',
      city: '',
      badge: 'Community Member',
      content: newPostText,
      likes: 0,
      comments: 0,
      type: 'Community Post',
      createdAt: serverTimestamp(),
    });

    setNewPostText('');
  };

  const handleLike = async (id) => {
    await updateDoc(doc(db, 'posts', id), { likes: increment(1) });
  };

  const startEditing = (post) => {
    setEditingId(post.id);
    setEditText(post.content);
    setOpenMenuId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    await updateDoc(doc(db, 'posts', id), {
      content: editText,
      editedAt: serverTimestamp(),
    });
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post? This can\'t be undone.')) return;
    await deleteDoc(doc(db, 'posts', id));
    setOpenMenuId(null);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      
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
            {(currentUser?.displayName || 'You')[0].toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              {currentUser?.displayName || 'Sign in to post'}
            </h4>
            <span className="text-xs text-slate-400 font-medium">
              {currentUser ? 'Posting as yourself' : 'You need to sign in to publish a post'}
            </span>
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
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded">
                  {post.badge}
                </span>

                {currentUser && post.authorId === currentUser.uid && (
                  <div className="relative" ref={openMenuId === post.id ? menuRef : null}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                      aria-label="Post options"
                    >
                      <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
                    </button>

                    {openMenuId === post.id && (
                      <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-10 overflow-hidden">
                        <button
                          onClick={() => startEditing(post)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {editingId === post.id ? (
              <div className="mb-6">
                <textarea
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-xs text-slate-900 dark:text-slate-100 outline-none resize-none mb-3 focus:border-blue-500"
                  rows="3"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(post.id)}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded-md text-xs"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={2} /> Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold px-4 py-1.5 rounded-md text-xs"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
                {post.content}
                {post.editedAt && (
                  <span className="text-slate-400 italic ml-1.5">(edited)</span>
                )}
              </p>
            )}

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
