import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./components/MainLog";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddFilm from "./components/add-film.component";
import Film from "./components/film.component";
import FilmsList from "./components/film-list.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



class App extends Component {
  render() {
    const user = localStorage.getItem('token');
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <h2 style={{ color: "white" }}>Movie Library</h2>
      <div className="navbar-nav mr-auto">
      </div>
      <div className="navbar-nav">
      <li className="nav-item ml-auto">
      <Link to={"/login"} className="nav-link">
        Login
      </Link>
    </li>
      </div>
    </nav>

        <div className="container mt-3">
          <Switch>
            <Route path="/home" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/films" component={FilmsList} />
            <Route path="/add" component={AddFilm} />
            <Route path="/films/:id" component={Film} />
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;