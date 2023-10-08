import React from "react";
import Register from "./components/Register";
import Auth from "./components/Auth";
import Menu from "./components/Menu";

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import ArticlePage from "./pages/ArticlePage";
//import {HashRouter, Route} from 'react-router-dom';
import Main from "./components/Main";

const link_api_auth = 'http://localhost:8000/api/auth/jwt/create/'
const link_api_register = 'http://localhost:8000/api/auth/register/'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modelActiveAuth: false,
            modelActiveReg: false,
            authorized: false,
            burger_active: false,
            response: [],
            error: ""
        }
        this.inputClickAuth = this.inputClickAuth.bind(this)
        this.inputClickReg = this.inputClickReg.bind(this)
        this.authorizedAuth = this.authorizedAuth.bind(this)
        this.funcBurgerActive = this.funcBurgerActive.bind(this)
        this.checkLocalStorage = this.checkLocalStorage.bind(this)
        this.funcAuth = this.funcAuth.bind(this)
        this.funcRegistered = this.funcRegistered.bind(this)
    }
    render() {
        return (

            <div>
                <Main />
                //<Register active={this.state.modelActiveReg} setActive={this.inputClickReg} error={this.state.error} setRegister={this.funcRegistered}/>
                //<Auth active={this.state.modelActiveAuth} setActive={this.inputClickAuth} setAuth={this.authorizedAuth} error={this.state.error}/>


            </div>





        )
    }
    componentDidMount() {
        this.checkLocalStorage()
    }

    checkLocalStorage() {
        const access = localStorage.getItem("access")
        const refresh = localStorage.getItem("refresh")
        if (access && refresh){
            const data = { access, refresh }
            this.setState({ response: data, authorized: true })
        }
    }
    funcBurgerActive() {
        console.log(this.state.burger_active)
        if (this.state.burger_active) {
            this.setState({ burger_active: false })
        }
        else {
            this.setState({ burger_active: true })
        }
    }
    funcAuth() {
        if (this.state.authorized) {
            this.setState({ authorized: false })
        }
        else {
            this.setState({ authorized: true })
        }
    }
    async funcRegistered(event) {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        try {
            const response = await axios.post(link_api_register, {
                username: formData.get("username"),
                password: formData.get("password"),
                password_confirmation: formData.get("password_confirmation"),
                email: formData.get("email")
            })
            this.inputClickReg()
        } catch (error) {
            if (error.response && error.response.status === 400) {
                this.setState({
                    error: "Неверные данные",
                });
            } else {
                this.setState({
                    error: "Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.",
                });
            }
        }
    }
    async authorizedAuth(event) {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        try {
            const response = await axios.post(link_api_auth, {
                username: formData.get("username"),
                password: formData.get("password"),
            })
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh)

            const data = localStorage.getItem("access")

            if (data == null) {
                this.setState({ authorized: false })
                this.inputClickAuth()
            }

            else {
                this.setState({ authorized: true })
                this.inputClickAuth()
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                this.setState({
                    error: "Неправильный логин или пароль",
                });
            } else {
                this.setState({
                    error: "Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.",
                });
            }
        }
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