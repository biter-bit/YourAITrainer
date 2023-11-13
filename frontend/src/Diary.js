import React from 'react';
import MainMenu from "./components/diary/MainMenu";
import Exercises from "./components/diary/Exercises";
import TrainingDiary from "./components/diary/TrainingDiary";
import WindowSettings from "./components/diary/AddSettings"
import WindowProfile from "./components/Profile"
import BurgerDiary from "./components/diary/BurgerDiary";


class Diary extends React.Component {

    render() {
        return (
            <div className="container-diary-background">
                <div className="container-content-diary">
                    <MainMenu
                        trainingProgram={this.props.trainingProgram}
                        setTrainingProgram={this.props.setTrainingProgram}
                        loadingProgram={this.props.loadingProgram}
                        setLoadingProgram={this.props.setLoadingProgram}
                        trainingDays={this.props.trainingDays}
                        funcAddTrainingDay={this.props.funcAddTrainingDay}
                        loadingTrainingDay={this.props.loadingTrainingDay}
                        setLoadingTraining={this.props.setLoadingTraining}
                        exerciseActive={this.props.exerciseActive}
                        profile={this.props.profile}
                        funcSetProfile={this.props.funcSetProfile}
                        funcWindowSettingsActive={this.props.funcWindowSettingsActive}
                        funcWindowProfileActive={this.props.funcWindowProfileActive}
                        currentTraining={this.props.currentTraining}
                        funcCurrentTrainingChange={this.props.funcCurrentTrainingChange}
                        exerciseActive2={this.props.exerciseActive2}
                        funcExerciseActive2={this.props.funcExerciseActive2}
                        logout={this.props.logout}
                        isMobile={this.props.isMobile}
                        funcSetSizeWindow={this.props.funcSetSizeWindow}
                        funcExerciseActive={this.props.funcExerciseActive}
                        funcTrainingDiary={this.props.funcTrainingDiary}
                        funcBurgerDiaryActive={this.props.funcBurgerDiaryActive}
                    />
                    <Exercises
                        exerciseActive={this.props.exerciseActive}
                        trainingProgram={this.props.trainingProgram}
                        currentTraining={this.props.currentTraining}
                        funcCurrentTrainingChange={this.props.funcCurrentTrainingChange}
                        funcExerciseActive={this.props.funcExerciseActive}
                        exerciseActive2={this.props.exerciseActive2}
                        funcExerciseActive2={this.props.funcExerciseActive2}

                    />
                    <TrainingDiary
                        trainingProgram={this.props.trainingProgram}
                        currentTraining={this.props.currentTraining}
                        funcAddApproach={this.props.funcAddApproach}
                        funcDeleteApproach={this.props.funcDeleteApproach}
                        funcHandleInputChange={this.props.funcHandleInputChange}
                        funcSendDataOnBackend={this.props.funcSendDataOnBackend}
                        trainingDiary={this.props.trainingDiary}
                        funcTrainingDiary={this.props.funcTrainingDiary}
                        funcSetSizeWindow={this.props.funcSetSizeWindow}
                    />


                    <WindowProfile
                        profile={this.props.profile}
                        windowProfileActive={this.props.windowProfileActive}
                        funcWindowProfileActive={this.props.funcWindowProfileActive}
                        errorValidation={this.props.errorValidation}
                        funcChangeError={this.props.funcChangeError}
                        error={""}
                    />

                    <BurgerDiary
                        funcBurgerDiaryActive={this.props.funcBurgerDiaryActive}
                        burgerDiary={this.props.burgerDiary}
                        logout={this.props.logout}
                    />
                </div>
            </div>
        )
    }
}

export default Diary;