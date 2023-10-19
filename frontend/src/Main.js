import React from "react";
import Register from "./components/Register";
import Auth from "./components/Auth";
import Menu from "./components/Menu";
import RandomArticles from "./components/RandomArticles"
import Offer from "./components/Offer";
import Burger from "./components/Burger";
import ModalWindow from "./components/ModalWindow";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";



const link_api_auth = 'http://192.168.31.62:8000/api/auth/jwt/create/'
const link_api_register = 'http://192.168.31.62:8000/api/auth/register/'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modelActiveAuth: false,
            modelActiveReg: false,
            burger_active: false,
            response: [],
            error_one: {},
            exercise: {}
        }
        this.inputClickAuth = this.inputClickAuth.bind(this)
        this.inputClickReg = this.inputClickReg.bind(this)
        this.authorizedAuth = this.authorizedAuth.bind(this)
        this.funcBurgerActive = this.funcBurgerActive.bind(this)
        this.funcRegistered = this.funcRegistered.bind(this)
        this.resetStatus = this.resetStatus.bind(this)
    }
    render() {
        return (
            <div>
                <Burger exitAccount={this.props.exitAccount} burger={this.state.burger_active} setBurger={this.funcBurgerActive} checkAuth={this.props.checkAuthentication}/>
                <div className="container">
                    <Menu setActive={this.inputClickAuth} auth={this.props.auth_user} setBurger={this.funcBurgerActive} />
                        <div className="container_body">
                            <Offer setActive={this.inputClickReg} />
                            <RandomArticles />
                        </div>
                        <Register active={this.state.modelActiveReg} setActive={this.inputClickReg}
                                  error={this.state.error_one} setRegister={this.funcRegistered}
                                  reset={this.resetStatus}/>
                        <Auth active={this.state.modelActiveAuth} setActive={this.inputClickAuth}
                              setAuth={this.authorizedAuth} error={this.state.error_one} reset={this.resetStatus}/>
                        <ModalWindow setModalWindow={this.props.setModalWindow} modalActive={this.props.modalActive}/>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.props.checkAuthentication()
        const showModal = new URLSearchParams(window.location.search).get('showModal');
        if (showModal === 'true') {
            this.props.setModalWindow();
        }
    }

    funcBurgerActive() {
        if (this.state.burger_active) {
            this.setState({ burger_active: false })
        }
        else {
            this.setState({ burger_active: true })
        }
    }
    async funcRegistered(event) {
        // регистрация пльзователя
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
        // авторизация пользователя
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

            this.props.checkAuthentication()
            this.inputClickAuth()
        } catch (error) {
            if (error.response && error.response.status === 400) {
                this.setState({
                    error_one: error.response.data,
                });
            } else {
                this.setState({
                    error_one: {'': 'Incorrect username or password. Please try again.'},
                });
            }
        }
    }
    inputClickAuth() {
        // активирует и деактивирует окно авторизации
        if (this.state.modelActiveAuth) {
            this.setState({ modelActiveAuth: false })
        }
        else {
            this.setState({ modelActiveAuth: true })
        }
    }

    inputClickReg() {
        // активирует и деактивирует окно
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

    handleButtonClick(button) {

    }
}

export default Main