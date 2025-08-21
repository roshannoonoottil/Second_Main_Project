import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './body.css'

const backendUrl = 'http://localhost:3000'

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
   const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/post/posts');
        const data = await response.json();
        console.log('user data =>',data);
        
        if (data.success) {
          setPosts(data.posts);
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
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
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
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-base mb-4"
          >
            + Create Post
          </button>

          {/* Scrollable Post Feed */}
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide">
            {/* Sample Post */}
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index} className="bg-white/80 rounded p-3 shadow-sm text-base">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={
                          post.userId?.image
                            ? `${backendUrl}/${post.userId.image}`
                            : "https://via.placeholder.com/40"
                          }
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{post.userId.fullName || 'Anonymous'}</h3>
                      <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full max-w-md mx-auto object-contain rounded-md"
                    />
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
        <form 
        onSubmit={handleSubmit}
        >
          
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-4 rounded shadow-lg text-base relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Create Post</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring focus:ring-blue-100 text-base"
              rows={3}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={2000}
            ></textarea>
            <div className="flex items-center justify-between mt-3">
              <label className="cursor-pointer inline-flex items-center gap-1 text-blue-600 hover:underline text-base">
                <input type="file" className="hidden" onChange={handleFileChange} />
                📷 Add Photo
              </label>
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-base">
                Post
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
