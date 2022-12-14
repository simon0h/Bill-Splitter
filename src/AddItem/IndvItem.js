import React, { useState } from "react";
import EditItem from "./EditItem";
import { FaTrash, FaPen } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import "./indvItem.css"

const Item = (props) => {
	const [editItemOn, setEditItemOn] = useState(false);
	const [showMore, setShowMore] = useState(false);

	const editItem = (id, newName, newPrice) => {
		props.editItem(id, newName, newPrice);
	}

	const editItemHandler = () => {
		setEditItemOn(!editItemOn);
	}

	const removeItemHandler = () => {
		props.removeItem(props.id, props.price);
	}

	const showMoreHandler = () => {
		setShowMore(!showMore);
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

	if (showMore) {
		return (
			<li>
				<div className = "indvItemMore">
					<div className = "name">{props.name}</div>
					<div className = "price">{"$" + props.price}</div>
					<div className = "less">
						<button onClick = {showMoreHandler}><IoClose/></button>
					</div>
					<div className = "actionButtons">
						<div className = "remove">
							<button onClick = {removeItemHandler}><FaTrash/></button>
						</div>
						<div className = "edit">
							<button onClick = {editItemHandler}><FaPen/></button>
						</div>
					</div>
				</div>
			</li>
		);
	}

 	return (
    	<li>
			<div className = "indvItem">
				<div className = "name">{props.name}</div>
				<div className = "price">{"$" + props.price}</div>
				<div className = "more">
					<button onClick = {showMoreHandler}><BsThreeDots/></button>
				</div>
			</div>
    	</li>
  	);
}

export default Item;