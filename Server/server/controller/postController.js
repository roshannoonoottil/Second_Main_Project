
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
              {
          folder: "posts",
          resource_type: "auto",
          transformation: [
            { width: 1200, height: 1200, crop: "limit" }, // shrink if bigger, keep ratio
            { quality: "auto" },                          // auto-optimize quality
            { fetch_format: "auto" }                      // use WebP/AVIF for smaller size
          ],
        },
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
    const posts = await Post.find({ softdelete: false })
      .populate('userId', 'fullName email image') // only select fields you need
      .populate('comments.userId', 'fullName image') // populate user info in comments too
      .sort({ createdAt: -1 }); // optional: latest posts first

    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user.userId; 
    console.log('user id',userId);
    
    const postId = req.params._id;
    console.log('postId',postId);

    // Find the post
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure the post belongs to the current user
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    // Soft delete
    post.softdelete = true;
    await post.save();

    res.status(200).json({ message: "Post soft deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const updatePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params._id;

    // Find the post
    let post = await Post.findById(postId);
    console.log('post = >', post);
    
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the logged-in user is the owner
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }
    console.log('newpost content =>',req.body.content);
    // Update content if provided
    if (req.body.content) {
      post.content = req.body.content;
      post.isEdited = true;
    }

    // Update image if new file is uploaded
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "posts",
            resource_type: "auto",
            transformation: [
              { width: 1200, height: 1200, crop: "limit" },
              { quality: "auto" },
              { fetch_format: "auto" }
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      post.image = uploadResult.secure_url;
      post.isEdited = true;
    }

    // Save updated post
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });

  } catch (error) {
    console.error("Error in updatePost:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
