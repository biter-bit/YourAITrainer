import React from 'react';

class Register extends React.Component {
    render() {
        return (
            <div className={this.props.active ? 'model active' : "model"} onClick={() => this.props.setActive()}>
                <div className={this.props.active ? 'model__content active' : "model__content"} onClick={e => e.stopPropagation()}>
                    <h1 className="name_reg">Регистрация</h1>
                    <form onSubmit={(event) => this.props.setRegister(event)}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Name
                        </label>
                        <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            name="username"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exemail2" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
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
                          className="form-control"
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
                          className="form-control"
                          id="expasscheck"
                          name="password_confirmation"
                        />
                        <label htmlFor="expasscheck" className="form-label">
                            {this.props.error}
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