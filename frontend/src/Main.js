import React from "react";
import Register from "./components/Register";
import Auth from "./components/Auth";
import Menu from "./components/Menu";
import RandomArticles from "./components/RandomArticles"
import Articles from "./components/Articles";
import Offer from "./components/Offer";
import Burger from "./components/Burger";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Diary from "./Diary";



const link_api_auth = 'http://localhost:8000/api/auth/jwt/create/'
const link_api_register = 'http://localhost:8000/api/auth/register/'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modelActiveAuth: false,
            modelActiveReg: false,
            authorized: false,
            burger_active: false,
            response: [],
            error_one: {}
        }
        this.inputClickAuth = this.inputClickAuth.bind(this)
        this.inputClickReg = this.inputClickReg.bind(this)
        this.authorizedAuth = this.authorizedAuth.bind(this)
        this.funcBurgerActive = this.funcBurgerActive.bind(this)
        this.checkLocalStorage = this.checkLocalStorage.bind(this)
        this.funcAuth = this.funcAuth.bind(this)
        this.funcRegistered = this.funcRegistered.bind(this)
        this.resetStatus = this.resetStatus.bind(this)
    }
    render() {
        return (
            <div>
                <Burger burger={this.state.burger_active} setBurger={this.funcBurgerActive} setAuth={this.funcAuth}/>
                <div className="container">
                    <Menu setActive={this.inputClickAuth} auth={this.state.authorized} setBurger={this.funcBurgerActive} />
                        <div className="container_body">
                            <Offer setActive={this.inputClickReg} />
                            <RandomArticles />
                        </div>
                        <Register active={this.state.modelActiveReg} setActive={this.inputClickReg}
                                  error={this.state.error_one} setRegister={this.funcRegistered}
                                  reset={this.resetStatus}/>
                        <Auth active={this.state.modelActiveAuth} setActive={this.inputClickAuth}
                              setAuth={this.authorizedAuth} error={this.state.error_one} reset={this.resetStatus}/>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.checkLocalStorage()
    }

    checkLocalStorage() {
        const access = localStorage.getItem("access")
        const refresh = localStorage.getItem("refresh")
        if (access && refresh) {
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
            await axios.post(link_api_register, {
                username: formData.get("username"),
                password: formData.get("password"),
                password_confirmation: formData.get("password_confirmation"),
                email: formData.get("email")
            })
            this.inputClickReg()
        } catch (error) {
            if (error.response && error.response.status === 400) {
                this.setState({
                    error_one: error.response.data
                })
            } else {
                this.setState({
                    error_one: {'': 'Incorrect data. Please try again.'},
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
            if (error.response && error.response.status === 400) {
                this.setState({
                    error_one: error.response.data,
                });
                console.log(error)
            } else {
                this.setState({
                    error_one: {'': 'Incorrect username or password. Please try again.'},
                });
                console.log(error)
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

    resetStatus() {
        this.setState({ error_one: {}})
    }
}

export default Main