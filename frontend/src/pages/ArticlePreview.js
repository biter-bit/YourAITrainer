import React from 'react';
import {Link} from 'react-router-dom';

const ArticlePreview  = ({article})  => {
        return (
        <div key={article.id} className="articleList">
          <div className="articleListblock Articleimg">
            <img src={article.file}
                    alt={'img ' + article.title}
                    align="left"
                    vspace="5" hspace="5"
            />
          </div>
          <div className="articleListblock content">
            <div className="articleSubBlock Title">
                <h3 key={article.id}><Link to={`/article/${article.id}`} >{article.title} </Link></h3>
            </div>
            <div className="articleSubBlock content">
                {article.content}
            </div>
          <div className="articleSubBlock link">
          <p> {article.source + article.created_at} </p>
          </div>
          </div>
        </div>
        )
}

export default ArticlePreview;