import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/auth";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="container">
					<Navbar />
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
