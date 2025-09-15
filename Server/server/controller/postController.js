
import cloudinary from '../lib/cloudinary.js';
import Post from "../model/userPost.js";
import streamifier from "streamifier";


export const createPost = async (req, res) => {
  try {
    const { content} = req.body;
    const userId = req.user.userId;
    
    if (!content) {
      return res.status(400).json({ success: false, message: 'Post content is required.' });
    }

    let imageUrl;

    // If image exists, upload to Cloudinary
    if (req.file) {
  // Convert buffer to stream and upload
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "posts", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageUrl = uploadResult.secure_url;
    }


    const newPost = new Post({
      userId,
      content,
      image: imageUrl || null,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully.',
      post: newPost,
    });
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'fullName email image') // only select fields you need
      .populate('comments.userId', 'fullName image') // populate user info in comments too
      .sort({ createdAt: -1 }); // optional: latest posts first

    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
