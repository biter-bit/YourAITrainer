import React, { useState, useEffect } from "react";
import Articles from "./Articles";
import Pagination from "./Pagination";

const ROWS_PER_PAGE = 10 //count of articles on page

const AppArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const link_api_articles = 'https://91.200.84.202:80/api/articles/'
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
