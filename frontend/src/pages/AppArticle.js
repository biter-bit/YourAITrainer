import React, { useState, useEffect } from "react";
import ArticlePreview from "./ArticlePreview";
import Pagination from "./Pagination";

const link_api_articles = 'http://127.0.0.1:8000/api/articles/';
const ROWS_PER_PAGE = 2
const AppArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('useeffect')

    fetch(link_api_articles, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, []);

  const lastArticleIndex = currentPage * ROWS_PER_PAGE
  const firstArticleIndex = lastArticleIndex - ROWS_PER_PAGE
  //const currentArticle = data.slice(firstArticleIndex, lastArticleIndex)
  const pagination = pageNumber => setCurrentPage(pageNumber)
  //console.log(data.slice(0,2))
  //console.log(data[0])
  //console.log(data.length)
  //console.log(Object.entries(data).slice(0,1).map(entry => entry[1]))

  //console.log(Array.prototype.slice.call(data,1,3))
  //console.log(Object.keys(data).length)

  return (
    <div className="container-fluid ">
    <div className="articleListmargin">
      <button className="logo" onClick={() => window.location.href = '/'}></button>
      {!isLoading &&
        data.map((article) => {
          return (
            <ArticlePreview  key={article.id} article={article} />
          );
        })}
        {!isLoading && (
            <Pagination
                ROWS_PER_PAGE={ROWS_PER_PAGE}
                totalArticles={Object.keys(data).length}
                pagination={pagination}
            />)}
        }
    </div>


    </div>
  );
};

export default AppArticle;
