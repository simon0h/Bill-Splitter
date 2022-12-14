import React, { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import "./editPerson.css";

const EditPerson = (props) => {
	const [newName, setNewName] = useState(props.name);
	const [newPrice, setNewPrice] = useState(props.price);

	const editPersonDoneHandler = () => {
		props.editPersonHandler();
	}

	const personNameChangeHandler = (event) => {
		setNewName(event.target.value);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.editPerson(props.id, newName);
		editPersonDoneHandler();
	}

	const removePersonHandler = () => {
		props.removePersonHandler();
	}

	return (
		<li>
			<div className = "editPerson">
				<form onSubmit = {submitHandler}>
					<div className = "cancelChanges">
						<button onClick = {editPersonDoneHandler}><IoClose/></button>
					</div>
					<div className = "person">
						<input
							type = "text"
							value = {newName}
							onChange = {personNameChangeHandler}
						/>
					</div>
					<div className = "saveChanges">
						<button type = "submit"><FaSave/></button>
					</div>
					<div className = "removePerson">
						<button onClick = {removePersonHandler}><FaTrash/></button>
					</div>
				</form>
			</div>
		</li>
	);
}

export default EditPerson;