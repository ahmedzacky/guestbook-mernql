import React, { useState } from "react";
import { FETCH_FEEDBACKS } from "./../pages/home";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const PostReply = ({ id }) => {
	const [body, setBody] = useState("");
	const [error, setError] = useState("");

	const onChange = (e) => {
		setBody(e.target.value);
	};

	const [createFeedback] = useMutation(CREATE_REPLY, {
		variables: { body, fbID: id },
		refetchQueries: [
			{
				query: FETCH_FEEDBACKS,
			},
		],
	});

	const onSubmit = (e) => {
		e.preventDefault();
		if (body) {
			createFeedback();
			setBody("");
			setError("");
		} else {
			setError("Reply can't be blank");
		}
	};

	return (
		<div className="my-2">
			<h5>Reply to Feedback</h5>
			<form onSubmit={onSubmit}>
				{error && <p className="alert alert-danger mt-4">{error}</p>}
				<div className="form-group">
					<input
						type="text"
						className="form-control main-form my-2"
						value={body}
						onChange={onChange}
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

const CREATE_REPLY = gql`
	mutation createReply($fbID: ID!, $body: String!) {
		createReply(fbID: $fbID, body: $body) {
			body
		}
	}
`;

export default PostReply;
