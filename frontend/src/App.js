import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Main from "./components/Main";
import AppArticle from "./pages/AppArticle";
import ArticlePage from "./pages/ArticlePage";

import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default function App() {
        return (

                 <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Main  />} />

                        <Route path='articles' element={ <AppArticle  />} />

                    </Routes>
                </BrowserRouter>

        );

}


