import React from 'react';

class Register extends React.Component {
    render() {
        // const { error_one } = this.props.error
        // const errorLabel = Object.keys(error_one).map((key) => (
        //     <label htmlFor="expasscheck" className="form-label validation" key={key}>{error_one[key]}</label>
        // ));
        return (
            <div className={this.props.active ? 'model active' : "model"} onClick={() => {
                this.props.setActive();
                this.props.funcSetError({});
            }}>
                <div className={this.props.active ? 'model__content active' : "model__content"} onClick={e => e.stopPropagation()}>
                    <h1 className="name_reg">Регистрация</h1>
                    <form onSubmit={(event) => this.props.setRegister(event)}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Username
                        </label>
                        <input
                            type="text"
                            id="form3Example1c"
                            className={this.props.error['username'] ? 'form-control validation' : 'form-control'}
                            name="username"
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
                        />
                        <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="expass2" className="form-label">
                          Password
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
                          Repeat your password
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
                      {/*<div className="mb-3 form-check">*/}
                      {/*  <input type="checkbox" className="form-check-input" id="exampleCheck1" />*/}
                      {/*  <label className="form-check-label" htmlFor="exampleCheck1">*/}
                      {/*    Check me out*/}
                      {/*  </label>*/}
                      {/*</div>*/}
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register