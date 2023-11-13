import React from 'react';
import cross from "../../img/cross.png";
import { Link } from "react-router-dom";

class BurgerDiary extends React.Component {
    render() {
        return (
                <div className={this.props.burgerDiary ? "background_menu active" : "background_menu"} onClick={e => {
                    this.props.funcBurgerDiaryActive()
                }}>
                    <div className="window_menu" onClick={(e) => e.stopPropagation()}>
                        <button className="button_img_cross" onClick={()=> {this.props.funcBurgerDiaryActive()}}>
                            <img className="img_cross" src={cross} alt={"No img"}></img>
                        </button>
                        <div className="buttons_menu">
                            <Link className="button_diary" to="/" onClick={() => {this.props.funcBurgerDiaryActive()}}>Главная</Link>
                            <Link to='/articles/' className="button_articles"  onClick={() => {this.props.funcBurgerDiaryActive()}}>Статьи</Link>
                            <button className="button_logout" onClick={this.props.logout}>Выход</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default BurgerDiary