import React from 'react';
import {Link} from "react-router-dom";

class ButtonsMain extends React.Component {
    render() {
        return (
            <div className="diary-main-menu">
                <ul className="diary-main-list">
                    <li className="diary-main-element_list">
                        <a className='diary-main-element' href="profile"
                           onClick={(element) => {
                               element.preventDefault();
                               this.props.funcWindowProfileActive();
                           }}>
                            Личный кабинет
                        </a>
                    </li>
                    <li className="diary-main-element_list">
                        <Link to='/articles' className='diary-main-element'>
                            Статьи
                        </Link>
                    </li>
                    <li className="diary-main-element_list">
                        <Link className="diary-main-element" to="/" onClick={this.props.logout}>Выход</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ButtonsMain;