import React from 'react';
import SignIn from './component/signin.js'
import SignUp from './component/signup.js'
import { BrowserRouter, Route, Switch, HashRouter, Router, Link, Routes } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'universal-cookie'



class App extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'token': ''
        }
    }

  set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        // localStorage.setItem('token', token)
        this.setState({ 'token': token }, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        // const token = localStorage.getItem('token')
        this.setState({ 'token': token }, () => this.load_data())
    }

    get_token(username, password) {
        console.log(username, password)
        axios.post('http://127.0.0.1:8000/api/auth/login/', { username: username, password: password })
            .then(response => {

                this.set_token(response.data['access'])
            }).catch(error => alert('Неверный логин или пароль', username, password))
    }

    get_username(username, password) {
        console.log(username, password)
        axios.post('http://127.0.0.1:8000/api/auth/register/', { username: username, password1: password,  password2: password})
            .then(response => {

                this.set_token(response.data['access'])
            }).catch(error => alert('Неверный логин или пароль', username, password))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/auth/user/', { headers })
            .then(response => {
                this.setState({ users: response.data })
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()

    }

  render() {
      return (
        <div className="App">

      		<BrowserRouter>
			  	<nav>
            		<ul>
              			<li>
                			<Link to="/login">Login</Link>
              			</li>
              			<li>
                			<Link to="/SignUp">About</Link>
              			</li>
              			<li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button>
                                    : <Link to='/login' >Login</Link>}
                        </li>
            		</ul>
          		</nav>

          		<Routes>
            		<Route  path="/login" element={
            		<SignIn get_token={(username, password) => this.get_token(username, password)} />} exact />
            		<Route path="/SignUp" element={<SignUp get_username={(username, password) => this.get_username(username, password)} />} exact />
          		</Routes>
        	</BrowserRouter>
    	</div>
      );
  }
}

export default App;

