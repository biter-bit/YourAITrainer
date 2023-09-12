import React, {useState} from "react";
import pre_2 from "./img/pre_2.png"
import logo_5 from "./img/logo_5.png"
import article_3 from "./img/article_3.jpeg"
import burger from "./img/burger.png"
import Register from "./components/Register";
import Auth from "./components/Auth";
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modelActiveAuth: false,
            modelActiveReg: false,
        }
        this.inputClickAuth = this.inputClickAuth.bind(this)
        this.inputClickReg = this.inputClickReg.bind(this)
    }
    render() {
        return (
            <div className="container">
                <div className="main_menu">
                  <div className="logo" />
                  <div className="title_container">
                    <button className="text-wrapper">Дневник</button>
                    <button className="text-wrapper">Статьи</button>
                  </div>
                  <button className="button_sign" onClick={() => this.inputClickAuth()}>Войти</button>
                  <input className="burger" type="image" src={burger} alt="none photo"/>
                </div>
                <div className="body">
                  <div className="offer">
                    <p className="title">YourAITrainer онлайн тренер</p>
                    <p className="discription">
                      Сервис генерации и ведения твоих тренировок на основе ChatGPT.
                      Работает без VPN
                    </p>
                    <div className="call-to-action">
                      <button className="button_reg" onClick={() => this.inputClickReg()}>Зарегистрироваться</button>
                      <p className="p">Построй свое тело за 30 дней</p>
                    </div>
                  </div>
                  <img className="pre" src={pre_2} />
                </div>
                <div className="body-2">
                  <div className="article">
                    <div className="text-wrapper-4">Название статьи</div>
                    <div className="text-wrapper-5">Описание статьи</div>
                    <div className="rectangle" />
                  </div>
                  <div className="article-2">
                    <div className="text-wrapper-4">Название статьи</div>
                    <div className="text-wrapper-5">Описание статьи</div>
                    <div className="rectangle" />
                  </div>
                  <div className="article-3">
                    <div className="text-wrapper-4">Название статьи</div>
                    <div className="text-wrapper-5">Описание статьи</div>
                    <div className="rectangle" />
                  </div>
                </div>
                <Register active={this.state.modelActiveReg} setActive={this.inputClickReg} />
                <Auth active={this.state.modelActiveAuth} setActive={this.inputClickAuth}/>

            </div>

        )
    }
    inputClickAuth() {
        if (this.state.modelActiveAuth) {
            this.setState({ modelActiveAuth: false })
        }
        else {
            this.setState({ modelActiveAuth: true })
        }
    }

    inputClickReg() {
        if (this.state.modelActiveReg) {
            this.setState({ modelActiveReg: false })
        }
        else {
            this.setState({ modelActiveReg: true })
        }
    }
}

export default App