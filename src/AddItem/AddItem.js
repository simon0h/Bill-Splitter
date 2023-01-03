import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import './addItem.css';

const AddItem = (props) => {
	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState("");

	const itemNameChangeHandler = (event) => {
		setItemName(event.target.value);
	}

	const itemPriceChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Item price cannot be negative");
			setItemPrice("");
			event.target.value = 0;
		}
		else {
			setItemPrice(event.target.value);
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		let autoItemName = itemName;
		let itemPriceCheck = Math.floor(event.target[1].value * 100) / 100;
		if (!itemName.trim()) {
			autoItemName = "Item" + props.itemID;
			setItemName(autoItemName);
		}
		if (itemPrice.toString().length === 0) {
			itemPriceCheck = 0;
		}
		const newItem = {
			name: autoItemName,
			price: itemPriceCheck,
			id: props.itemID
		};
		props.setItemID(props.itemID + 1);
		props.onAddItem(newItem);
		setItemName("");
		setItemPrice("");
	}

    return (
    	<div className = "addItem">
			<div className = "addItemTitle">Add a new item</div>
			<form onSubmit = {submitHandler}>
				<div className = "addItemInputField">
					<label>Item: </label>
					<input
						type = "text"
						value = {itemName}
						onChange = {itemNameChangeHandler}
						placeholder = {" Item" + props.itemID}
						autoCapitalize = "off"
						autoComplete = "off"
						autoCorrect = "off"
					/>
				</div>
				<div className = "addItemInputField">
					<label>Price: </label>
					<input
						type = "number"
						value = {itemPrice}
						onChange = {itemPriceChangeHandler}
						placeholder = {" $0"}
						inputMode = "decimal"
						step = "0.01"
					/>
				</div>
				<div className = "addItemButton">
					<button type = "submit"><FaPlusCircle/></button>
				</div>
			</form>
    	</div>
	);
}

export default AddItem;