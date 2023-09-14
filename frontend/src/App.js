import React from "react";
import Register from "./components/Register";
import Auth from "./components/Auth";
import Menu from "./components/Menu";
import Articles from "./components/Articles"
import Offer from "./components/Offer";
import Burger from "./components/Burger";
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modelActiveAuth: false,
            modelActiveReg: false,
            authorized: false,
            burger_active: false,
        }
        this.inputClickAuth = this.inputClickAuth.bind(this)
        this.inputClickReg = this.inputClickReg.bind(this)
        this.authorizedAuth = this.authorizedAuth.bind(this)
        this.funcBurgerActive = this.funcBurgerActive.bind(this)
    }
    render() {
        return (
            <div>
                <Burger burger={this.state.burger_active} setBurger={this.funcBurgerActive}/>
                <div className="container">
                    <Menu setActive={this.inputClickAuth} auth={this.state.authorized} setBurger={this.funcBurgerActive}/>
                      <div className="container_body">
                        <Offer setActive={this.inputClickReg}/>
                        <Articles />
                      </div>
                      <Register active={this.state.modelActiveReg} setActive={this.inputClickReg} />
                      <Auth active={this.state.modelActiveAuth} setActive={this.inputClickAuth} setAuth={this.authorizedAuth}/>
                </div>
            </div>
        )
    }
    funcBurgerActive() {
        console.log(this.state.burger_active)
        if (this.state.burger_active) {
            this.setState({ burger_active: false })
        }
        else {
            this.setState({ burger_active: true })
        }
    }
    authorizedAuth(event) {
        event.preventDefault()
        if (this.state.authorized) {
            this.setState({ authorized: false })
            this.inputClickAuth()
        }
        else {
            this.setState({ authorized: true })
            this.inputClickAuth()
        }
    }
    inputClickAuth() {
        if (this.state.modelActiveAuth) {
            this.setState({ modelActiveAuth: false })
        }
        else {
            this.setState({ modelActiveAuth: true })
        }
    }

    inputClickReg() {
        if (this.state.modelActiveReg) {
            this.setState({ modelActiveReg: false })
        }
        else {
            this.setState({ modelActiveReg: true })
        }
    }
}

export default App