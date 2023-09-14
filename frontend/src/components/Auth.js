import React from 'react';

class Auth extends React.Component {
    render() {
        return (
            <div className={this.props.active ? 'model active' : "model"} onClick={() => this.props.setActive()}>
                <div className={this.props.active ? 'model__content active' : "model__content"} onClick={e => e.stopPropagation()}>
                    <h1 className="name_reg">Авторизация</h1>
                    <form onSubmit={(event) => this.props.setAuth(event)}>
                      <div className="mb-3">
                        <label htmlFor="exemail" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exemail"
                          aria-describedby="emailHelp"
                          name="email"
                        />
                        <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="expass" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="expass"
                          name="password"
                        />
                      </div>
                      <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="excheck" />
                        <label className="form-check-label" htmlFor="excheck">
                          Check me out
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

export default Auth