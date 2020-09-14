import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CreateFeedback = () => {
	const [body, setBody] = useState("");
	const [error, setError] = useState("");

	const handleForm = (e) => {
		setBody(e.target.value);
	};

	const [createFeedback, { errors }] = useMutation(CREATE_FEEDBACK, {
		variables: { body },
		update(_, result) {
			console.log(result);
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();
		if (body) {
			createFeedback();
			setBody("");
			setError("");
		} else {
			setError("Feedback can't be blank");
		}
	};
	return (
		<div className="my-2">
			<h3>Post a Feedback</h3>
			<form onSubmit={onSubmit}>
				{error && <p className="alert alert-danger mt-4">{error}</p>}
				<div className="form-group">
					<input
						type="text"
						className="form-control main-form my-2"
						value={body}
						onChange={handleForm}
					/>
				</div>
				<div className="form-group">
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

const CREATE_FEEDBACK = gql`
	mutation createFeedback($body: String!) {
		createFeedback(body: $body) {
			id
			body
			createdAt
			updatedAt
			username
			replies{
				id username body
			}
		}
	}
`;

export default CreateFeedback;
