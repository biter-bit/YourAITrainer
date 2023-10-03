import React, { useState, useEffect } from 'react'

function RandomArticles() {
  const [randomArticles, setRandomArticles] = useState([])
  console.log(randomArticles)

  useEffect(() => {
    fetchRandomArticles()
  }, [])

  const fetchRandomArticles = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/articles/`)
    const data = await response.json();
    const shuffledData = data.results.sort(() => 0.5 - Math.random());
    const selectedArticles = shuffledData.slice(0, 3);
    setRandomArticles(selectedArticles)
  }

  return (

    <div>{
      randomArticles.map(articles => (
        <div className="articles_container">
          <div className="article" key={articles.id}>
            <a className="link" href={articles.source} target='_blank'><div className="title_article"> {articles.title}</div></a>
            {/* <div className="description_article">{articles.source.slice(0, 20) + '...'}</div> */}
            <a className="link" href={articles.source} target='_blank'><div className="rectangle"><img src={articles.file} /></div></a>
            <div className="short_article"> {articles.short_description}</div>
          </div>
        </div>
      ))
    }</div>

  )
}

export default RandomArticles