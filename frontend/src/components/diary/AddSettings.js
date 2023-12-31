import React from 'react';
import axios from "axios";


const link_api_generic_program = 'http://127.0.0.1:8000/api/generation'
const link_api_check_celery = 'http://127.0.0.1:8000/api/check_task'
class WindowSettings extends React.Component {

    async funcGenericProgram(event) {
        event.preventDefault()
        if (this.props.loadingProgram) {
            this.props.funcModalWindowDiaryError()
            return null
        }
        const form = event.target
        const formData = new FormData(form)
        this.props.setLoadingProgram()
        const accessToken = localStorage.getItem("access")
        if (accessToken) {
            try {
                const response = await axios.post(
                    link_api_generic_program, {
                        gender: formData.get('m'),
                        age: formData.get('age'),
                        weight: formData.get('weight'),
                        height: formData.get('height'),
                        training_level: formData.get('training_level'),
                        purpose_of_training: formData.get('purpose_of_training')
                    }, {
                        headers: {'Authorization': `Bearer ${accessToken}`}
                    });
                this.props.funcWindowSettingsActive()
                this.props.funcModalWindowDiaryActive()
                this.funcCheckTaskBackend(response.data.number_task)
            } catch(error) {
                console.error(error);
            }
        }
    }

    async funcCheckTaskBackend(task_id) {
        try {
            const response = await axios.get(link_api_check_celery + `?task_id=${task_id}`, {
                params: {task_id}
            })
            if (response.data.status === 'Panding') {
                setTimeout(() => this.funcCheckTaskBackend(task_id), 30000);
            } else if (response.data.status === 'Success') {
                const result = response.data.result
                this.props.funcModalWindowDiaryFinish()
                this.props.setLoadingProgram()
            } else if (response.data.status === 'Fail') {
                this.props.setLoadingProgram()
                console.error("Task failed")
            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div className={this.props.windowSettingsActive ? 'model active' : "model"} onClick={() => {
                this.props.funcWindowSettingsActive();
            }}>
                <div className={this.props.windowSettingsActive ? 'model__content active' : "model__content"} onClick={e => e.stopPropagation()}>
                    <h1 className="name_reg">Генерация</h1>
                    <form onSubmit={(event) => this.funcGenericProgram(event)}>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Gender
                            </label>
                            <select className='form-control' id="exemail" aria-describedby="emailHelp" name="m">
                                <option>m</option>
                                <option>f</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Weight
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                id="exemail"
                                aria-describedby="emailHelp"
                                name="weight"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Height
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                id="exemail"
                                aria-describedby="emailHelp"
                                name="height"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Training_level
                            </label>
                            <select className='form-control' id="exemail" aria-describedby="emailHelp" name="training_level">
                                <option>beginner</option>
                                <option>amateur</option>
                                <option>pro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Purpose_of_training
                            </label>
                            <select className='form-control' id="exemail" aria-describedby="emailHelp" name="purpose_of_training">
                                <option>weight_loss</option>
                                <option>relief</option>
                                <option>muscle_mass</option>
                                <option>endurance</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="expass" className="form-label">
                                Age
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="expass"
                                name="age"
                            />
                            <label htmlFor="expass" className="form-label validation">
                                {Object.keys(this.props.errorValidation).map(key => (
                                    <span key={key}>
                                    {key}: {this.props.errorValidation[key]}
                                        <br />
                                </span>
                                ))}
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        )
    }
}

export default WindowSettings