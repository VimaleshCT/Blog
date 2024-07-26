const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "public")));

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

app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    if (articleInfo) {
      res.status(200).json(articleInfo);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  }, res);
});

app.get("/api/articles", async (req, res) => {
  withDB(async (db) => {
    const articles = await db.collection("articles").find({}).toArray();
    res.status(200).json(articles);
  }, res);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
