import React, { useState } from "react";
import ChooseWhoAte from "./ChooseWhoAte";

import './indvButton.css';

const MatchPersonFood = (props) => {

	const truncateName = (name) => {
		let truncatedName = name;
		if (name.length > 19) {
			truncatedName = name.substring(0, 19) + "...";
		}
		return(truncatedName);
	}

	return (
		<ul className = "allItems">
			{props.items && props.items.map((item) => (
				<div className = "indvMatchPersonFood">
					<li key = {item.id}>
						<div className = "matchName">{truncateName(item.name)}</div>
						<div className = "matchPrice">${item.price}</div>
						<ChooseWhoAte
							itemID = {item.id}
							people = {props.people}
							matchItemEatenBy_All = {props.matchItemEatenBy_All}
							itemEatenBy_All = {props.itemEatenBy_All}
						/>
					</li>
				</div>)
			)}
		</ul>
	);
}

export default MatchPersonFood;