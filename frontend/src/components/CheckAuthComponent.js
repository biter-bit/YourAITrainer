import { Navigate } from 'react-router-dom';
import React from "react";
import Diary from "../Diary";


class CheckAuthComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: null,
        }
    }

    async componentDidMount() {
          const isAuthenticated = await this.props.checkAuthentication();
          this.setState({isAuthenticated: isAuthenticated});
    }

    render() {
        if (this.state.isAuthenticated === null) {
        return (<div>Loading...</div>)
      } else if (this.state.isAuthenticated) {
        return (
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
            error_one={this.props.error_one}
            funcChangeError={this.props.funcChangeError}
            currentTraining={this.props.currentTraining}
            funcCurrentTrainingChange={this.props.funcCurrentTrainingChange}
          />
        );
      } else {
        // Если пользователь не авторизован, выполнить редирект
        return (<Navigate to="/?showModal=true" />)
      }
    }
}

export default CheckAuthComponent;