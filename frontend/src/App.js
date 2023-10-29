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
const link_send_data = ''
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
            exerciseActive2: false,
            windowSettingsActive: false,
            windowProfileActive: false,
            error_one: {},
            currentTraining: '',
            approachesTags: [],
            indexApproach: null,
            statusDataSend: false,
            burger_active: false
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
        this.funcExerciseActive2 = this.funcExerciseActive2.bind(this)
        this.funcWindowSettingsActive = this.funcWindowSettingsActive.bind(this)
        this.funcWindowProfileActive = this.funcWindowProfileActive.bind(this)
        this.funcChangeError = this.funcChangeError.bind(this)
        this.funcCurrentTrainingChange = this.funcCurrentTrainingChange.bind(this)
        this.funcAddApproach = this.funcAddApproach.bind(this)
        this.funcIndexApproach = this.funcIndexApproach.bind(this)
        this.funcDeleteApproach = this.funcDeleteApproach.bind(this)
        this.funcHandleInputChange = this.funcHandleInputChange.bind(this)
        this.funcSendDataOnBackend = this.funcSendDataOnBackend.bind(this)
        this.logout = this.logout.bind(this)
        this.funcBurgerActive = this.funcBurgerActive.bind(this)
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

    funcChangeError(data) {
        this.setState({error_one: data})
    }

    funcCurrentTrainingChange(program) {
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
        // const divNew = (
        //     <div key={approaches.length} className="diary-main_3">
        //         <input type="checkbox" className="checkbox-diary-main-1"/>
        //         <input type='text' className='text-diary-main-2' placeholder={ind}/>
        //         <input type='text' className='text-diary-main-2' placeholder='...'/>
        //         <input type='text' className='text-diary-main-2' placeholder='...'/>
        //         <input type='text' className='text-diary-main-3' placeholder='...'/>
        //     </div>
        // )
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

    funcIndexApproach() {
        const numberOfApproaches = this.state.trainingProgram['approaches']
            .filter(approaches => approaches['workout'] === this.state.currentTraining['exercize'])
            .length;
        this.setState({indexApproach: 1})
    }

    async funcSendDataOnBackend() {
        const data = this.state.currentTraining
        const result = await axios.post(link_send_data, data)
        console.log(`Ok - ${result}`)
        console.log(result)
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
                            logout={this.logout}
                            funcBurgerActive={this.funcBurgerActive}
                            burger_active={this.state.burger_active}
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
                            exerciseActive2={this.state.exerciseActive2}
                            funcExerciseActive2={this.funcExerciseActive2}
                            approachesTags={this.state.approachesTags}
                            funcAddApproach={this.funcAddApproach}
                            indexApproach={this.state.indexApproach}
                            funcIndexApproach={this.funcIndexApproach}
                            funcDeleteApproach={this.funcDeleteApproach}
                            funcHandleInputChange={this.funcHandleInputChange}
                            statusDataSend={this.state.statusDataSend}
                            funcSendDataOnBackend={this.funcSendDataOnBackend}
                            logout={this.logout}
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
