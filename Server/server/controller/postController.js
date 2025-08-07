import Post from "../model/userPost.js";


export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const userId = req.user.userId;

    console.log("content==>", content);
    console.log("userId==>", userId);
    console.log("image==>", image);
    
    if (!content) {
      return res.status(400).json({ success: false, message: 'Post content is required.' });
    }

    const newPost = new Post({ userId, content, image });
    await newPost.save();

    res.status(201).json({ success: true, message: 'Post created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'fullName email profilePicture') // only select fields you need
      .populate('comments.userId', 'fullName profilePicture') // populate user info in comments too
      .sort({ createdAt: -1 }); // optional: latest posts first

    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
