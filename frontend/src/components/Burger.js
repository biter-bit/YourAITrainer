import React from 'react';
import cross from "../img/cross.png";
import { Link } from "react-router-dom";

class BurgerMenu extends React.Component {
    render() {
        return (
                <div className={this.props.burger ? "background_menu active" : "background_menu"} onClick={e => {
                    this.props.setBurger()
                }}>
                    <div className="window_menu" onClick={(e) => e.stopPropagation()}>
                        <button className="button_img_cross" onClick={()=> {this.props.setBurger()}}>
                            <img className="img_cross" src={cross} alt={"No img"}></img>
                        </button>
                        <div className="buttons_menu">
                            <Link className="button_diary" to="/diary">Дневник</Link>
                            <Link to='articles/' className="button_articles">Статьи</Link>
                            <button className="button_logout" onClick={this.props.logout}>Выход</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default BurgerMenu
