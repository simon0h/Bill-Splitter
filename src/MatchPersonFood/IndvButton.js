import React, { useState } from "react";
import './indvButton.css';

const IndvButton = (props) => {
	const[buttonColor, setButtonColor] = useState(props.buttonColor);
	const[selectionState, setSelectionState] = useState(props.selectionState);
	const truncateName = (name, length) => {
		if (name.length > length) {
			return (name.substring(0, length) + "...");
		}
		return name;
	}

	const onPersonSelection = (event) => {
		if (!selectionState) {
			setButtonColor("selected");
			props.addPersonWhoAte(props.id);
		}
		else {
			setButtonColor("notSelected");
			props.removePersonWhoAte(props.id);
		}
		setSelectionState(!selectionState);
	}

	return (
		<div className = "personSelect">
			<div className = {buttonColor}>
				<button onClick = {onPersonSelection}>{truncateName(props.name, 11)}</button>
			</div>
	    </div>
    );
}

export default IndvButton;