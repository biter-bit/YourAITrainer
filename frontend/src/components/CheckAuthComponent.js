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
            loadingProgram={this.state.loadingProgram}
            setLoadingProgram={this.props.setLoadingProgram}

          />
        );
      } else {
        // Если пользователь не авторизован, выполнить редирект
        return (<Navigate to="/?showModal=true" />)
      }
    }
}

export default CheckAuthComponent;