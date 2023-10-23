import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import AppArticle from "./pages/AppArticle";
import ArticlePage from "./pages/ArticlePage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from "./Main";
import Diary from "./Diary";
import CheckAuthComponent from "./components/CheckAuthComponent";
import axios from "axios";
import ModalWindow from "./components/ModalWindow";


const link_api_verify = 'http://localhost:8000/api/auth/jwt/verify/'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authentication_user: false, // Установите начальное состояние
            modal_window_active: false,
            token_api: false
        };
        this.checkAuth = this.checkAuth.bind(this)
        this.exitLogout = this.exitLogout.bind(this)
        this.funcModalWindowActive = this.funcModalWindowActive.bind(this)
    }
    componentDidMount() {
        this.checkAuth()
    }

    funcModalWindowActive() {
        if (this.state.modal_window_active) {
            this.setState({ modal_window_active: false })
        }
        else {
            this.setState({ modal_window_active: true })
        }
    }

    async checkAuth() {
            const access = localStorage.getItem("access")
            let result = {}
            if (access) {
                result = await axios.post(link_api_verify, {
                    token: access
                })
                if (Object.keys(result.data).length === 0) {
                    this.setState({authentication_user: true})
                    return true
                } else {
                    this.setState({authentication_user: false})
                    const accessAndRefreshToken = ["access", "refresh"]
                    accessAndRefreshToken.forEach(key => {localStorage.removeItem(key)})
                    return false
                }
            } else {
                this.setState({authentication_user: false})
                return false
            }
    }

    exitLogout() {
        this.setState({authentication_user: false})
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main setModalWindow={this.funcModalWindowActive} modalActive={this.state.modal_window_active} checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user} exitAccount={this.exitLogout}/>} />
                    {/*<Route path="/diary" element={<Diary setModalWindow={this.funcModalWindowActive} modalActive={this.state.modal_window_active} checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user} exitAccount={this.exitLogout}/>} />*/}
                    <Route path="/diary" element={
                        <CheckAuthComponent setModalWindow={this.funcModalWindowActive} modalActive={this.state.modal_window_active} checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user} exitAccount={this.exitLogout}/>
                    } />
                    <Route path="/modal" element={<ModalWindow checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user}/>} exit={this.exitLogout}/>
                    <Route path='/articles' element={<AppArticle setModalWindow={this.funcModalWindowActive} modalActive={this.state.modal_window_active}  checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user} exitAccount={this.exitLogout} />}/>
                    <Route exact path='/article/:articleId' element={<ArticlePage setModalWindow={this.funcModalWindowActive} modalActive={this.state.modal_window_active} checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user} exitAccount={this.exitLogout} />} />

                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;
