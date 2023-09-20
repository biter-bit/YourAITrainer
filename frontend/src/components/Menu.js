import React from 'react';
import burger from "../img/burger.png";

class Menu extends React.Component {

    render() {
        return (
              <div className="main_menu">
                <button className="logo" onClick={() => window.location.reload()}></button>
                <div className="title_container">
                  <button className="text-wrapper-button">Дневник</button>
                  <button className="text-wrapper-button">Статьи</button>
                </div>
                <button className={this.props.auth ? "button_sign" : "button_sign active"} onClick={() => this.props.setActive()}>Войти</button>
                <button className={this.props.auth ? "burger_button active" : "burger_button"} onClick={() => this.props.setBurger()}>
                    <img className="burger_img" src={burger} alt='No img'/>
                </button>
              </div>
        )
    }
}

export default Menu