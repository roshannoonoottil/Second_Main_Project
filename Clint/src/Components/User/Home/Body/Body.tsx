import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './body.css'
import { RootState } from '../../../../Redux/store'; // adjust the path as needed
import { useSelector } from 'react-redux';

// const backendUrl = 'http://localhost:3000'

// ✅ Define Post + User types
interface User {
  _id: string;
  fullName: string;
  image?: string;
}

interface Post {
  _id: string;
  userId: User;
  content: string;
  image?: string | null;   // can be image or video
  createdAt: string;
  menuOpen?: boolean;
}

function Body() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // ✅ Typed state
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

const { user, isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth);

console.log('user data', user);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/post/posts');
        const data = await response.json();
        console.log('user data =>',data);
        
        if (data.success) {
          // ✅ Initialize menuOpen as false for each post
          setPosts(data.posts.map((p: Post) => ({ ...p, menuOpen: false })));
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      console.log("form data==>", formData,"imge==>", image);
      
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/post/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        toast.success(res.data.message || 'Post created!');
        setContent('');
        setImage(null);
        setIsModalOpen(false)
      } catch (err: any) {
        toast.error(err?.response?.data?.message || 'Failed to create post');
      }
    };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // ✅ store file for upload
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
    


    const handleDeletePost = async (postId: string) => {
  try {
    const token = localStorage.getItem("token");
    console.log('token',token);
    
    await axios.put(`http://localhost:3000/post/deletepost/${postId}`,{}, {
      headers: {
            Authorization: `Bearer ${token}`
          },
    });

    // ✅ Remove post from state (UI update after soft delete)
    setPosts((prev) => prev.filter((p) => p._id !== postId));

    toast.success("Post deleted successfully");
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Failed to delete post");
  }
};

const handleUpdatePost = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!editingPost) return;

  const formData = new FormData();
  formData.append("content", content);
  if (image) formData.append("image", image);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:3000/post/updatepost/${editingPost._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(res.data.message || "Post updated!");
    setPosts((prev) =>
      prev.map((p) =>
        p._id === editingPost._id ? { ...p, content, image: imagePreview } : p
      )
    );
    setIsModalOpen(false);
    setEditingPost(null);
    setContent("");
    setImage(null);
    setImagePreview(null);
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Failed to update post");
  }
};




  return (
    <main className="flex-1 px-2 md:px-4 py-4 flex flex-col md:flex-row gap-3 text-base">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:w-1/4 bg-white/50 rounded p-3 shadow-sm backdrop-blur-sm text-base">
        <h2 className="font-semibold text-gray-700 mb-1 text-lg">Navigation</h2>
        <ul className="space-y-1">
          <li><a href="#" className="text-gray-600 hover:text-black">Feed</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Friends</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Messages</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="w-full flex flex-row flex-wrap gap-3">
        {/* Feed Section */}
        <section className="flex-1 min-w-[65%] bg-white/60 p-3 rounded shadow-sm backdrop-blur-sm text-base">
          <h2 className="text-xl font-medium mb-3 text-gray-800">News Feed</h2>

          {/* Create Post Button */}
          <button
            onClick={() => {
              setEditingPost(null); // reset → means create mode
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-base mb-4"
          >
            + Create Post
          </button>
          {/* Scrollable Post Feed */}
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide">
            {/* Sample Post */}
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={post._id} className="bg-white/80 rounded p-3 shadow-sm text-base">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.userId?.image ? post.userId.image : "/Propic_demo.webp"}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {post.userId.fullName || "Anonymous"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                  {/* 3 Dots Dropdown – visible only for post owner */}
                  {/* 3 Dots Dropdown - Only for Post Owner or Admin */}
{isAuthenticated && (post.userId?._id === user.userId || isAdmin) && (
  <div className="relative">
    <button
      onClick={() =>
        setPosts((prev) =>
          prev.map((p, i) =>
            i === index ? { ...p, menuOpen: !p.menuOpen } : p
          )
        )
      }
      className="p-1 rounded-full hover:bg-gray-200"
    >
      <span className="text-3xl cursor-pointer">⋮</span>
    </button>

    {post.menuOpen && (
      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
        <button
          onClick={() => {
            setEditingPost(post);
            setContent(post.content);
            setImagePreview(post.image || null);
            setIsModalOpen(true);
          }}
          className="w-full text-left px-3 py-1 hover:bg-gray-100"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => handleDeletePost(post._id)}
          className="w-full text-left px-3 py-1 text-red-600 hover:bg-gray-100"
        >
          🗑 Delete
        </button>
      </div>
    )}
  </div>
)}

                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-2">{post.content}</p>

                  {/* Post Media */}
                  {post.image && (
                    <>
                      {post.image.endsWith(".mp4") ||
                      post.image.endsWith(".webm") ||
                      post.image.endsWith(".ogg") ? (
                        <video
                          src={post.image}
                          controls
                          muted
                          className="w-full max-w-md mx-auto object-contain rounded-md"
                        />
                      ) : (
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full max-w-md mx-auto object-contain rounded-md"
                        />
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No posts available.</p>
            )}

            {/* Add more post cards here */}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="w-full sm:w-[30%] md:w-1/4 bg-white/50 rounded p-3 shadow-sm backdrop-blur-sm text-base">
          <h2 className="font-semibold text-gray-700 mb-1 text-lg">Trending</h2>
          <ul className="space-y-1 text-gray-700">
            <li>#NewUpdate</li>
            <li>#MemeLife</li>
            <li>#MondayMotivation</li>
          </ul>
        </aside>
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
            <form onSubmit={editingPost ? handleUpdatePost : handleSubmit}>
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white w-[90%] max-w-md p-4 rounded shadow-lg text-base relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
                  >
                    ✖
                  </button>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {editingPost ? "Edit Post" : "Create Post"}
                  </h3>

                  <textarea
                    className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring focus:ring-blue-100 text-base"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    maxLength={2000}
                  />

                  <div className="flex items-center justify-between mt-3">
                    {/* Clickable Image Upload */}
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="w-20 h-20 border-2 border-white shadow-md rounded-lg overflow-hidden">
                        <img
                          src={imagePreview || "/media_placeholder_pic.webp"}
                          alt="Upload Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {/* Save / Post Button */}
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-base">
                      {editingPost ? "Save" : "Post"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

    </main>
  );
}

export default Body;
