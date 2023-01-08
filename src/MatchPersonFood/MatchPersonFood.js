import React, { useState } from "react";
import ChooseWhoAte from "./ChooseWhoAte";

import './indvButton.css';
import "../BottomNavBar/BottomNavBar.css"

const MatchPersonFood = (props) => {

	const [showHelp, setShowHelp] = useState(false);

	const truncateName = (name, length) => {
		if (name.length > length) {
			return (name.substring(0, length) + "...");
		}
		return name;
	}

	const handleMatchHelpClick = () => {
		setShowHelp(!showHelp);
	}

	return (
		<ul className = "allItems">
			<div className = "addPersonTitle">Match people with the food they ate</div>
			<button className = "matchHelp" onClick = {handleMatchHelpClick}>Help</button>
			{showHelp && <div className = "aboutContainer">
				<div className = "aboutInner">
					<p>Click on the name of the people who ate or shared the corresponding food.</p>
					<p>In the example below, <i>John</i> and <i>Jane</i> shared the <i>fries</i>.</p>
					<p>However, only <i>Jane</i> ate the <i>burger</i>.</p>
					<div className = "indvMatchPersonFood">
						<div className = "matchName">Fries costs:</div>
						<div className = "matchPrice">$4.50</div>
						<div className = "matchDescription">and was eaten by:</div>
						<div className = "personSelect">
							<div className = "selected">
								<button>John</button>
							</div>
					    </div>
						<div className = "personSelect">
							<div className = "selected">
								<button>Jane</button>
							</div>
					    </div>
					</div>
					<div className = "indvMatchPersonFood">
						<div className = "matchName">Burger costs:</div>
						<div className = "matchPrice">$7.50</div>
						<div className = "matchDescription">and was eaten by:</div>
						<div className = "personSelect">
							<div className = "notSelected">
								<button>John</button>
							</div>
					    </div>
						<div className = "personSelect">
							<div className = "selected">
								<button>Jane</button>
							</div>
					    </div>
					</div>
					<button className = "closeAbout" onClick = {handleMatchHelpClick}>Close</button>
				</div>
			</div>}
			{props.items && props.items.map((item) => (
				<div className = "indvMatchPersonFood">
					<li key = {item.id}>
						<div className = "matchName">{truncateName(item.name, 19)} costs:</div>
						<div className = "matchPrice">${item.price}</div>
						<div className = "matchDescription">and was eaten by:</div>
						<ChooseWhoAte
							key = {item.id}
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