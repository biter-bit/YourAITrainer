import React, { useState, useEffect } from "react";
import ArticlePreview from "./ArticlePreview";


const AppArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const link_api_articles = 'http://127.0.0.1:8000/api/articles/'

  useEffect(() => {
    fetch(link_api_articles, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container-fluid">
      <button className="logo" onClick={() => window.location.href = '/'}></button>
      {!isLoading &&
        data.map((article) => {
          return (
            <ArticlePreview  key={article.id} article={article} />
          );
        })}

    </div>
  );
};

export default AppArticle;
