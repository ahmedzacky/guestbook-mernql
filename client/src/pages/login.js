import React from 'react'

const Login = () => {
    return (
		<form className="col-lg-6 col-md-8 col-sm-12 mx-auto mt-3">
			<div className="form-group">
				<label for="username">Username</label>
				<input
					type="text"
					className="form-control"
					id="username"
					placeholder="Enter username"
                    required
				/>
			</div>
			<div className="form-group">
				<label for="current-password">Password</label>
				<input
					type="password"
					className="form-control"
					id="current-password"
					placeholder="Password"
                    required
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
    )
}

export default Login