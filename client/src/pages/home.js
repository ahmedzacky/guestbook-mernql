import React from "react";
import CreateFeedback from "../components/CreateFeedback";
import Feedback from "../components/Feedback";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const Home = () => {
	const { loading, data } = useQuery(FETCH_FEEDBACKS);
	if (data) console.log(data);
	return (
		<div>
			<CreateFeedback />
            <h3 className="text-center mb-4">Recent feedbacks</h3>
			{loading ? (
				<h2>LOADING...</h2>
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

const FETCH_FEEDBACKS = gql`
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
