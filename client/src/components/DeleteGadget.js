import React from "react";
import Modal from "react-modal";
import { BsTrash } from "react-icons/bs";

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

const DeleteGadget = ({ id }) => {
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
			<BsTrash onClick={openModal} className="text-danger pointer" />
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<div className="mb-4">
					<h2 className="d-inline">Delete feedback</h2>
					<button
						className="btn btn-danger float-right ml-4 py-1"
						onClick={closeModal}
					>
						X
					</button>
				</div>
				<form id="edit-form">
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

export default DeleteGadget;
