import React from 'react';

class ListProgram extends React.Component {
    render() {
        const data_program = this.props.trainingProgram['programs']
        const training_days = this.props.trainingProgram['training_days']
        return (
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
                                        onClick={() => this.props.funcCurrentTrainingChange('list', {'program': program.id, 'training_day': trainingDay.id})}
                                    >
                                        <button
                                            className=
                                                {this.props.exerciseActive ? "button-train active" : "button-train"}
                                            onClick={() => this.props.funcExerciseActive(true)}
                                            onMouseLeave={() => {setTimeout(() => this.props.funcExerciseActive(false), 500)}}
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
        )
    }
}

export default ListProgram;