import React from 'react';
import axios from "axios";
import MainMenu from "./components/diary/MainMenu";
import Exercises from "./components/diary/Exercises";
import TrainingDiary from "./components/diary/TrainingDiary";
import ClipLoader from "react-spinners/ClipLoader";
import WindowSettings from "./components/diary/AddSettings"
import WindowProfile from "./components/Profile"


class Diary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

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
                funcExerciseActive={this.props.funcExerciseActive}
                profile={this.props.profile}
                funcSetProfile={this.props.funcSetProfile}
                funcWindowSettingsActive={this.props.funcWindowSettingsActive}
                funcWindowProfileActive={this.props.funcWindowProfileActive}
                currentTraining={this.props.currentTraining}
                funcCurrentTrainingChange={this.props.funcCurrentTrainingChange}
            />
            <Exercises
                exerciseActive={this.props.exerciseActive}
                trainingProgram={this.props.trainingProgram}
                currentTraining={this.props.currentTraining}
                funcCurrentTrainingChange={this.props.funcCurrentTrainingChange}
            />
            <TrainingDiary />
            <WindowSettings
                loadingProgram={this.props.loadingProgram}
                setLoadingProgram={this.props.setLoadingProgram}
                windowSettingsActive={this.props.windowSettingsActive}
                funcWindowSettingsActive={this.props.funcWindowSettingsActive}
                error_one={this.props.error_one}
                funcChangeError={this.props.funcChangeError}
            />

            <WindowProfile
                profile={this.props.profile}
                windowProfileActive={this.props.windowProfileActive}
                funcWindowProfileActive={this.props.funcWindowProfileActive}
                error_one={this.props.error_one}
                funcChangeError={this.props.funcChangeError}
                error={""}
            />
          </div>
        </div>
    )
  }
}

export default Diary;