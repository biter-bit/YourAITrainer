import React, { useState, useEffect } from "react";
import Articles from "./Articles";
import Pagination from "./Pagination";

const link_api_articles = 'http://127.0.0.1:8000/api/articles/';
const ROWS_PER_PAGE = 10 //count of articles on page

const AppArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
// <<<<<<< HEAD
//   const [data, setData] = useState();
//   const link_api_articles = 'http://192.168.31.62:8000/api/articles/'
// =======
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(link_api_articles, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  const lastArticleIndex = currentPage * ROWS_PER_PAGE
  const firstArticleIndex = lastArticleIndex - ROWS_PER_PAGE
  const currentArticle = data.slice(firstArticleIndex, lastArticleIndex)
  const pagination = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="container-fluid ">
    <div className="articleListmargin">
      <button className="logo" onClick={() => window.location.href = '/'}></button>
      {!isLoading && (
        <>
            <Articles articles={currentArticle} />
            <Pagination
                ROWS_PER_PAGE={ROWS_PER_PAGE}
                totalArticles={data.length}
                pagination={pagination}
            />
         </>)
        }
    </div>
    </div>
  );
};

export default AppArticle;
