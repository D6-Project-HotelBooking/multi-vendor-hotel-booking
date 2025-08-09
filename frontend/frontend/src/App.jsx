// src/App.jsx - MINIMAL VERSION
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Placeholder for the homepage */}
                    <Route index element={<div><h1>Welcome to Royal & Luxury Hotels</h1></div>} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;