import React, { useState } from "react";
import EditItem from "./EditItem";
import { FaTrash, FaPen } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import "./indvItem.css"

const Item = (props) => {
	const [editItemOn, setEditItemOn] = useState(false);

	const truncateName = (name, length) => {
		if (name.length > length) {
			return (name.substring(0, length) + "...");
		}
		return name;
	}

	const editItem = (id, newName, newPrice) => {
		props.editItem(id, newName, newPrice);
	}

	const editItemHandler = () => {
		setEditItemOn(!editItemOn);
	}

	const removeItemHandler = () => {
		props.removeItem(props.id, props.price);
	}

	if (editItemOn) {
		return (
			<EditItem
				id = {props.id}
				name = {props.name}
				price = {props.price}
				editItem = {props.editItem}
				editItemHandler = {editItemHandler}
				removeItemHandler = {removeItemHandler}
			/>
		);
	}

 	return (
    	<li>
			<div className = "indvItem">
				<div className = "itemName">{truncateName(props.name, 19)}</div>
				<div className = "price">{"$" + props.price}</div>
				<div className = "more">
					<button onClick = {editItemHandler}><BsThreeDots/></button>
				</div>
			</div>
    	</li>
  	);
}

export default Item;