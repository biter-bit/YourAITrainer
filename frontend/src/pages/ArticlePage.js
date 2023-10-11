import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


const ArticlePage = () => {
    const {articleId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/articles/${articleId}/`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(`http://127.0.0.1:8000/api/articles/${articleId}/`)
      })
      .catch((error) => console.log(error));
  }, [articleId]);

  return (
    <>
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
                  <img src={data.img}
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
    </>
  );
};

export default ArticlePage;

