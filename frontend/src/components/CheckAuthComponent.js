import { Navigate } from 'react-router-dom';
import React from "react";
import Diary from "../Diary";
import WindowSettings from "./diary/AddSettings";
import ModalDiary from "./diary/ModalDiary";
import ModalDiaryError from "./diary/ModalDiaryError";


class CheckAuthComponent extends React.Component {
    render() {
        if (this.props.auth_user === null) {
            return (<div>Loading...</div>)
        } else if (this.props.auth_user) {
            return (
                <>
                    <Diary
                        setModalWindow={this.props.setModalWindow}
                        modalActive={this.props.modalActive}
                        exitAccount={this.props.exitAccount}
                        trainingProgram={this.props.trainingProgram}
                        setTrainingProgram={this.props.setTrainingProgram}
                        loadingProgram={this.props.loadingProgram}
                        setLoadingProgram={this.props.setLoadingProgram}
                        trainingDays={this.props.trainingDays}
                        funcAddTrainingDay={this.props.funcAddTrainingDay}
                        loadingTrainingDay={this.props.loadingTrainingDay}
                        setLoadingTraining={this.props.setLoadingTraining}
                        exerciseActive={this.props.exerciseActive}
                        funcExerciseActive={this.props.funcExerciseActive}
                        windowSettingsActive={this.props.windowSettingsActive}
                        funcWindowSettingsActive={this.props.funcWindowSettingsActive}
                        profile={this.props.profile}
                        funcSetProfile={this.props.funcSetProfile}
                        windowProfileActive={this.props.windowProfileActive}
                        funcWindowProfileActive={this.props.funcWindowProfileActive}
                        errorValidation={this.props.errorValidation}
                        funcChangeError={this.props.funcChangeError}
                        currentTraining={this.props.currentTraining}
                        funcCurrentTrainingChange={this.props.funcCurrentTrainingChange}
                        exerciseActive2={this.props.exerciseActive2}
                        funcExerciseActive2={this.props.funcExerciseActive2}
                        funcAddApproach={this.props.funcAddApproach}
                        funcDeleteApproach={this.props.funcDeleteApproach}
                        funcHandleInputChange={this.props.funcHandleInputChange}
                        funcSendDataOnBackend={this.props.funcSendDataOnBackend}
                        logout={this.props.logout}
                        isMobile={this.props.isMobile}
                        funcSetSizeWindow={this.props.funcSetSizeWindow}
                        checkAuthentication={this.props.checkAuthentication}
                        trainingDiary={this.props.trainingDiary}
                        funcTrainingDiary={this.props.funcTrainingDiary}
                        funcBurgerDiaryActive={this.props.funcBurgerDiaryActive}
                        burgerDiary={this.props.burgerDiary}
                    />
                    <WindowSettings
                        loadingProgram={this.props.loadingProgram}
                        setLoadingProgram={this.props.setLoadingProgram}
                        windowSettingsActive={this.props.windowSettingsActive}
                        funcWindowSettingsActive={this.props.funcWindowSettingsActive}
                        errorValidation={this.props.errorValidation}
                        funcChangeError={this.props.funcChangeError}
                        funcModalWindowDiaryActive={this.props.funcModalWindowDiaryActive}
                        funcModalWindowDiaryError={this.props.funcModalWindowDiaryError}
                        modalWindowDiaryError={this.props.modalWindowDiaryError}
                        modalWindowDiaryFinish={this.props.modalWindowDiaryFinish}
                        funcModalWindowDiaryFinish={this.props.funcModalWindowDiaryFinish}
                    />
                    <ModalDiary
                        funcModalWindowDiaryActive={this.props.funcModalWindowDiaryActive}
                        modalWindowDiary={this.props.modalWindowDiary}
                        h2="Программа загружается!"
                        p="Генерация занимает от 1 до 10 минут! Мы предупредим вас по готовности."
                    />
                    <ModalDiary
                        modalWindowDiary={this.props.modalWindowDiaryFinish}
                        funcModalWindowDiaryActive={this.props.funcModalWindowDiaryFinish}
                        h2="Программма загрузилась!"
                        p="Вы можете найти ее в списке программ."
                    />
                    <ModalDiaryError
                        funcModalWindowDiaryError={this.props.funcModalWindowDiaryError}
                        modalWindowDiaryError={this.props.modalWindowDiaryError}
                    />
                </>
            );
        } else {
            // Если пользователь не авторизован, выполнить редирект
            return (<Navigate to="/?showModal=true" />)
        }
    }
}

export default CheckAuthComponent;