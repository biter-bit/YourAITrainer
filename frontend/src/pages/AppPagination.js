import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from "./Pagination";

const link_api_articles = 'http://127.0.0.1:8000/api/articles/';

const AppPagination = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
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
  //const currentArticle = Array.prototype.slice.call(data,firstArticleIndex, lastArticleIndex)
  const pagination = pageNumber => setCurrentPage(pageNumber)

  //console.log(Object.entries(data).slice(0,1).map(entry => entry[1]))

  //console.log(Array.prototype.slice.call(data,1,3))
  //console.log(Object.keys(data).length)


  return(
        <>
            {!isLoading && (
            <Pagination
                ROWS_PER_PAGE={ROWS_PER_PAGE}
                totalArticles={Object.keys(data).length}
                pagination={pagination}
            />)}
        </>
    )
};

export default AppPagination;

