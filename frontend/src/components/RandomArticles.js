import React from 'react'
import axios from "axios";


class RandomArticles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            randomArticles: [],
            articleEl: []
        }
        this.fetchRandomArticles = this.fetchRandomArticles.bind(this)
        this.funcRender = this.funcRender.bind(this)
    }

    componentDidMount() {
        this.fetchRandomArticles()
    }

    async fetchRandomArticles() {
        const response = await axios.get(`http://127.0.0.1:8000/api/articles/`)
        const shuffledData = response.data.results.sort(() => 0.5 - Math.random());
        const selectedArticles = shuffledData.slice(0, 3);
        this.setState({randomArticles: selectedArticles}, () => {
          this.funcRender()
        })
    }

    funcRender() {
        this.setState({ articleEl: [] }, () => {
            this.state.randomArticles.forEach((articles) => {
                this.setState((prevState) => ({
                    articleEl: [
                        ...prevState.articleEl,
                        <div className="article" key={articles.id}>
                            <a className="link" href={articles.source} target='_blank'><div className="title_article"> {articles.title}</div></a>
                            <a className="link" href={articles.source} target='_blank'><img className='rectangle' src={articles.file} /></a>
                            <div className="short_article"> {articles.short_description}</div>
                        </div>
                    ],
                }));
            });
        });
    }

    render() {
        return (
            <div className="articles_container">
              {this.state.articleEl}
            </div>
        )
    }
}

export default RandomArticles