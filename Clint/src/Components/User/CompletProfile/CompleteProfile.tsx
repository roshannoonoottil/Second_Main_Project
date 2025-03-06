import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch} from 'react-redux';
import { logout } from "../../../Redux/authSlice";

interface User {
  _id: string;
  fullName: string;
  mobile: string;
  email: string;
  image: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setUserName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newImage, setNewImage] = useState<string | null>(null);


  const token = localStorage.getItem('token');
  if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  

  useEffect(() => {
    if(!token){
      navigate('/')
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/home");
        
        const userData: User = response.data.data;
        console.log('user data :', userData);
        console.log('image path', userData.image);
        
        

        setUser(userData);
        setUserName(userData.fullName);
        setMobile(userData.mobile);
        setEmail(userData.email);
        setImagePreview(`http://localhost:3000${userData.image}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        setErrors({ image: "Only JPG, JPEG, PNG, and WEBP files are allowed." });
        return;
      }

      if (file.size > maxSize) {
        setErrors({ image: "File size must be less than 2MB." });
        return;
      }

      setImage(file);
      setNewImage(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    if (!fullName) validationErrors.fullName = "fullName is required";
    if (!mobile) validationErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(mobile)) validationErrors.mobile = "Mobile number must be exactly 10 digits";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && user) {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("fullName", fullName);
      formData.append("mobile", mobile);
      if (image) formData.append("image", image);

      try {
        const response = await axios.post("http://localhost:3000/user/complete-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200) {
          alert("Profile updated successfully!");
          navigate("/home");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleCancel = () =>{
          dispatch(logout())
          localStorage.removeItem('token')
          navigate("/home");
  } 

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-gray-900/90 backdrop-blur-lg shadow-xl rounded-lg text-white">
      <h2 className="text-xl font-semibold text-center mb-4">Complete Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        
        {/* Full Name */}
        <input
          type="text"
          value={fullName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-cyan-400 outline-none"
          placeholder="Full Name"
        />
        {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName}</p>}

        {/* Mobile */}
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-cyan-400 outline-none"
          placeholder="Mobile Number"
        />
        {errors.mobile && <p className="text-red-400 text-xs">{errors.mobile}</p>}

        {/* Email (Read-Only) */}
        <input
          type="email"
          value={email || ""}
          disabled
          className="w-full p-2 bg-gray-700 text-gray-300 rounded-md border border-gray-500 outline-none cursor-not-allowed"
        />

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Update Profile Picture</h3>

          {/* Clickable Image */}
          <label htmlFor="file-upload" className="cursor-pointer">
            <img
              src={imagePreview || newImage || "/Propic_demo.webp"} // Fix: Ensure the default image is always there
              alt="Profile Preview"
              className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-md object-cover transition hover:opacity-80"
              onError={(e) => (e.currentTarget.src = "/Propic_demo.webp")} // Fix: If the image fails to load, fallback to default
            />
          </label>

          {/* Hidden File Input */}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        {errors.image && <p className="text-red-400 text-xs">{errors.image}</p>}

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-md shadow-md hover:scale-105 hover:bg-cyan-600 transition-transform"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:scale-105 hover:bg-red-600 transition-transform"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
