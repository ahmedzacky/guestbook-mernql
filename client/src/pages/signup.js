import React from "react";

const Signup = () => {
	return (
		<form className="col-lg-6 col-md-8 col-sm-12 mx-auto mt-3">
			<div className="form-group">
				<label for="username">Username</label>
				<input
					type="text"
					className="form-control"
					id="username"
					placeholder="Enter email"
					required
				/>
			</div>
			<div className="form-group">
				<label for="new-password">Password</label>
				<input
					type="password"
					className="form-control"
					id="new-password"
					placeholder="Password"
					required
				/>
			</div>
			<div className="form-group">
				<label for="confirm-password">Confirm password</label>
				<input
					type="password"
					className="form-control"
					id="confirm-password"
					placeholder="Password"
					required
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default Signup;
