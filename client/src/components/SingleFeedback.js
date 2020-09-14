import React from "react";
import { gql, useQuery } from "@apollo/react-hooks";
import moment from "moment";

function SingleFeedback(props) {
	const fbID = props.match.params.fbID;

	const { data, loading } = useQuery(FETCH_FEEDBACK, {
		variables: { fbID },
	});

	let markup;
	if (loading) {
		markup = <p>Loading...</p>;
	} else {
		const {
			username,
			body,
			createdAt,
			updatedAt,
			replies,
		} = data.getFeedback;
		markup = (
			<>
				<em className="d-inline text-primary">By: {username}</em>
				<em className="d-inline float-right text-primary">
					Updated {moment(updatedAt).fromNow()}
				</em>
				<em className="d-block text-primary mt-2">
					Posted at: {moment(createdAt).format("MMMM Do YYYY")}
				</em>

				<p className="lead my-4">{body}</p>
				{replies.length > 0 ? (
					<p>Replies: {replies.length}</p>
				) : (
					<p>Reply to Feedback</p>
				)}
				{replies.map(({ id, username, body, createdAt }) => (
					<div key={id} className="bg-info p-2 my-3 rounded">
						<em className="d-inline text-white">By: {username}</em>
						<em className="d-inline float-right text-white">
							Posted at: {moment(createdAt).fromNow()}
						</em>
						<p className="lead text-white mt-2">{body}</p>
					</div>
				))}
			</>
		);
	}
	return <div className="jumbotron pt-4 pb-2">{markup}</div>;
}

const FETCH_FEEDBACK = gql`
	query($fbID: ID!) {
		getFeedback(fbID: $fbID) {
			username
			body
			createdAt
			updatedAt
			replies {
				createdAt
				body
				username
				id
			}
		}
	}
`;

export default SingleFeedback;
