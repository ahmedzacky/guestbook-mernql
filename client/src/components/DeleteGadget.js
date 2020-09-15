import React from "react";
import Modal from "react-modal";
import { BsTrash } from "react-icons/bs";
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
		transform: "translate(-50%, -50%)",
	},
};

const DeleteGadget = ({ id }) => {
    let history = useHistory();
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
        setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
    }

	Modal.setAppElement("#root");

	const [deleteFeedback] = useMutation(DELETE_FEEDBACK, {
        variables: {fbID: id},
		refetchQueries: [
			{
				query: FETCH_FEEDBACKS,
			},
		],
    });
    
    const progressDelete = () => {
        deleteFeedback();
        history.push("/");
    }

	return (
		<>
			<BsTrash onClick={openModal} className="text-danger pointer" />
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<div className="mb-4">
					<h2 className="d-inline">Delete feedback</h2>
				</div>
				<div className="justify-content-between">
					<p>Are you sure you want to delete this feedback?</p>
					<button
						type="submit"
						className="btn btn-primary float-right"
						onClick={progressDelete}
					>
						Delete
					</button>
					<button
						className="btn btn-outline-danger"
						onClick={closeModal}
					>
						Cancel
					</button>
				</div>
			</Modal>
		</>
	);
};

const DELETE_FEEDBACK = gql`
	mutation deleteFeedback($fbID: ID!) {
		deleteFeedback(fbID: $fbID)
	}
`;

export default DeleteGadget;
