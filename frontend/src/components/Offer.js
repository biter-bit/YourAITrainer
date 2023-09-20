import React from 'react';
import pre_2 from "../img/pre_2.png";
import pre_3 from "../img/body_bild 1.svg";

class Offer extends React.Component {
    render() {
        return (
            <div className="container_full_offer">
              <div className="container_offer">
                <p className="title">YourAITrainer онлайн тренер</p>
                <p className="discription">
                  Сервис генерации и ведения твоих тренировок на основе ChatGPT.
                  Работает без VPN
                </p>
                <div className="call-to-action">
                  <button className="button_reg" onClick={() => this.props.setActive()}>Зарегистрироваться</button>
                  <p className="action">Построй свое тело за 30 дней</p>
                </div>
              </div>
              <img className="img_body" src={pre_2} alt={'No img'}/>
              <img className="img_body_telephone" src={pre_3} alt={'No img'}/>
              <button className="container_img" onClick={() => this.props.setActive()}>Зарегистрироваться</button>
            </div>
        )
    }
}

export default Offer