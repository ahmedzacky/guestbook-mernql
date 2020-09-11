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
		} catch (err) {
			throw new AuthenticationError("Invalid/Expired token");
		}
	}
	throw new Error("Authentication header must be provided");
};

module.exports = {
	Query: {
		async getFeedbacks() {
			try {
				const feedbacks = await Feedback.find({}).sort({
					createdAt: -1,
				});
				return feedbacks;
			} catch (error) {
				throw new Error(error);
			}
		},
		async getFeedback(_, { fbID }) {
			try {
				const feedback = await Feedback.findById(fbID);
				if (feedback) {
					return feedback;
				} else {
					throw new Error("Feedback not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createFeedback(_, { body }, context) {
			//errors will all return  from checkAuth
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
		async editFeedback(_, { body, fbID }, context) {
			const feedback = await Feedback.findById(fbID);
			const user = checkAuth(context);
			if (feedback) {
				if (user.username === feedback.username) {
					const newFeedback = {
						body,
						username: user.username,
						createdAt: feedback.createdAt,
						updatedAt: new Date().toISOString,
					};
					const nowPostnewFeedback = await Feedback.findByIdAndUpdate(
						fbID,
						newFeedback
					);
					return nowPostnewFeedback;
				} else throw new Error("Not Authorized");
			} else throw new Error("Feedback not found");
		},
	},
};
