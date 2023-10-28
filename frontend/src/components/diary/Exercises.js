import React from "react";
import rectangle from "../../img/rectangle.png";

class Exercises extends React.Component {
    componentDidMount() {

    }

    render() {
        const workouts = this.props.trainingProgram['workouts']
        return(
            <div className={`diary-container-exercises ${this.props.exerciseActive2 || this.props.exerciseActive ? "active" : ""}`}
                 onMouseEnter={() => this.props.funcExerciseActive2(true)}
                 onMouseLeave={() => this.props.funcExerciseActive2(false)}
            >
                    {!this.props.currentTraining ? (
                        <div className="diary-container-exercise">
                            <img className="diary-img-exercise" src={rectangle} alt="foto1" />
                            <button
                                className="diary-button-exercise" onClick={() => this.click(1)}>
                                Loading...
                            </button>
                        </div>
                    ) : (
                        this.props.trainingProgram.workouts.filter((work) => work.training_day === this.props.currentTraining.training_day)
                            .map((workouts, index) => (
                                <div className="diary-container-exercise" key={index}>
                                    <img className="diary-img-exercise" src={rectangle} alt="foto1" />
                                    <button
                                        className="diary-button-exercise" onClick={() => this.props.funcCurrentTrainingChange({'exercize': workouts.id})}>
                                        {workouts.title}
                                    </button>
                                </div>
                        ))
                    )}
                </div>
        )
    }
}

export default Exercises;