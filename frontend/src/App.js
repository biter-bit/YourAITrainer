import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': []
        }
    }

    render () {
        return (
            <div>
                Main Web
            </div>
        )
    }
}
export default App;
