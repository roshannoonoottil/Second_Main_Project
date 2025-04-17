import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

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
<form
  onSubmit={handleSubmit}
  className="w-full max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-4"
>
  <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="What's on your mind?"
    className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  />

  <div className="flex items-center justify-between">
    <label className="cursor-pointer text-blue-600 hover:underline">
      <span className="text-sm">Add Image</span>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>

    {image && (
      <span className="text-sm text-green-600 font-medium">
        {image.name}
      </span>
    )}
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
  >
    Post
  </button>
</form>

  );
};

export default CreatePost;
