import React from "react";
import Modal from "react-modal";
import { BsPencil } from "react-icons/bs";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_FEEDBACKS } from "./../pages/home";
import { useHistory } from "react-router-dom";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		backgroundColor: '#fff',
		transform: "translate(-50%, -50%)",
	},
};

const EditGadget = ({ id, body }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [newBody, setNewBody] = React.useState(body);
	let history = useHistory();

	function onChange(e) {
		setNewBody(e.target.value);
	}

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const [editFeedback] = useMutation(EDIT_FEEDBACK, {
        variables: {fbID: id , body: newBody},
		refetchQueries: [
			{
				query: FETCH_FEEDBACKS,
			},
		],
	});
	
	async function onSubmit(e) {
		e.preventDefault();
		await editFeedback();
		closeModal()
		history.push(`/feedbacks/${id}`)
	}


	Modal.setAppElement("#root");

	return (
		<>
			<BsPencil onClick={openModal} className="mx-2 text-info pointer" />
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				className="col-sm col-md-6 col-lg-4 border rounded border-primary p-3"
			>
				<div className="mb-4">
					<h2 className="d-inline">Edit feedback</h2>
					<button
						className="btn btn-danger float-right ml-4 py-1"
						onClick={closeModal}
					>
						X
					</button>
				</div>
				<form id="edit-form" onSubmit={onSubmit}>
					<textarea
						className="form-control"
						rows="4"
						cols="50"
						name="comment"
						form="edit-form"
						onChange={onChange}
						value={newBody}
					/>
					<input
						type="submit"
						className="btn btn-primary my-3"
						value="Submit"
					/>
				</form>
			</Modal>
		</>
	);
};

const EDIT_FEEDBACK = gql`
	mutation editFeedback($fbID:ID!, $body: String!) {
		editFeedback(fbID: $fbID, body: $body) {
			id
			body
			createdAt
			updatedAt
			username
			replies {
				id
				username
				body
				createdAt
			}
		}
	}
`;

export default EditGadget;
