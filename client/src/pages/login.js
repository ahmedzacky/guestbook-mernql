import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from '../context/auth'

const Login = ({ history }) => {
    const context = useContext(AuthContext)
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, result) {
            context.login(result.data.login)
			history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		loginUser();
	};

	return (
		<>
			{loading ? (
				<h3 className="text-center my-5">Loading...</h3>
			) : (
				<form
					className="col-lg-6 col-md-8 col-sm-12 mx-auto mt-3"
					onSubmit={onSubmit}
				>
					<h2 className="text-center">Login</h2>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							onChange={onChange}
							type="text"
							className="form-control"
							id="username"
							name="username"
							placeholder="Enter username"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="current-password">Password</label>
						<input
							onChange={onChange}
							type="password"
							className="form-control"
							id="current-password"
							name="password"
							placeholder="Password"
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
					{Object.values(errors).map((error) => (
						<p className="alert alert-danger mt-4" key={error}>
							{error}
						</p>
					))}
				</form>
			)}
		</>
	);
};

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
			token
		}
	}
`;

export default Login;
