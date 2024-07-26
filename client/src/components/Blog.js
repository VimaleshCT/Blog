import React, { useState } from "react";
import Articles from "./Articles";
import Editor from "./Editor";

const Blog = () => {
  const [update, setUpdate] = useState(false);

  const handlePostAdded = () => {
    setUpdate(!update); // Toggle state to re-fetch articles
  };

  return (
    <div>
      <Editor onPostAdded={handlePostAdded} />
      <Articles key={update} />
    </div>
  );
};

export default Blog;
