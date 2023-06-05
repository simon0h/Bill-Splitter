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
			event.target.value = 0;
		}
		else {
			setNewPrice(event.target.value);
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.editItem(props.id, newName, Math.floor(newPrice * 100) / 100);
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
							class = "edit"
							type = "text"
							value = {newName}
							onChange = {itemNameChangeHandler}
							autoCapitalize = "off"
							autoComplete = "off"
							autoCorrect = "off"
						/>
					</div>
					<div className = "item">
						<input
							class = "edit"
							type = "number"
							value = {newPrice}
							onChange = {itemPriceChangeHandler}
							inputMode = "decimal"
							step = "0.01"
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