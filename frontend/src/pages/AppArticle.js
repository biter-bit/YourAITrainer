import React, { useState, useEffect } from "react";
import ArticlePreview from "./ArticlePreview";
import Burger from "./../components/Burger";

const AppArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles/", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Burger />
      {!isLoading &&
        data.map((article) => {
          return (
            <ArticlePreview  key={article.id} article={article} />
          );
        })}
    </>
  );
};

export default AppArticle;
