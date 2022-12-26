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
			<div className = "addPersonTitle">Match people with the food they ate</div>
			{props.items && props.items.map((item) => (
				<div className = "indvMatchPersonFood">
					<li key = {item.id}>
						<div className = "matchName">{truncateName(item.name)} costs:</div>
						<div className = "matchPrice">${item.price}</div>
						<div className = "matchDescription">and was eaten by:</div>
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