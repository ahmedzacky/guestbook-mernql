import React, { useContext } from "react";
import CreateFeedback from "../components/CreateFeedback";
import Feedback from "../components/Feedback";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const Home = () => {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_FEEDBACKS);
	return (
		<div>
			{user && <CreateFeedback />}
			<h3 className="text-center mb-4">Recent feedbacks</h3>
			{loading ? (
				<h3 className="text-center my-5">Loading...</h3>
			) : (
				data.getFeedbacks.map((feedback) => (
					<Feedback
						key={feedback.id}
						id={feedback.id}
						body={feedback.body}
						createdAt={feedback.createdAt}
						replies={feedback.replies}
						updatedAt={feedback.updatedAt}
						username={feedback.username}
					/>
				))
			)}
		</div>
	);
};

export const FETCH_FEEDBACKS = gql`
	{
		getFeedbacks {
			id
			body
			createdAt
			updatedAt
			username
			replies {
				id
				body
				username
				createdAt
			}
		}
	}
`;

export default Home;
