import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth";
import EditGadget from "./EditGadget";
import DeleteGadget from "./DeleteGadget";

export const Feedback = ({ body, replies, updatedAt, username, id }) => {
	const { user } = useContext(AuthContext);
	return (
		<div className="jumbotron pt-4 pb-2">
			<em className="d-inline">Posted by: {username}</em>
			<em className="d-inline float-right">
				<Link to={`/feedbacks/${id}`}>
					Last Updated:{" "}
					{moment(updatedAt).fromNow()}
				</Link>
				{user && user.username === username && (
					<>
						<EditGadget body={body} id={id} />
						<DeleteGadget id={id} />
					</>
				)}
			</em>
			<p className="lead my-4">{body}</p>
			{replies.length > 0 ? (
				<Link to={`/feedbacks/${id}`}>
					<p>Replies: {replies.length}</p>
				</Link>
			) : (
				<Link to={`/feedbacks/${id}`}>
					<p>Reply to Feedback</p>
				</Link>
			)}
		</div>
	);
};

export default Feedback;
