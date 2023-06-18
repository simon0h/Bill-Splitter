import React, { useState } from "react";
import ChooseWhoAte from "./ChooseWhoAte";

import './indvButton.css';
import "../BottomNavBar/bottomNavBar.css"

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
		<div className = "allItems">
			<div className = "addPersonTitle">Match people with the food they ate</div>
			<button className = "matchHelp" onClick = {handleMatchHelpClick}>Help</button>
			{showHelp && <div className = "aboutContainer">
				<div className = "aboutInner">
					<p>Click on one name if only one person ate that dish.</p>
					<p>Click on multiple names if multiple people shared that dish.</p>
					<p>In the example below, <span class="emphasize">John and Jane <u>shared</u> the fries</span>.</p>
					<p>However, <span class="emphasize"><u>only</u> Jane ate the burger</span>.</p>
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
				<li key = {item.id}>
					<div className = "indvMatchPersonFood">
						<div className = "matchName">{truncateName(item.name, 19)}</div>
						<div className = "matchPrice">Price: ${item.price}</div>
						<div className = "matchDescription">Eaten by:</div>
						<ChooseWhoAte
							key = {item.id}
							itemID = {item.id}
							people = {props.people}
							matchItemEatenBy_All = {props.matchItemEatenBy_All}
							itemEatenBy_All = {props.itemEatenBy_All}
						/>
					</div>
				</li>)
			)}
		</div>
	);
}

export default MatchPersonFood;