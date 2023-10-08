import React from "react";
//import Register from "./components/Register";
//import Auth from "./components/Auth";
//import Menu from "./components/Menu";
//import Offer from "./components/Offer";
//import Burger from "./components/Burger";
import 'bootstrap/dist/css/bootstrap.css';
//import axios from "axios";

import Main from "./components/Main";
import ArticlePage from "./pages/ArticlePage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Articles from "./components/Articles";

import ReactDOM from "react-dom/client";

//const link_api_auth = 'http://localhost:8000/api/auth/jwt/create/'
//const link_api_register = 'http://localhost:8000/api/auth/register/'
export default function App() {
        return (



                 <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Main  />} />
                        <Route path='articles' element={ <Articles  />} />
                    </Routes>
                </BrowserRouter>



        )


}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

