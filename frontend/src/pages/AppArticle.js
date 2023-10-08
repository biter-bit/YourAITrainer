import React from "react";

import ArticlePage from "./ArticlePage";
import ArticleList from "./ArticleList";


class AppArticle extends React.Component {
//export default function App() {
    constructor(props){
        super(props)
        //const article = {id: 1, title: 'Грин', content: 'yhuhihiuhiuhiuhi', created_at: 1880, source:'hjjhj@jklkj.com'}
        //const article2 = {id: 2, title: 'Пушкин', content: 'yhuhihiuhiuhiuhi', created_at: 1799, source:'hjkhjj$jhkj'}
        //const articles = [article, article2]

        this.state = {
             'articles': [],
        }
    }

    componentDidMount() {
        const articles = [
            {id: 1, title: 'Грин', content: 'yhuhihiuhiuhiuhi', created_at: 1880, source:'hjjhj@jklkj.com'},
            {id: 2, title: 'Пушкин', content: 'yhuhihiuhiuhiuhi', created_at: 1799, source:'hjkhjj$jhkj'}
        ]
        this.setState(
            {
            'articles': articles
            }
        )
    }
    render(){
        return (


                 <ArticleList articles={this.state.articles}/>

        )
    }
}

export default AppArticle;
