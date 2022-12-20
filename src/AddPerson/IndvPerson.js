import React, { useState } from "react";
import EditPerson from "./EditPerson";
import { FaTrash, FaPen } from "react-icons/fa";

import "./indvPerson.css"

const Person = (props) => {
	const [editPersonOn, setEditPersonOn] = useState(false);
	let truncatedName = props.name;
	if (props.name.length > 19) {
		truncatedName = props.name.substring(0, 19) + "...";
	}

	const editPerson = (id, newName) => {
		props.editPerson(id, newName);
	}

	const editPersonHandler = () => {
		setEditPersonOn(!editPersonOn);
	}

	const removePersonHandler = () => {
		props.removePerson(props.id);
	}

	if (editPersonOn) {
		return (
			<EditPerson
				id = {props.id}
				name = {props.name}
				editPerson = {props.editPerson}
				editPersonHandler = {editPersonHandler}
				removePersonHandler = {removePersonHandler}
			/>
		);
	}

	return (
	<li>
		<div className = "indvPerson">
			<div className = "name">{truncatedName}</div>
			<div className = "actionButtons">
				<div className = "remove">
					<button onClick = {removePersonHandler}><FaTrash/></button>
				</div>
				<div className = "edit">
					<button onClick = {editPersonHandler}><FaPen/></button>
				</div>
			</div>
		</div>
	</li>
	);
}

export default Person;