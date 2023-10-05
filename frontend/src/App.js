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
                        <Route path='article' element={ <AppArticle  />} />
                        <Route path='articles' components={ <AppArticle  />} />
                        <Route path='articles2' components={ <AppArticle  />} />

                    </Routes>
                </BrowserRouter>

        );

}


