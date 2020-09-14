import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import SingleFeedback from "./components/SingleFeedback";
import { AuthProvider, AuthContext } from "./context/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
	const { user } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="container">
					<Navbar />
					<Route path="/" exact component={Home} />
					<AuthRoute path="/login" exact component={Login} />
					<AuthRoute path="/signup" exact	 component={Signup} />
					<Route exact path="/feedbacks/:fbID" component={SingleFeedback} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
