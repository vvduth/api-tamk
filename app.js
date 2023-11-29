const express = require("express");
const app = express();

const sequelize = require("./database");
const User = require("./models/user");
const Post = require("./models/post");
const router = express.Router();

app.use(express.json());

sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Post], 
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/posts", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.update(updateData);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use(router);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
