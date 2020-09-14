const Feedback = require("./../../models/Feedback");
const jwt = require("jsonwebtoken");
const { secretKey } = require("./../../config");
const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = (context) => {
	const authHeader = context.req.headers.authorization;
	if (authHeader) {
		try {
			const user = jwt.verify(authHeader, secretKey);
			return user;
		} catch {
			throw new AuthenticationError("Invalid/Expired token");
		}
	}
	throw new Error("Auth header must be provided");
};

module.exports = {
	Query: {
		//read all feedbacks
		async getFeedbacks() {
			try {
				const feedbacks = await Feedback.find().sort({
					updatedAt: -1,
				});
				return feedbacks;
			} catch {
				throw new Error("Something went wrong");
			}
		},
		//read single feedback
		async getFeedback(_, { fbID }) {
			try {
				const feedback = await Feedback.findById(fbID);
				return feedback;
			} catch {
				throw new Error("Feedback not found");
			}
		},
	},
	Mutation: {
		//create feedback
		async createFeedback(_, { body }, context) {
			if (body.trim() === "") {
				throw new UserInputError("Empty feedback", {
					errors: {
						body: "Feedback cant be empty",
					},
				});
			}
			const { username } = checkAuth(context);
			const newFeedback = new Feedback({
				body,
				username,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
			const feedback = await newFeedback.save();
			return feedback;
		},
		//edit single feedback
		async editFeedback(_, { body, fbID }, context) {
			const { username } = checkAuth(context);
			try {
				const feedback = await Feedback.findById(fbID);
				if (username === feedback.username) {
					const newFeedback = {
						id: fbID,
						body,
						username,
						replies: feedback.replies,
						createdAt: feedback.createdAt,
						updatedAt: new Date().toISOString(),
					};
					await Feedback.findByIdAndUpdate(fbID, newFeedback);
					return newFeedback;
				}
				throw new AuthenticationError("Action not allowed");
			} catch {
				throw new Error("Something went wrong");
			}
		},
		//delete single feedback
		async deleteFeedback(_, { fbID }, context) {
			const { username } = checkAuth(context);
			try {
				const feedback = await Feedback.findById(fbID);
				if (username === feedback.username) {
					await feedback.delete();
					return "feedback successfully deleted";
				}
				throw new AuthenticationError("Action not allowed");
			} catch {
				throw new Error("Something went wrong");
			}
		},
		//create single reply
		async createReply(_, { fbID, body }, context) {
			const { username } = checkAuth(context);
			if (body.trim() === "") {
				throw new UserInputError("Empty Reply", {
					errors: {
						body: "Reply cant be empty",
					},
				});
			}
			const feedback = await Feedback.findById(fbID);
			feedback.replies = feedback.replies || []
			if (feedback) {
				feedback.replies.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await feedback.save()
				return feedback
			} 
			throw new Error("Feedback not found");
		},
	},
};
