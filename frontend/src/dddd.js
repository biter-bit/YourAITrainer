import React from 'react';
import Menu from "./components/Menu";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.cklik = this.cklik.bind(this)
  }
  cklik(id) {
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

        <button className="button-menu-diary">Создать</button>


        <div className="main">
          <div className="content">

            </div>
            <div className="white-block">
              <div id={1} className="exercise" style={{ display: "none" }}>
                <ul className="exercise-list">
                  <li>
                    {/* <div><img src="img/rectangle.png" alt="foto"> */}
                    <button onclick="cklik('2')" className="button-exercise">
                      Упражнение-1
                    </button>
                    {/* </div> */}
                  </li>
                  <li>
                    {/* <div><img src="img/rectangle.png" alt="foto"> */}
                    <button onclick="cklik('2')" className="button-exercise">
                      Упражнение-2
                    </button>
                    {/* </div> */}
                  </li>
                  <li>
                    {/* <div><img src="img/rectangle.png" alt="foto"> */}
                    <button onclick="cklik('2')" className="button-exercise">
                      Упражнение-3
                    </button>
                    {/* </div> */}
                  </li>
                  <li>
                    {/* <div><img src="img/rectangle.png" alt="foto"> */}
                    <button onclick="cklik('2')" className="button-exercise">
                      Упражнение-4
                    </button>
                    {/* </div> */}
                  </li>
                  <li>
                    {/* <div><img src="img/rectangle.png" alt="foto"> */}
                    <button onclick="cklik('2')" className="button-exercise">
                      Упражнение-5
                    </button>
                    {/* </div> */}
                  </li>
                </ul>
              </div>
              <div className="table-approach">
                <table id={2} className="iksweb" style={{ display: "none" }}>
                  <tbody>
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>Номер подхода:</th>
                      <th>Вес (кг):</th>
                      <th>Повторения:</th>
                      <th>Комментарии:</th>
                      <th>
                        <input type="reset" />
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>1</td>
                      <td>20</td>
                      <td>4</td>
                      <td>тест</td>
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>2</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>3</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>4</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>5</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>6</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>3</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>4</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>5</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>6</td>
                      <td />
                      <td />
                      <td />
                      <td>
                        <input type="reset" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

    )
  }
}

export default Diary;