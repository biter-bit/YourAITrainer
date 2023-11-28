import React from "react";
import axios from "axios";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import AppArticle from "./pages/AppArticle";
import ArticlePage from "./pages/ArticlePage";
import Main from "./Main";
import CheckAuthComponent from "./components/CheckAuthComponent";
import ModalWindow from "./components/ModalWindow";

const linkApiVerify = 'http://91.200.84.202:80/api/auth/jwt/verify/'
const linkSendData = 'http://91.200.84.202:80/api/save'
const link_api_auth = 'http://91.200.84.202:80/api/auth/jwt/create/'
const link_api_register = 'http://91.200.84.202:80/api/auth/register/'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorizationUser: true, // Авторизирован пользователь или нет
            modalWindowValidation: false, // Активировано модальное окно или нет (проверка авторизации при переходах)
            modalWindowDiary: false, // Активировано модальное окно генерации тренировки или нет
            modalWindowDiaryFinish: false, // Активировано модальное окно завершения генерации или нет
            modalWindowErrorInDiary: false, // Активировано модальное окно ошиблки генерации тренировки или нет
            modelActiveAuth: false, // Активировано окно авторизации или нет
            modelActiveReg: false, // Активировано окно регистрации или нет
            loadingProgram: false, // Загружена тренировочная программа или нет
            loadingTrainingDay: false, // Загружен тренировочный день или нет
            trainingProgram: {}, // Тренировочная программа пользователя
            trainingDays: {}, // Тренировочный день пользователя
            exerciseActive: false, // Активирована панель упражнений или нет
            exerciseActive2: false, // Активирован цвет на панели упражнений или нет
            profile: {}, // Данные пользователя (логин)
            windowSettingsActive: false, // Меню настройки генерации тренировки открыто или нет
            windowProfileActive: false, // Меню пользователя открыто или нет
            errorValidation: {}, // Ошибки для валидации
            currentTraining: '', // Текущая тренировка (подходы)
            burger_active: false, // Активировано меню бургера или нет
            isMobile: window.innerWidth, // Размер экрана пользователя
            trainingDiary: false, // Активирована модель с подходами или нет
            burgerDiary: false // Активировано меню бургера в дневнике или нет
        };
        this.checkAuth = this.checkAuth.bind(this)
        this.exitLogout = this.exitLogout.bind(this)
        this.funcModalWindowValidationActive = this.funcModalWindowValidationActive.bind(this)
        this.funcAddProgram = this.funcAddProgram.bind(this)
        this.funcLoadingSuccess = this.funcLoadingSuccess.bind(this)
        this.funcAddTrainingDay = this.funcAddTrainingDay.bind(this)
        this.funcLoadingTrainingSuccess = this.funcLoadingTrainingSuccess.bind(this)
        this.funcExerciseActive = this.funcExerciseActive.bind(this)
        this.funcSetProfile = this.funcSetProfile.bind(this)
        this.funcExerciseActive2 = this.funcExerciseActive2.bind(this)
        this.funcWindowSettingsActive = this.funcWindowSettingsActive.bind(this)
        this.funcWindowProfileActive = this.funcWindowProfileActive.bind(this)
        this.funcChangeError = this.funcChangeError.bind(this)
        this.funcCurrentTrainingChange = this.funcCurrentTrainingChange.bind(this)
        this.funcAddApproach = this.funcAddApproach.bind(this)
        this.funcDeleteApproach = this.funcDeleteApproach.bind(this)
        this.funcHandleInputChange = this.funcHandleInputChange.bind(this)
        this.funcSendDataOnBackend = this.funcSendDataOnBackend.bind(this)
        this.logout = this.logout.bind(this)
        this.funcBurgerActive = this.funcBurgerActive.bind(this)
        this.inputClickAuth = this.inputClickAuth.bind(this)
        this.inputClickReg = this.inputClickReg.bind(this)
        this.authorizedAuth = this.authorizedAuth.bind(this)
        this.funcRegistered = this.funcRegistered.bind(this)
        this.resetStatus = this.resetStatus.bind(this)
        this.funcSetSizeWindow = this.funcSetSizeWindow.bind(this)
        this.funcTrainingDiary = this.funcTrainingDiary.bind(this)
        this.funcBurgerDiaryActive = this.funcBurgerDiaryActive.bind(this)
        this.funcModalWindowDiaryActive = this.funcModalWindowDiaryActive.bind(this)
        this.funcModalWindowDiaryError = this.funcModalWindowDiaryError.bind(this)
        this.funcModalWindowDiaryFinish = this.funcModalWindowDiaryFinish.bind(this)
    }

    componentDidMount() {
        this.checkAuth()
    }

    resetStatus() {
        this.setState({ errorValidation: {}})
    }

    funcTrainingDiary(res=null) {
        if (res) {
            this.setState({trainingDiary: true})
        }
        if (!res) {
            this.setState({trainingDiary: false})
        }
    }

    funcModalWindowValidationActive() {
        if (this.state.modalWindowValidation) {
            this.setState({ modalWindowValidation: false })
        }
        else {
            this.setState({ modalWindowValidation: true })
        }
    }

    funcModalWindowDiaryActive() {
        if (this.state.modalWindowDiary) {
            this.setState({ modalWindowDiary: false })
        }
        else {
            this.setState({ modalWindowDiary: true })
        }
    }

    funcModalWindowDiaryFinish() {
        if (this.state.modalWindowDiaryFinish) {
            this.setState({ modalWindowDiaryFinish: false })
        }
        else {
            this.setState({ modalWindowDiaryFinish: true })
        }
    }

    funcModalWindowDiaryError() {
        if (this.state.modalWindowErrorInDiary) {
            this.setState({ modalWindowErrorInDiary: false })
        }
        else {
            this.setState({ modalWindowErrorInDiary: true })
        }
    }

    exitLogout() {
        this.setState({authorizationUser: false})
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

    funcExerciseActive(meaning) {
        this.setState({exerciseActive: meaning})
    }

    funcExerciseActive2(meaning) {
        this.setState({exerciseActive2: meaning})
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

    funcSetSizeWindow() {
        let sizeWindow = window.innerWidth
        this.setState({isMobile: sizeWindow}, () => {
            console.log("isMobile updated:", this.state.isMobile);
        });
    }

    funcChangeError(data) {
        this.setState({errorValidation: data})
    }

    funcCurrentTrainingChange(category, program) {
        if (category === 'exercize') {
            this.funcTrainingDiary(true)
        }
        const currentTraining = this.state.currentTraining
        if (!this.state.currentTraining[program['exercize']]) {
            const approaches = this.state.trainingProgram['approaches'].filter((approaches) => approaches['workout'] === program['exercize'])
            const allApproaches = {[program.exercize]: approaches}
            const updatedTraining = {
                ...currentTraining,
                ...program,
                ...allApproaches
            }
            this.setState({currentTraining: updatedTraining})
        } else {
            // const status = {"status": currentTraining['exercize']}
            const updatedTraining = {
                ...currentTraining,
                ...program,
            }
            this.setState({currentTraining: updatedTraining})
        }

    }

    funcAddApproach(ind) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');
        const timeZoneOffset = currentDate.getTimezoneOffset();

        // Определяем знак часового пояса
        const timeZoneSign = timeZoneOffset > 0 ? '-' : '+';

        // Вычисляем часовой пояс в формате HH:mm
        const timeZoneHours = Math.floor(Math.abs(timeZoneOffset) / 60).toString().padStart(2, '0');
        const timeZoneMinutes = (Math.abs(timeZoneOffset) % 60).toString().padStart(2, '0');

        // Формируем строку в нужном формате
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timeZoneSign}${timeZoneHours}:${timeZoneMinutes}`;
        const currentTraining = this.state.currentTraining
        const approaches = this.state.currentTraining[ind]
        approaches.push({
            'id': approaches.length + 1,
            'quantity': null,
            'result': null,
            'workout': ind,
            'time_create': formattedDate,
            'time_update': formattedDate
        })
        const result = {[ind]: approaches}
        const updatedTraining = {
            ...currentTraining,
            ...result
        }
        this.setState({currentTraining: updatedTraining})
    }

    funcDeleteApproach(ind) {
        if (this.state.currentTraining[this.state.currentTraining['exercize']]) {
            const exercize = [...this.state.currentTraining[this.state.currentTraining['exercize']]];
            exercize.splice(ind, 1);

            const updatedTraining = {
                ...this.state.currentTraining,
                [this.state.currentTraining['exercize']]: exercize
            };

            this.setState({ currentTraining: updatedTraining });
        }
    }

    funcHandleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
        const numberApproach = event.target.getAttribute('data-number-approach')
        const exercizeId = this.state.currentTraining['exercize']
        if (exercizeId){
            const currentTraining = this.state.currentTraining
            const approachesList = [...this.state.currentTraining[exercizeId]]
            approachesList[numberApproach][name] = value
            currentTraining[exercizeId] = approachesList
            this.setState({currentTraining: currentTraining})
        }
    }

    async funcSendDataOnBackend() {
        const data = this.state.currentTraining
        delete data.exercize
        delete data.program
        delete data.training_day
        delete data.undefined
        await axios.post(linkSendData, data)
    }

    logout = () => {
        const accessAndRefreshToken = ["access", "refresh"]
        accessAndRefreshToken.forEach(key => {localStorage.removeItem(key)})
        this.funcBurgerActive()
        this.checkAuth()
    }

    funcBurgerActive() {
        if (this.state.burger_active) {
            this.setState({ burger_active: false })
        }
        else {
            this.setState({ burger_active: true })
        }
    }

    funcBurgerDiaryActive() {
        if (this.state.burgerDiary) {
            this.setState({ burgerDiary: false })
        }
        else {
            this.setState({ burgerDiary: true })
        }
    }

    async funcRegistered(event) {
        // регистрация пользователя
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
            this.funcChangeError({})
            this.inputClickReg()
        } catch (error) {
            if (error.response && error.response.status === 400) {
                this.funcChangeError(error.response.data)
            } else {
                this.funcChangeError({'': 'Incorrect data. Please try again.'})
            }
        }
    }

    inputClickReg() {
        // активирует и деактивирует окно регистрации
        if (this.state.modelActiveReg) {
            this.setState({ modelActiveReg: false })
        }
        else {
            this.setState({ modelActiveReg: true })
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

            this.checkAuth()
            this.inputClickAuth()
        } catch (error) {
            if (error.response && error.response.status === 400) {
                this.funcChangeError(error.response.data)
            } else {
                this.funcChangeError({'': 'Incorrect username or password. Please try again.'})
            }
        }
    }

    async checkAuth() {

        /**
         * Проверка авторизации пользователя и установка значения авторизации
         * @returns {boolean} - Значение авторизации пользователя
         */

        const access = localStorage.getItem("access")
        let result = {}

        if (access) {
            try {
                result = await axios.post(linkApiVerify, {
                    token: access
                })

                if (Object.keys(result.data).length === 0) {
                    this.setState({authorizationUser: true})
                    return true
                } else {
                    this.setState({authorizationUser: false})
                    const accessAndRefreshToken = ["access", "refresh"]
                    accessAndRefreshToken.forEach(key => {
                        localStorage.removeItem(key)
                    })
                    return false
                }
            } catch (error) {
                console.error("Error while checking authentication:", error);
                this.setState({ authorizationUser: false });
                return false;
            }
        } else {
            this.setState({authorizationUser: false})
            return false
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

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Main
                            setModalWindow={this.funcModalWindowValidationActive}
                            modalActive={this.state.modalWindowValidation}
                            checkAuthentication={this.checkAuth}
                            auth_user={this.state.authorizationUser}
                            exitAccount={this.exitLogout}
                            errorValidation={this.state.errorValidation}
                            funcChangeError={this.funcChangeError}
                            logout={this.logout}
                            funcBurgerActive={this.funcBurgerActive}
                            burger_active={this.state.burger_active}
                            modelActiveAuth={this.state.modelActiveAuth}
                            inputClickAuth={this.inputClickAuth}
                            modelActiveReg={this.state.modelActiveReg}
                            inputClickReg={this.inputClickReg}
                            authorizedAuth={this.authorizedAuth}
                            funcRegistered={this.funcRegistered}
                            resetStatus={this.resetStatus}
                        />
                    } />
                    <Route path="/diary" element={
                        <CheckAuthComponent
                            setModalWindow={this.funcModalWindowValidationActive}
                            modalActive={this.state.modalWindowValidation}
                            checkAuthentication={this.checkAuth}
                            auth_user={this.state.authorizationUser}
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
                            errorValidation={this.state.errorValidation}
                            funcChangeError={this.funcChangeError}
                            currentTraining={this.state.currentTraining}
                            funcCurrentTrainingChange={this.funcCurrentTrainingChange}
                            exerciseActive2={this.state.exerciseActive2}
                            funcExerciseActive2={this.funcExerciseActive2}
                            funcAddApproach={this.funcAddApproach}
                            funcDeleteApproach={this.funcDeleteApproach}
                            funcHandleInputChange={this.funcHandleInputChange}
                            funcSendDataOnBackend={this.funcSendDataOnBackend}
                            logout={this.logout}
                            isMobile={this.state.isMobile}
                            funcSetSizeWindow={this.funcSetSizeWindow}
                            trainingDiary={this.state.trainingDiary}
                            funcTrainingDiary={this.funcTrainingDiary}
                            funcBurgerDiaryActive={this.funcBurgerDiaryActive}
                            burgerDiary={this.state.burgerDiary}
                            modalWindowDiary={this.state.modalWindowDiary}
                            funcModalWindowDiaryActive={this.funcModalWindowDiaryActive}
                            funcModalWindowDiaryError={this.funcModalWindowDiaryError}
                            modalWindowDiaryError={this.state.modalWindowErrorInDiary}
                            modalWindowDiaryFinish={this.state.modalWindowDiaryFinish}
                            funcModalWindowDiaryFinish={this.funcModalWindowDiaryFinish}

                        />
                    } />
                    <Route path="/modal" element={<ModalWindow checkAuthentication={this.checkAuth} auth_user={this.state.authorizationUser}/>} exit={this.exitLogout}/>
                    <Route path='/articles' element={<AppArticle setModalWindow={this.funcModalWindowValidationActive} modalActive={this.state.modalWindowValidation}  checkAuthentication={this.checkAuth} auth_user={this.state.authorizationUser} exitAccount={this.exitLogout} />}/>
                    <Route exact path='/article/:articleId' element={<ArticlePage setModalWindow={this.funcModalWindowValidationActive} modalActive={this.state.modalWindowValidation} checkAuthentication={this.checkAuth} auth_user={this.state.authorizationUser} exitAccount={this.exitLogout} />} />

                </Routes>
            </BrowserRouter>
        )
    }
}


export default App;
