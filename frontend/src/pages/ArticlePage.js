import React from 'react';
//import Menu from "./components/Menu";
import { useParams } from 'react-router-dom';

function ArticlePage1(props) {
        

        return (

            <div class="articlePage">
                <h1>
                    {this.props.title}
                </h1>

             <div class="articleBlock link">
                <div class="articleSubBlock source">
                  {this.props.source}
                </div>

                <div class="articleSubBlock date">
                    {this.props.created_at}
                </div>
              </div>

              <div class="articleBlock content">
                <div class="articleSubBlock img">
                  <img src={this.props.img}
                    alt={'img ' + this.props.title}
                    align="left"
                    vspace="5" hspace="5"
                  />
                </div>
                <div class="articleSubBlock description">
                    <p>{this.props.content}</p>
                </div>
              </div>
            </div>
        );

}



