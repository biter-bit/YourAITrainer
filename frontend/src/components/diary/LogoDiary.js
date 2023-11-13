import React from 'react';
import {Link} from "react-router-dom";
import burger from "../../img/burger.png";

class LogoDiary extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', this.props.funcSetSizeWindow)
    }

    funcActive() {
        this.props.funcExerciseActive(false)
        this.props.funcTrainingDiary(false)
    }

    render() {
        return (
            <>
                {this.props.isMobile < 750 ? (
                    <div className="container-logo">
                        <Link className="logo-diary" to="/"></Link>
                        <p onClick={() => this.funcActive()} className="logo-name">Train</p>
                        {/*<img className="burger_img" src={burger} alt="plus" />*/}
                        <img className="burger_img" onClick={() => this.props.funcBurgerDiaryActive()} src={burger} alt="plus"/>
                    </div>
                ) : (
                    <Link className="container-logo" to="/">
                        <div className="logo-diary"></div>
                        <p className="logo-name">Train</p>
                    </Link>
                )}
            </>
        )
    }
}

export default LogoDiary;