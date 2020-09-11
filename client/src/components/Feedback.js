import React from 'react'

const dumbdata = {
    username: 'ahmed',
    date_posted: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere perspiciatis illum placeat ducimus atque ipsa a, nobis deleniti inventore qui?',
    replies: [
        {
            body: 'dasdasdasdasd',
            username: 'sadasdasd',
            date_posted: new Date().toISOString()
        }
    ],
    _id : 'sadasdasdasdasdasdasd'

}

export const Feedback = () => {
    return (
        <div className="jumbotron p2 pad1y">
            <em className="d-inline mr-5">Posted by: {dumbdata.username}</em>
            <em className="d-inline mr-5">Last Updated: {dumbdata.last_updated}</em>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-2"/>
            {/* replies and for each */}
            <p>Replies</p>
            {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <em className="d-inline mr-5">Reply by: {dumbdata.username}</em>
            <em className="d-inline mr">Date posted: {dumbdata.date_posted}</em>
            <hr className="my-2" /> */}
        </div>
    )
}

export default Feedback
