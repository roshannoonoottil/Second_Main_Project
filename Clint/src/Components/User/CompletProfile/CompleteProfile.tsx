import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompleteProfile.css";
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
    <div className="profile-container">
      <h2>Complete Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>FullName:</label>
        <input type="text" value={fullName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter fullName" />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <label>Mobile:</label>
        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number" />
        {errors.mobile && <p className="error">{errors.mobile}</p>}

        <label>Email:</label>
        <input type="email" value={email} disabled />

        <label>Profile Image:</label>
<input type="file" accept="image/*" onChange={handleImageChange} />

{imagePreview && (
  <>
    {newImage ? (
      <img
        src={newImage}
        alt="New Image"
        style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "8px" }}
      />
    ) : (
      <img
        src={`http://localhost:3000${imagePreview}` || imagePreview}
        alt="Profile Preview"
        style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "8px" }}
      />
    )}
  </>
)}

{errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
<div className="button-group">
    <button type="submit">Continue</button>
    <button type="button" onClick={handleCancel}>Logout</button>
</div>

      </form>
    </div>
  );
};

export default Profile;
