import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Diary from "./Diary";
import Main from "./Main"


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/diary" element={<Diary />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App