import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Signup = ({ history }) => {
	const [values, setValues] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result) {
			console.log(result);
			history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	const onSubmit = (e) => {
		e.preventDefault();
		addUser();
	};

	return (
		<>
			{loading ? (
				<h3 className="text-center my-5">Loading...</h3>
			) : (
				<form
					onSubmit={onSubmit}
					className="col-lg-6 col-md-8 col-sm-12 mx-auto mt-3"
				>
					<h1>Signup</h1>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							placeholder="Enter username"
							value={values.username}
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="new-password">Password</label>
						<input
							type="password"
							className="form-control"
							id="new-password"
							name="password"
							placeholder="Password"
							value={values.password}
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="confirm-password">
							Confirm password
						</label>
						<input
							type="password"
							className="form-control"
							id="confirm-password"
							name="confirmPassword"
							placeholder="Confirm password"
							value={values.confirmPassword}
							onChange={onChange}
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

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			username
			token
		}
	}
`;

export default Signup;
