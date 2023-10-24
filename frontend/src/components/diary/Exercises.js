import React from "react";
import rectangle from "../../img/rectangle.png";

class Exercises extends React.Component {
    componentDidMount() {

    }

    render() {
        const workouts = this.props.trainingProgram['workouts']
        console.log(this.props.trainingProgram)
        return(
            <div className={this.props.exerciseActive ? "diary-container-exercises active" : "diary-container-exercises"}>
                {!this.props.currentTraining ? (
                    <div className="diary-container-exercise">
                        <img className="diary-img-exercise" src={rectangle} alt="foto1" />
                        <button className="diary-button-exercise" onClick={() => this.click(1)}>
                            Loading...
                        </button>
                    </div>
                ) : (
                    this.props.trainingProgram.workouts.filter((work) => work.training_day === this.props.currentTraining.training_day)
                        .map((workouts, index) => (
                            <div className="diary-container-exercise" key={index}>
                                <img className="diary-img-exercise" src={rectangle} alt="foto1" />
                                <button className="diary-button-exercise" onClick={() => this.click(1)}>
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