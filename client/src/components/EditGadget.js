import React from "react";
import Modal from "react-modal";
import { BsPencil } from "react-icons/bs";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		width: "400px",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

const EditGadget = ({ id, body }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	Modal.setAppElement("#root");

	return (
		<>
			<BsPencil onClick={openModal} className="mx-2 text-info pointer" />
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
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
				<form id="edit-form">
					<textarea
						className="form-control"
						rows="4"
						cols="50"
						name="comment"
						form="edit-form"
						value={body}
					/>
					<input
						type="submit"
						className="btn btn-primary mt-3"
						value="Submit"
					/>
				</form>
			</Modal>
		</>
	);
};

export default EditGadget;
