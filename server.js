const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ extended: false }));
app.use(bodyParser.json());

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("mernblog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database", error });
  }
};

// Fetch all articles
app.get("/api/articles", async (req, res) => {
  withDB(async (db) => {
    const articles = await db.collection("articles").find({}).toArray();
    res.status(200).json(articles);
  }, res);
});

// Fetch a single article by name
app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res);
});

// Add comments to an article
app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
});

// Add a new blog post
app.post("/api/posts", (req, res) => {
  const { title, author, content, imageUrl, category } = req.body;

  withDB(async (db) => {
    const newPost = {
      name: title.toLowerCase().replace(/ /g, "-"),
      title,
      author,
      content,
      imageUrl,
      category,
      comments: [],
    };
    await db.collection("articles").insertOne(newPost);
    res.status(201).json(newPost);
  }, res);
});

// Fetch all posts (this should be the same as fetching all articles)
app.get("/api/posts", (req, res) => {
  withDB(async (db) => {
    const posts = await db.collection("articles").find({}).toArray();
    res.status(200).json(posts);
  }, res);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
