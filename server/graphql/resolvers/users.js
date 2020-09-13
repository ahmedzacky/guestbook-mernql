const User = require("./../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { secretKey } = require("./../../config");

module.exports = {
	Mutation: {
		async login(_parent, { username, password }) {
			const user = await User.findOne({ username });
			if (!user) {
				throw new UserInputError("User not found", {
					errors: {
						username: "user not found, try and signup",
					},
				});
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				throw new UserInputError("Wrong credentials", {
					errors: {
						username: "Password doesn't match",
					},
				});
			}

			const token = jwt.sign(
				{
					id: user.id,
					username: user.username,
				},
				secretKey,
				{ expiresIn: "1h" }
			);

			return {
				username: user.username,
				id: user.id,
				token,
			};
		},
		async register(
			_parent,
			{ registerInput: { username, password, confirmPassword } }
		) {
			//validate user data
			if (username.trim() === "") {
				throw new UserInputError("Empty username", {
					errors: {
						username: "username must not be empty",
					},
				});
			}
			if (username.length < 3) {
				throw new UserInputError("Short Username", {
					errors: {
						username: "username must be more than 3 charecters",
					},
				});
			}
			if (password.length < 3) {
				throw new UserInputError("Short password", {
					errors: {
						password: "password must be more than 3 charecters",
					},
				});
			}
			if (password !== confirmPassword) {
				throw new UserInputError("unmatching passwords", {
					errors: {
						password: "passwords must match",
					},
				});
			}

			//make sure user doesn't exist
			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError("Username is already taken", {
					errors: {
						username: "This username already exists",
					},
				});
			}

			//hash the password and return auth token
			const hashedPassword = await bcrypt.hash(password, 12);
			const newUser = new User({
				username,
				password: hashedPassword,
			});

			const res = await newUser.save();
			console.log(res)
			const token = jwt.sign(
				{
					id: res._id,
					username: res.username,
				},
				secretKey,
				{ expiresIn: "1h" }
			);

			return {
				username,
				id: res._id,
				token,
			};
		},
	},
};
