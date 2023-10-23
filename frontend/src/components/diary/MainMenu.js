import React from "react";
import {Link} from "react-router-dom";
import rectangle from "../../img/rectangle.png";
import plus from "../../img/plus_2 1.png";

class MainMenu extends React.Component {
    render() {
        return(
            <div className="diary-container-window-user">
              <div className="diary-container-header-menu">
                <Link className="container-logo" to="/">
                  <div className="logo-diary"></div>
                  <p className="logo-name">Train</p>
                </Link>


                <div className="diary-container-icon-name-user">
                  <img className="diary-icon-user" src={rectangle} alt="foto1" />
                  <p className="diary-name-user">Иван Петрович Иванов</p>
                </div>

                <button className="diary-button-generic-program">
                  <img src={plus} alt="plus" />
                </button>
              </div>

              <div className="diary-container-list-program">
                <ul className="list-programs">
                  <li className="train-menu">
                    Программа-1
                    <ul className="train-list">
                      <button className="button-train" onClick={() => this.click(1)}>
                        Тренировка-1
                      </button>
                      <button className="button-train" onClick={() => this.click(1)}>
                        Тренировка-1
                      </button>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="diary-main-menu">
                <ul className="diary-main-list">
                  <li className="diary-main-element_list">
                    <a className='diary-main-element' href="#">
                      Личный кабинет
                    </a>
                  </li>
                  <li className="diary-main-element_list">
                    <a className='diary-main-element' href="#">
                      Статьи
                    </a>
                  </li>
                  <li className="diary-main-element_list">
                    <a className='diary-main-element' href="#">
                      Выход
                    </a>
                  </li>
                </ul>
              </div>
            </div>
        )
    }
}

export default MainMenu;