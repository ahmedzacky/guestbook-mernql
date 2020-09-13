import React from 'react'

export const Feedback = ({body, createdAt, replies, updatedAt, username}) => {
    return (
        <div className="jumbotron p2 pad1y">
            <em className="d-inline mr-5">Posted by: {username}</em>
            <em className="d-inline mr-5">Last Updated: {updatedAt}</em>
            <p className="lead">{body}</p>
            <hr className="my-2"/>
            {/* replies and for each */}
            <p>Replies: {replies.length}</p>
            {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <em className="d-inline mr-5">Reply by: {username}</em>
            <em className="d-inline mr">Date posted: {date_posted}</em>
            <hr className="my-2" /> */}
        </div>
    )
}

export default Feedback
