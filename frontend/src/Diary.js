import React from 'react';
import rectangle from "./img/rectangle.png"
import plus from "./img/plus_2 1.png"

class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this)
  }
  click(id) {
    const elem = document.getElementById(id); //находим блок div по его id, который передали в функцию
    const state = elem.style.display; //смотрим, включен ли сейчас элемент
    if (state === '') {
      elem.style.display = 'none';
    } else {
      elem.style.display = ''; //иначе - включаем
    } //если включен, то выключаем

  }
  render() {
    return (
        <div className="container-diary-background">

          <div className="container-content-diary">

            <div className="diary-container-window-user">
              <div className="diary-container-header-menu">
                <div className="container-logo">
                  <div className="logo-diary"></div>
                  <p className="logo-name">Train</p>
                </div>

                <div className="diary-container-icon-name-user">
                  <img src={rectangle} alt="foto1" />
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
                        тренировка-1
                      </button>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="diary-main-menu">
                <ul className="diary-main-list">
                  <li>
                    <a className='diary-main-element' href="#">
                      Личный кабинет
                    </a>
                  </li>
                  <li>
                    <a className='diary-main-element' href="#">
                      Статьи
                    </a>
                  </li>
                  <li>
                    <a className='diary-main-element' href="#">
                      Выход
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="diary-container-exercise">
              exercise
            </div>

            <div className="diary-container-diary-main">
              exercise
            </div>
          </div>
        </div>
    )
  }
}

export default Diary;