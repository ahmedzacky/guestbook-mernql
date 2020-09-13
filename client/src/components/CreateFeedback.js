import React, { useState } from "react";

const CreateFeedback = () => {
	const [body, setBody] = useState("");
	const [error, setError] = useState("");
	const handleForm = (e) => {
		setBody(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (body) {
			setBody("");
			setError("");
		} else {
			setError("Post can't be blank");
		}
	};
	return (
		<div className="my-2">
			<h3>Post a Feedback</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="text"
						className="form-control main-form my-2"
						value={body}
						onChange={handleForm}
					/>
				</div>
				{error && <p className="text-danger">{error}</p>}
				<div className="form-group mx-auto">
					<input
						type="submit"
						value="Submit"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateFeedback;
