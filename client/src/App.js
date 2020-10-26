import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Components/DumbComponents/Header';
import Home from './Components/DumbComponents/Home';
import Login from './Components/HighComponents/Login';
import SignUp from './Components/HighComponents/SignUp';
import Main from './Components/HighComponents/Main';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/main">
            <Main/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
