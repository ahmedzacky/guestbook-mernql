import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { AuthContext } from "./../context/auth";
import EditGadget from "./EditGadget";
import DeleteGadget from "./DeleteGadget";

function SingleFeedback(props) {
	const { user } = useContext(AuthContext);
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
			id,
		} = data.getFeedback;
		markup = (
			<>
				<em className="d-inline text-primary">By: {username}</em>
				<em className="d-inline float-right">
					Last Updated: {moment(updatedAt).format("hh:mm d/mm/yy")}{" "}
					{user.username === username && (
						<>
							<EditGadget body={body} id={id} />
							<DeleteGadget id={id} />
						</>
					)}
				</em>
				<em className="d-block text-primary mt-2">
					Posted at: {moment(createdAt).format("MMMM Do YYYY")}
				</em>

				<p className="lead my-4">{body}</p>
				{user ? (
					<hr></hr>
				) : (
					<>
						<hr />
						<p className="text-center">
							<a href="/login">Login </a>to reply
						</p>
						<hr />
					</>
				)}
				{replies.length > 0 && <p>Replies: {replies.length}</p>}
				{replies.map(({ id, username, body, createdAt }) => (
					<div key={id} className="bg-info p-2 my-3 rounded">
						<em className="d-inline text-white">By: {username}</em>
						<em className="d-inline float-right text-white">
							Posted: {moment(createdAt).format("d-mm-yy")}
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
