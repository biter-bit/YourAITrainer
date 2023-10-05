import React from 'react';
import { Link } from "react-router-dom";

class Diary extends React.Component {

    render() {
        return (
            <div className="main">
            <div className="header">
                <div className="logo">
                    <img src="img/logo_5 2.png" alt="logo"/>
                    <p style={{color: "#FFFFFF", size: 32}}>Train</p>
                </div>
                <button style={{width: 125, height: 48, borderRadius: 8}}>Создать</button>
            </div>
            <div className="content">
                <div className="left-block">
                    <div className="left-name">
                        <img src="img/Rec25.png" alt="foto1"/>
                        <p style={{color: "#FFFFFF", fontSize: 14}}>Иван Петрович Иванов</p>
                    </div>
                    <button
                        style={{
                            width: 248,
                            height: 47,
                            marginTop: 50,
                            borderRadius: 6,
                            backgroundColor: "#323232"
                        }}
                    >
                        <img src="img/plus_2 1.png" alt="plus"/>
                    </button>
                    <div className="left-list">
                        <ul className="list-programs">
                            <li className="train-menu">
                                Программа-1
                                <ul className="train-list">
                                    <li>тренировка-1</li>
                                    <li>тренировка-2</li>
                                    <li>тренировка-3</li>
                                    <li>тренировка-4</li>
                                    <li>тренировка-5</li>
                                </ul>
                            </li>
                            <li className="train-menu">
                                Программа-2
                                <ul className="train-list">
                                    <li>тренировка-1</li>
                                    <li>тренировка-2</li>
                                    <li>тренировка-3</li>
                                    <li>тренировка-4</li>
                                    <li>тренировка-5</li>
                                </ul>
                            </li>
                            <li className="train-menu">
                                Программа-3
                                <ul className="train-list">
                                    <li>тренировка-1</li>
                                    <li>тренировка-2</li>
                                    <li>тренировка-3</li>
                                    <li>тренировка-4</li>
                                    <li>тренировка-5</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="left-menu">
                        <ul style={{listStyleType: "none"}}>
                            <li>
                                {/*<a style={{color: "#FFFFFF", textDecoration: "none"}} href="#">*/}
                                {/*    Личный кабинет*/}
                                {/*</a>*/}
                                <Link style={{color: "#FFFFFF", textDecoration: "none"}} to="/">Главная</Link>
                            </li>
                            <li>
                                <a style={{color: "#FFFFFF", textDecoration: "none"}} href="#">
                                    Статьи
                                </a>
                            </li>
                            <li>
                                <a style={{color: "#FFFFFF", textDecoration: "none"}} href="#">
                                    Выход
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="exercise">
                    <ul className="exercise-list">
                        <li>
                            <div>
                                <img src="img/Rec25.png" alt="foto"/>
                                <p>Упражнение-1</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="./img/Rec25.png" alt="foto"/>
                                <p>Упражнение-2</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="img/Rec25.png" alt="foto"/>
                                <p>Упражнение-3</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="img/Rec25.png" alt="foto"/>
                                <p>Упражнение-4</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src="img/Rec25.png" alt="foto"/>
                                <p>Упражнение-5</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="right-block">
                    <table className="iksweb">
                        <tbody>
                        <tr>
                            <th>
                                <input type="checkbox"/>
                            </th>
                            <th>Номер подхода:</th>
                            <th>Вес (кг):</th>
                            <th>Повторения:</th>
                            <th>Комментарии:</th>
                            <th>
                                <input type="reset"/>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>1</td>
                            <td>20</td>
                            <td>4</td>
                            <td>тест</td>
                            <td>
                                <input type="reset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>2</td>
                            <td/>
                            <td/>
                            <td/>
                            <td>
                                <input type="reset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>3</td>
                            <td/>
                            <td/>
                            <td/>
                            <td>
                                <input type="reset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>4</td>
                            <td/>
                            <td/>
                            <td/>
                            <td>
                                <input type="reset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>5</td>
                            <td/>
                            <td/>
                            <td/>
                            <td>
                                <input type="reset"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>6</td>
                            <td/>
                            <td/>
                            <td/>
                            <td>
                                <input type="reset"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
    }
}

export default Diary