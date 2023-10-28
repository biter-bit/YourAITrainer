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
            token_api: false,
            loadingProgram: false,
            loadingTrainingDay: false,
            trainingProgram: {},
            trainingDays: {},
            workoutProgram: {},
            approachesProgram: {},
            exerciseActive: false,
            profile: {},
            windowSettingsActive: false,
            windowProfileActive: false,
            error_one: {},
            currentTraining: ''
        };
        this.checkAuth = this.checkAuth.bind(this)
        this.exitLogout = this.exitLogout.bind(this)
        this.funcModalWindowActive = this.funcModalWindowActive.bind(this)
        this.funcAddProgram = this.funcAddProgram.bind(this)
        this.funcLoadingSuccess = this.funcLoadingSuccess.bind(this)
        this.funcAddTrainingDay = this.funcAddTrainingDay.bind(this)
        this.funcLoadingTrainingSuccess = this.funcLoadingTrainingSuccess.bind(this)
        this.funcExerciseActive = this.funcExerciseActive.bind(this)
        this.funcSetProfile = this.funcSetProfile.bind(this)
        this.funcWindowSettingsActive = this.funcWindowSettingsActive.bind(this)
        this.funcWindowProfileActive = this.funcWindowProfileActive.bind(this)
        this.funcChangeError = this.funcChangeError.bind(this)
        this.funcCurrentTrainingChange = this.funcCurrentTrainingChange.bind(this)
    }
    componentDidMount() {
        this.checkAuth().then(r => undefined)
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
                try {
                    result = await axios.post(link_api_verify, {
                        token: access
                    })

                    if (Object.keys(result.data).length === 0) {
                        this.setState({authentication_user: true})
                        return true
                    } else {
                        this.setState({authentication_user: false})
                        const accessAndRefreshToken = ["access", "refresh"]
                        accessAndRefreshToken.forEach(key => {
                            localStorage.removeItem(key)
                        })
                        return false
                    }
                } catch (error) {
                    console.error("Error while checking authentication:", error);
                    this.setState({ authentication_user: false });
                    return false;
                }
            } else {
                this.setState({authentication_user: false})
                return false
            }
    }

    exitLogout() {
        this.setState({authentication_user: false})
    }

    funcAddProgram(program) {
        this.setState({trainingProgram: program})
    }

    funcAddTrainingDay(training) {
        this.setState({ trainingDays: training });
    }

    funcLoadingSuccess() {
        /* Меняет значение статуса программы (загружется или нет) */
        if (this.state.loadingProgram) {
            this.setState({loadingProgram: false})
        } else {
            this.setState({loadingProgram: true})
        }
    }

    funcLoadingTrainingSuccess() {
        /* Меняет значение статуса программы (загружется или нет) */
        if (this.state.loadingTrainingDay) {
            this.setState({loadingTrainingDay: false})
        } else {
            this.setState({loadingTrainingDay: true})
        }
    }

    funcExerciseActive() {
        if (this.state.exerciseActive) {
            this.setState({exerciseActive: false})
        } else {
            this.setState({exerciseActive: true})
        }
    }

    funcSetProfile(profile_data){
        this.state.profile = profile_data
    }

    funcWindowSettingsActive() {
        if (this.state.windowSettingsActive) {
            this.setState({windowSettingsActive: false})
        } else {
            this.setState({windowSettingsActive: true})
        }
    }

    funcWindowProfileActive() {
        if (this.state.windowProfileActive) {
            this.setState({windowProfileActive: false})
        } else {
            this.setState({windowProfileActive: true})
        }
    }

    funcChangeError(data) {
        this.setState({error_one: data})
    }

    funcCurrentTrainingChange(program) {
        const currentTraining = this.state.currentTraining
        const updatedTraining = {
            ...currentTraining,
            ...program
        }
        this.setState({currentTraining: updatedTraining})
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Main
                            setModalWindow={this.funcModalWindowActive}
                            modalActive={this.state.modal_window_active}
                            checkAuthentication={this.checkAuth}
                            auth_user={this.state.authentication_user}
                            exitAccount={this.exitLogout}
                            error_one={this.state.error_one}
                            funcChangeError={this.funcChangeError}
                        />
                    } />
                    <Route path="/diary" element={
                        <CheckAuthComponent
                            setModalWindow={this.funcModalWindowActive}
                            modalActive={this.state.modal_window_active}
                            checkAuthentication={this.checkAuth}
                            auth_user={this.state.authentication_user}
                            exitAccount={this.exitLogout}
                            trainingProgram={this.state.trainingProgram}
                            setTrainingProgram={this.funcAddProgram}
                            loadingProgram={this.state.loadingProgram}
                            setLoadingProgram={this.funcLoadingSuccess}
                            trainingDays={this.state.trainingDays}
                            funcAddTrainingDay={this.funcAddTrainingDay}
                            loadingTrainingDay={this.state.loadingTrainingDay}
                            setLoadingTraining={this.funcLoadingTrainingSuccess}
                            exerciseActive={this.state.exerciseActive}
                            funcExerciseActive={this.funcExerciseActive}
                            windowSettingsActive={this.state.windowSettingsActive}
                            profile={this.state.profile}
                            funcSetProfile={this.funcSetProfile}
                            funcWindowSettingsActive={this.funcWindowSettingsActive}
                            windowProfileActive={this.state.windowProfileActive}
                            funcWindowProfileActive={this.funcWindowProfileActive}
                            error_one={this.state.error_one}
                            funcChangeError={this.funcChangeError}
                            currentTraining={this.state.currentTraining}
                            funcCurrentTrainingChange={this.funcCurrentTrainingChange}
                        />
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
