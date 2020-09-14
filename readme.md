# mernql-guestbook

GraphQL CRUD API & React client.
This application has been developed to help end users leave feedback after visiting a place. Ex: A restaurant or a hotel.
They can also reply to other feedbacks with their relevant experience

## Setup

### Server

```sh
cd server
# install deps
npm install
# start server
npm start
```

### Client

```sh
cd client
# install deps
npm install
# start server
npm start
```

As a user, I can

- signup / login
- read feedbacks
- edit / delete my feedbacks
- reply to all feedbacks

## Stack

### Backend

- Node
- GraphQL + Apollo Server (Express built in Apollo)
- MongoDB + Mongoose

#### Graphql Types

Feedback:

- username: String
- body: String
- createdAt: Date
- updatedAt: Date
- replies: [createdat, updatedat, body]
- id: ID

User:

- username: String
- token: String
- id: String

#### Queries

- GetFeedbacks - sends back an array of all feedbacks
- GetFeedback(feedbackID) - sends feedback object

#### Mutations

- Register - creates new user (hashed password stored in DB)
- Login - creates token for new user

Authenticated mutations:

- createFeedback(body) - creates and sends back a new feedback
- createReply(body, feedback ID) - creates a reply to existing feedback

Only for the feedback author:

- editFeedback(body, feedback ID) - edits feedback body, updates the updated at date.  
- deleteFeedback(feedback ID) - deletes feedback

### Frontend

- React 16.13
- Apollo Client (Apollo Cache and Apollo React hooks)
- Bootstrap CSS
