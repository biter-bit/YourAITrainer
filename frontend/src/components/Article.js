import React from 'react';

class Article extends React.Component {
    render() {
        return (
              <div className="article">
                <div className="title_article">{this.props.name_article}</div>
                <div className="description_article">{this.props.description}</div>
                <div className="rectangle" />
              </div>
        )
    }
}

export default Article