import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import './addPerson.css';

const AddPerson = (props) => {
	const [personName, setPersonName] = useState('');

	const personNameChangeHandler = (event) => {
		setPersonName(event.target.value);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		var autoPersonName = personName;
		if (!personName.trim()) {
			autoPersonName = "Person" + props.personID;
			setPersonName(autoPersonName);
		}
		const newPerson = {
			name: autoPersonName,
			id: props.personID
		};
		props.setPersonID(props.personID + 1);
		props.onAddPerson(newPerson);
		setPersonName("");
	}

	return (
		<div className = "addPerson">
			<div className = "addPersonTitle">Add a new person</div>
			<form onSubmit = {submitHandler}>
				<div className = "addPersonInputField">
					<label>Person Name</label>
					<input
						type = "text"
						value = {personName}
						onChange = {personNameChangeHandler}
						placeholder = {"Person "+ props.personID}
					/>
				</div>
				<div className = "addPersonButton">
					<button type = "submit"><FaPlusCircle/></button>
				</div>
			</form>
		</div>
	);
}

export default AddPerson;