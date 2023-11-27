import React from "react";
import axios from "axios";

import LogoDiary from "./LogoDiary";
import UserData from "./UserData";
import ButtonGenerateTraining from "./ButtonGenerateTraining";
import ListProgram from "./ListProgram";
import ButtonsMain from "./ButtonsMain";
import BurgerDiary from "./BurgerDiary";


const link_api_get_all_data_user = 'http://trainer_api:8000/api/programs/get/all'
const link_api_user_profile = 'http://trainer_api:8000/api/users/profile'


class MainMenu extends React.Component {

    componentDidMount() {
        this.funcGetData()
        this.loadProfileData()
    }

    async funcGetData() {
        const access = localStorage.getItem("access")
        try {
            if (access) {
                const res = await axios.get(link_api_get_all_data_user, {
                    headers: {
                        "Authorization": `Bearer ${access}`
                    }
                })
                this.props.setTrainingProgram(res['data'])
            } else {
                console.error('error')
            }
        } catch (error) {
            console.error(error)
        }
    }

    async loadProfileData() {
        const access = localStorage.getItem("access")
        try {
            if (access) {
                const res = await axios.get(link_api_user_profile, {
                    headers: {
                        "Authorization": `Bearer ${access}`
                    }
                })
                this.props.funcSetProfile(res['data'])
            } else {
                console.error('error')
            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return(
            <div className="diary-container-window-user">
                <LogoDiary
                    isMobile={this.props.isMobile}
                    funcSetSizeWindow={this.props.funcSetSizeWindow}
                    funcTrainingDiary={this.props.funcTrainingDiary}
                    funcExerciseActive={this.props.funcExerciseActive}
                    funcBurgerDiaryActive={this.props.funcBurgerDiaryActive}
                />
                <UserData profile={this.props.profile} />
                <ButtonGenerateTraining
                    funcWindowSettingsActive={this.props.funcWindowSettingsActive}
                    loadingProgram={this.props.loadingProgram}
                />
                <ListProgram
                    trainingProgram={this.props.trainingProgram}
                    funcCurrentTrainingChange={this.props.funcCurrentTrainingChange}
                    exerciseActive={this.props.exerciseActive}
                    funcExerciseDeactivate={this.props.funcExerciseDeactivate}
                    funcExerciseActive={this.props.funcExerciseActive}
                />
                <ButtonsMain
                    funcWindowProfileActive={this.props.funcWindowProfileActive}
                    logout={this.props.logout}
                />
            </div>
        )
    }
}

export default MainMenu;