import React from 'react';
import Article from './Article'

class Articles extends React.Component {
    render() {
        return (
            <div className="articles_container">
                <Article name_article={"Name_1"} description={"Description_1"}/>
                <Article name_article={"Name_2"} description={"Description_2"}/>
                <Article name_article={"Name_3"} description={"Description_3"}/>
            </div>
        )
    }
}

export default Articles