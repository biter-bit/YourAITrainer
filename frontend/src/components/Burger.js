import React from 'react';
import cross from "../img/cross.png";

class BurgerMenu extends React.Component {
    logout = () => {
        const accessAndRefreshToken = ["access", "refresh"]
        accessAndRefreshToken.forEach(key => {localStorage.removeItem(key)})
        this.props.setBurger()
        this.props.setAuth()
    }
    render() {
        return (
                <div className={this.props.burger ? "background_menu active" : "background_menu"} onClick={e => {
                    {this.props.setBurger()}
                }}>
                    <div className="window_menu" onClick={(e) => e.stopPropagation()}>
                        <button className="button_img_cross" onClick={()=> {this.props.setBurger()}}>
                            <img className="img_cross" src={cross} alt={"No img"}></img>
                        </button>
                        <div className="buttons_menu">
                            <button className="button_diary">Дневник</button>
                            <button className="button_articles">Статьи</button>
                            <button className="button_logout" onClick={this.logout}>Выход</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default BurgerMenu