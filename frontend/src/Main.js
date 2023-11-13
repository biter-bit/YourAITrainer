import React from "react";
import Register from "./components/Register";
import Auth from "./components/Auth";
import Menu from "./components/Menu";
import RandomArticles from "./components/RandomArticles"
import Offer from "./components/Offer";
import Burger from "./components/Burger";
import ModalWindow from "./components/ModalWindow";

class Main extends React.Component {

    componentDidMount() {
        const showModal = new URLSearchParams(window.location.search).get('showModal');
        if (showModal === 'true') {
            this.props.setModalWindow();
        }
    }

    render() {
        return (
            <div>
                <Burger
                    exitAccount={this.props.exitAccount}
                    burger={this.props.burger_active}
                    setBurger={this.props.funcBurgerActive}
                    checkAuth={this.props.checkAuthentication}
                    logout={this.props.logout}
                />
                <div className="container">
                    <Menu setActive={this.props.inputClickAuth} auth={this.props.auth_user} setBurger={this.props.funcBurgerActive} />
                    <div className="container_body">
                        <Offer
                            setActive={this.props.inputClickReg}
                        />
                        <RandomArticles />
                    </div>
                    <Register active={this.props.modelActiveReg}
                              setActive={this.props.inputClickReg}
                              error={this.props.errorValidation}
                              setRegister={this.props.funcRegistered}
                              funcSetError={this.props.funcChangeError}
                    />
                    <Auth active={this.props.modelActiveAuth}
                          setActive={this.props.inputClickAuth}
                          setAuth={this.props.authorizedAuth}
                          error={this.props.errorValidation}
                          funcSetError={this.props.funcChangeError}
                    />
                    <ModalWindow
                        setModalWindow={this.props.setModalWindow}
                        modalActive={this.props.modalActive}
                    />
                </div>
            </div>
        )
    }
}

export default Main