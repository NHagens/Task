import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import NewTaskPage from "./Pages/NewTaskPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
      <Router history={History}>
        <NavBar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route path="/index">
                <HomePage />
            </Route>
            <Route path="/newTask">
                <NewTaskPage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
        </Switch>
      </Router>
  );
}
function Home() {
  return <HomePage />;
}

function NewTask() {
  return <NewTaskPage />;
}

export default App;
