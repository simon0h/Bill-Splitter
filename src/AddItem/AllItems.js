import React from "react";
import Item from "./IndvItem";

import './allItems.css';

const allItems = (props) => {

	const editItem = (id, newName, newPrice) => {
		props.editItem(id, newName, newPrice);
	}

	const removeItem = (id, price) => {
    	props.removeItem(id, price);
	}

	return (
		<ul className = "allItems">
			{props.items && props.items.map((item) =>
				(<Item
					key = {item.id}
					name = {item.name}
					price = {item.price}
					id = {item.id}
					editItem = {editItem}
					removeItem = {removeItem}
				/>)
			)}
		</ul>
	);
}

export default allItems;