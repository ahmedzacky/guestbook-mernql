import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a
            className="navbar-brand"
            href="/"
			rel="noopener noreferrer"
          >
            <img
              src="https://www.stickerstocker.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/6/5/65a897_07f1a12b3da84386bbe3329b8989ce43.jpg"
              width="30"
              height="30"
              alt="star"
            />
          </a>
          <Link to="/" className="navbar-brand">
            Guestbook - challenge
          </Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;