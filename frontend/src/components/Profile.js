import React from 'react';
import axios from "axios";

const link_api_save_profile = 'http://192.168.31.62:8000/api/users/profile/update';

class WindowProfile extends React.Component {

    async saveProfileData(event){
        // сохранение данных профиля
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        this.props.funcChangeError({})
        try {
            if (formData.get("password") === formData.get("password_confirmation")) {
                const access = localStorage.getItem("access")
                if (access) {
                    await axios.patch(link_api_save_profile, {
                        username: formData.get("username"),
                        password: formData.get("password"),
                        password_confirmation: formData.get("password_confirmation"),
                        email: formData.get("email"),

                        gender: formData.get("gender"),
                        age: formData.get("age"),
                        weight: formData.get("weight"),
                        height: formData.get("height"),
                        training_level: formData.get("training_level"),
                        purpose_of_training: formData.get("purpose_of_training")
                    },
                    {
                        headers: {'Authorization': `Bearer ${access}`}
                    })

                    // сохранить в статус
                    Array.from(formData).forEach(
                        (input) => {
                            if (input[1] && input[0] !== 'password') {
                                this.props.profile[input[0]] = input[1];
                            }
                            else {
                                this.props.profile[input.name] = ''
                            }
                        }
                    );

                } else {
                    this.props.funcChangeError({'': 'login error'})
                }
            } else {
                this.props.funcChangeError({'': 'passwords not equal'})
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                this.props.funcChangeError(error.response.data)
            } else {
                this.props.funcChangeError({'': 'Incorrect data. Please try again.'})
            }
        }
    }

    loadProfileFromState() {
        Array.from(this.refs.profile_form.elements).forEach(
            (input) => {
                if (this.props.profile[input.name]) {
                    input.value = this.props.profile[input.name]
                }
                else {
                    input.value = ''
                }
            }
        );
    }

    render() {
        return (
            <div className={this.props.windowProfileActive ? 'diary-settings-modal-window active' : "diary-settings-modal-window"} onClick={() => {
                this.props.funcWindowProfileActive();

                if (this.props.windowProfileActive) {
                    this.props.funcChangeError({});
                    this.loadProfileFromState();
                };
            }}>
                <div className={this.props.windowProfileActive ? 'diary-settings-modal-content active' : "diary-settings-modal-content"} onClick={e => e.stopPropagation()}>
                    <h1 className="name_reg">Профиль пользователя</h1>
                    <form ref="profile_form" onSubmit={(event) => this.saveProfileData(event)}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Имя пользователя
                        </label>
                        <input
                            type="text"
                            id="form3Example1c"
                            className={this.props.error['username'] ? 'form-control validation' : 'form-control'}
                            name="username"
                            defaultValue={this.props.profile['username']}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exemail2" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className={this.props.error['email'] ? 'form-control validation' : 'form-control'}
                          id="exemail2"
                          aria-describedby="emailHelp"
                          name="email"
                          defaultValue={this.props.profile['email']}
                        />
                        <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="expass2" className="form-label">
                          Пароль
                        </label>
                        <input
                          type="password"
                          className={this.props.error['password'] ? 'form-control validation' : 'form-control'}
                          id="expass2"
                          name="password"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="expasscheck" className="form-label">
                          Повторите пароль
                        </label>
                        <input
                          type="password"
                          className={this.props.error['0'] ? 'form-control validation' : 'form-control'}
                          id="expasscheck"
                          name="password_confirmation"
                        />
                        <label htmlFor="expasscheck" className="form-label validation">
                            {Object.keys(this.props.error).map(key => (
                                <span key={key}>
                                    {key}: {this.props.error[key]}
                                    <br />
                                </span>
                            ))}
                        </label>
                      </div>
                        <h2 className="name_reg">Данные для генерации</h2>
                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Пол
                            </label>
                            <select className='form-control' id="exemail" aria-describedby="emailHelp" name="gender" defaultValue={this.props.profile['gender']}>
                                <option>m</option>
                                <option>f</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Вес
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                id="exemail"
                                aria-describedby="emailHelp"
                                name="weight"
                                defaultValue={this.props.profile['weight']}
                            ></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Рост
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                id="exemail"
                                aria-describedby="emailHelp"
                                name="height"
                                defaultValue={this.props.profile['height']}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Уровень подготовки
                            </label>
                            <select className='form-control' id="exemail" aria-describedby="emailHelp" name="training_level" defaultValue={this.props.profile['training_level']}>
                                <option>beginner</option>
                                <option>amateur</option>
                                <option>pro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exemail" className="form-label">
                                Цель тренировки
                            </label>
                            <select className='form-control' id="exemail" aria-describedby="emailHelp" name="purpose_of_training" defaultValue={this.props.profile['purpose_of_training']}>
                                <option>weight_loss</option>
                                <option>relief</option>
                                <option>muscle_mass</option>
                                <option>endurance</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="expass" className="form-label">
                                Возраст
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="expass"
                                name="age"
                                defaultValue={this.props.profile['age']}
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
                        <div className="btn-container">

                          <button type="submit" className="btn btn-primary">
                            Сохранить
                          </button>
                          <button type="button" className="btn btn-primary"
                                onClick={e => {
                                    this.props.funcWindowProfileActive();
                                    this.loadProfileFromState();
                                    this.props.funcChangeError({});
                                }}>
                            Закрыть
                          </button>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default WindowProfile