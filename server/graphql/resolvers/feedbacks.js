const Feedback = require("./../../models/Feedback");
const jwt = require("jsonwebtoken");
const { secretKey } = require("./../../config");
const { AuthenticationError } = require("apollo-server");

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
					createdAt: -1,
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
			const user = checkAuth(context);
			const newFeedback = new Feedback({
				body,
				username: user.username,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
			const feedback = await newFeedback.save();
			return feedback;
		},
		//edit single feedback
		async editFeedback(_, { body, fbID }, context) {
			const user = checkAuth(context);
			try {
				const feedback = await Feedback.findById(fbID);
				if (user.username === feedback.username) {
					const newFeedback = {
						id: fbID,
						body,
						username: user.username,
						createdAt: feedback.createdAt,
						updatedAt: new Date().toISOString(),
					};
					await Feedback.findByIdAndUpdate(fbID, newFeedback);
					return newFeedback;
				}
				throw new Error("Not Authorized");
			} catch {
				throw new Error("Something went wrong");
			}
		},
	},
};
