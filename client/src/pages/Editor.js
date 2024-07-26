import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useState } from "react";

const Editor = ({ onPostAdded }) => {
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePost = async () => {
    const result = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, author, content: editorData, imageUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      const body = await result.json();
      console.log("Post added:", body);
      setTitle("");
      setAuthor("");
      setEditorData("");
      setImageUrl("");
      if (onPostAdded) {
        onPostAdded(); // Notify parent component to re-fetch articles
      }
    } else {
      console.error("Failed to add post");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>Add a New Blog Post</h1>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Image URL:
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
        />
      </div>
      <button
        onClick={handlePost}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Post
      </button>
    </div>
  );
};

export default Editor;
