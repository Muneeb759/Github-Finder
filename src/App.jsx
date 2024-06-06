import React, { useState, Fragment, useEffect } from "react";
import Navbar from "./Components/Layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./Components/Layout/Alert";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import User from "./Components/users/User";
import GithubState from "./Context/Github/GithubState";
import AlertState from "./Context/Alert/AlertState";
import NotFound from "./Components/Pages/NotFound";
import "./App.css";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Routes>
                <Route exact path="/" Component={Home} />
                <Route path="/about" element={<About />} />
                <Route exact path="/user/:login" Component={User} />
                <Route component={NotFound} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
