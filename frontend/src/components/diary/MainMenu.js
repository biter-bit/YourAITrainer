import React from "react";
import {Link} from "react-router-dom";
import rectangle from "../../img/rectangle.png";
import plus from "../../img/plus_2 1.png";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";


const link_api_get_all_data_user = 'http://localhost:8000/api/programs/get/all'
const link_api_user_profile = 'http://localhost:8000/api/users/profile'

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.hoverTimeout = null;
    }
    componentDidMount() {
        this.funcGetData()
        this.loadProfileData()
    }

    async funcGetData() {
        this.props.setLoadingProgram()
        const access = localStorage.getItem("access")
        try {
            if (access) {
                const res = await axios.get(link_api_get_all_data_user, {
                    headers: {
                        "Authorization": `Bearer ${access}`
                    }
                })
                // this.setState({data: res['data']})
                this.props.setTrainingProgram(res['data'])
                console.log(this.props.trainingProgram)
                this.props.setLoadingProgram()
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

    funcExerciseActive() {
        this.props.funcExerciseActive(true)
    }

    funcExerciseDeactivate() {
        setTimeout(() => this.props.funcExerciseActive(false), 500);
    }

    funcMemorizingInformationHover(name) {
        let result;
        const element = document.getElementById(name)
        element.addEventListener("mouseover", function(event) {
            result = element.getAttribute("data-info");
        })
        return result
    }



    render() {
        const data_program = this.props.trainingProgram['programs']
        const training_days = this.props.trainingProgram['training_days']
        const isLoadingProgram = this.props.loadingProgram

        return(
            <div className="diary-container-window-user">
                <div className="diary-container-header-menu">
                    <Link className="container-logo" to="/">
                        <div className="logo-diary"></div>
                        <p className="logo-name">Train</p>
                    </Link>


                    <div className="diary-container-icon-name-user">
                        <img className="diary-icon-user" src={rectangle} alt="foto1" />
                        <p className="diary-name-user">{this.props.profile['username']}</p>
                    </div>
                    <div>
                        <button className="diary-button-generic-program" onClick={() => this.props.funcWindowSettingsActive()}>
                            {isLoadingProgram ? (
                                <ClipLoader color="#00EDDF" className={"img_button_diary_gif"} />
                            ) : (
                            <img src={plus} alt="plus" />
                            )}
                        </button>
                    </div>

                </div>

                <div className="diary-container-list-program">
                    <ul className="list-programs">
                        {!data_program || !training_days ? (
                            <li className="train-menu">
                                Loading...
                                <ul className="train-list">
                                    <button className="button-train">
                                        Loading...
                                    </button>
                                </ul>
                            </li>
                        ) : (
                            data_program.map((program, index) => (
                                <li key={index} className="train-menu">
                                    {program.name}
                                    {training_days
                                        .filter((trainingDay) => trainingDay.program === program.id)
                                        .map((trainingDay, index) => (
                                        <ul className="train-list" key={index}
                                            onMouseEnter={() => this.props.funcCurrentTrainingChange({'program': program.id, 'training_day': trainingDay.id})}
                                        >
                                            <button
                                                className=
                                                    {this.props.exerciseActive ? "button-train active" : "button-train"}
                                                onMouseEnter={() => this.funcExerciseActive()}
                                                onMouseLeave={() => this.funcExerciseDeactivate()}
                                            >
                                                <div>
                                                    Тренировка №{trainingDay.day_num}
                                                </div>
                                            </button>
                                        </ul>
                                    ))}
                                </li>
                            ))
                        )}
                    </ul>
            </div>

                <div className="diary-main-menu">
                    <ul className="diary-main-list">
                        <li className="diary-main-element_list">
                            <a className='diary-main-element' href="profile"
                                onClick={(element) => {
                                    element.preventDefault();
                                    this.props.funcWindowProfileActive();
                                }}>
                                Личный кабинет
                            </a>
                        </li>
                        <li className="diary-main-element_list">
                            <Link to='/articles' className='diary-main-element'>
                                Статьи
                            </Link>
                        </li>
                        <li className="diary-main-element_list">
                            <Link className="diary-main-element" to="/" onClick={this.props.logout}>Выход</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MainMenu;