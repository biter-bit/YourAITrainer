import React from 'react';

class Auth extends React.Component {

    render() {
        return (
            <div className={this.props.active ? 'model active' : "model"} onClick={() => {
                this.props.setActive();
                this.props.reset()
            }}>
                <div className={this.props.active ? 'model__content active' : "model__content"} onClick={e => e.stopPropagation()}>
                    <h1 className="name_reg">Авторизация</h1>
                    <form onSubmit={(event) => this.props.setAuth(event)}>
                      <div className="mb-3">
                        <label htmlFor="exemail" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          className={this.props.error['username'] ? 'form-control validation' : 'form-control'}
                          id="exemail"
                          aria-describedby="emailHelp"
                          name="username"
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
                          className={this.props.error['password'] ? 'form-control validation' : 'form-control'}
                          id="expass"
                          name="password"
                        />
                        <label htmlFor="expass" className="form-label validation">
                            {Object.keys(this.props.error).map(key => (
                                <span key={key}>
                                    {key}: {this.props.error[key]}
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

export default Auth