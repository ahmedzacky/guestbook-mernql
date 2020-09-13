import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	return (
		<>
			{user ? (
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between mb-4">
					<Link to="/" className="navbar-brand">
						Guestbook - challenge
					</Link>
					<div className="d-inline">
						<ul className="navbar-nav">
							<li className="navbar-item active">
								<p className="nav-link">
									{user.username}
								</p>
							</li>
							<li className="navbar-item">
								<p className="nav-link" onClick={logout}>
									Logout
								</p>
							</li>
						</ul>
					</div>
				</nav>
			) : (
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between mb-4">
					<Link to="/" className="navbar-brand">
						Guestbook - challenge
					</Link>
					<div className="d-inline">
						<ul className="navbar-nav">
							<li className="navbar-item">
								<Link to="/login" className="nav-link">
									Login
								</Link>
							</li>
							<li className="navbar-item d-inline">
								<Link to="/signup" className="nav-link">
									Signup
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			)}
		</>
	);
};

export default Navbar;
