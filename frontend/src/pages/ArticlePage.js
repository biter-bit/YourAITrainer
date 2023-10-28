import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const ArticlePage = () => {
    const {articleId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const link_api_article_id = `http://localhost:8000/api/articles/${articleId}/`;

  useEffect(() => {
    fetch(link_api_article_id, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(link_api_article_id)
      })
      .catch((error) => console.log(error));
  }, [articleId]);

  return (
    <div className="container-fluid">
        <div className="btn_article">
          <button className="logo" onClick={() => window.location.href = '/'}></button>
          <Link className="button_sign active" to="/articles">Статьи</Link>
        </div>
      {!isLoading && (
      <>
        <div className="articlePage">
                <h1>
                    {data.title}
                </h1>

             <div className="articleBlock link">
                <div className="articleSubBlock source">
                  {data.source}
                </div>

                <div className="articleSubBlock date">
                    {data.created_at}
                </div>
              </div>

              <div className="articleBlock content">
                <div className="articleSubBlock img">
                  <img src={data.file}
                    alt={'img ' + data.title}
                    align="left"
                    vspace="5" hspace="5"
                  />
                </div>
                <div className="articleSubBlock description">
                    <p>{data.content}</p>
                </div>
           </div>
        </div>
      </>
      )}
    </div>
  );
};

export default ArticlePage;

