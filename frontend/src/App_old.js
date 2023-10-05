import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Diary from "./Diary";
import Main from "./components/Main";
import ModalWindow from "./components/ModalWindow";
import axios from "axios";
import AppArticle from "./pages/AppArticle";
import ArticlePage1 from "./pages/ArticlePage";
import ArticleList from "./pages/ArticleList";

const link_api_verify = 'http://localhost:8000/api/auth/jwt/verify/'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authentication_user: false, // Установите начальное состояние
          modal_window_active: false
        };
        this.checkAuth = this.checkAuth.bind(this)
        this.exitLogout = this.exitLogout.bind(this)
        this.funcModalWindowActive = this.funcModalWindowActive.bind(this)
    }
    componentDidMount() {
        this.checkAuth()
    }

    // funcAuth() {
    //     if (this.state.authentication_user) {
    //         this.setState({ authentication_user: false })
    //     }
    //     else {
    //         this.setState({ authentication_user: true })
    //     }
    // }

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
                } else {
                    this.setState({authentication_user: false})
                    const accessAndRefreshToken = ["access", "refresh"]
                    accessAndRefreshToken.forEach(key => {localStorage.removeItem(key)})
                }
            } else {
                this.setState({authentication_user: false})
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
                    <Route path="/diary" element={<Diary setModalWindow={this.funcModalWindowActive} modalActive={this.state.modal_window_active} checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user}/>} exit={this.exitLogout}/>
                    <Route path="/modal" element={<ModalWindow checkAuthentication={this.checkAuth} auth_user={this.state.authentication_user}/>} exit={this.exitLogout}/>
                    <Route path='/articles' element={ <AppArticle  />} />

                    <Route path='/articles/:'  element={<ArticlePage1  />} />



                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;
