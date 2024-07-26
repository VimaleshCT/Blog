import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
const Article = () => {
  const { name } = useParams();
  const [articleInfo, setArticleInfo] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${name}`);
        if (response.ok) {
          const body = await response.json();
          setArticleInfo(body);
        } else {
          setArticleInfo(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticleInfo(null);
      }
    };

    fetchArticle();
  }, [name]);

  if (!articleInfo) {
    return <NotFound />;
  }

  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {articleInfo.title}
      </h1>
      <img
        src={articleInfo.imageUrl || "/static/images/default-image.jpg"}
        alt={articleInfo.title}
        className="w-full object-cover object-center mb-6"
      />
      {articleInfo.content && Array.isArray(articleInfo.content) ? (
        articleInfo.content.map((paragraph, index) => (
          <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
            {paragraph}
          </p>
        ))
      ) : (
        <p>No content available.</p>
      )}
      <CommentsList comments={articleInfo.comments || []} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
    </div>
  );
};

export default Article;
