import React, { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import "./editItem.css";

const EditItem = (props) => {
	const [newName, setNewName] = useState(props.name);
	const [newPrice, setNewPrice] = useState(props.price);

	const editItemDoneHandler = () => {
		props.editItemHandler();
	}

	const itemNameChangeHandler = (event) => {
		setNewName(event.target.value);
	}

	const itemPriceChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Item price cannot be negative");
			setNewPrice("");
		}
		else {
			setNewPrice(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.editItem(props.id, newName, newPrice);
		editItemDoneHandler();
	}

	const removeItemHandler = () => {
		props.removeItemHandler();
	}

	return (
		<li>
			<div className = "editItem">
    			<form onSubmit = {submitHandler}>
					<div className = "cancelChanges">
						<button onClick = {editItemDoneHandler}><IoClose/></button>
					</div>
					<div className = "item">
						<input
							type = "text"
							value = {newName}
							onChange = {itemNameChangeHandler}
						/>
					</div>
					<div className = "item">
						<input
							type = "number"
							min = "0.01"
							step = "0.01"
							value = {newPrice}
							onChange = {itemPriceChangeHandler}
						/>
					</div>
    				<div className = "saveChannges">
    					<button type = "submit"><FaSave/></button>
    				</div>
    				<div className = "removeItem">
    					<button onClick = {removeItemHandler}><FaTrash/></button>
    				</div>
    			</form>
			</div>
		</li>
	);
}

export default EditItem;