const Post = require("../model/post.model");
const router = require("express").Router();
const { verifyToken, verifyTokenAndUser} = require('../middleware/verifyToken.middleware')

//add new Post
router.post("/new", verifyToken,  async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savePost = await newPost.save()
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", verifyTokenAndUser, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndUser, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Post
router.get("/:id", verifyTokenAndUser, async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id)
    res.status(200).json(Post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PostS
router.get("/", verifyTokenAndUser,  async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;