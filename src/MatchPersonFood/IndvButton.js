import React, { useState } from "react";
import './indvButton.css';

const IndvButton = (props) => {
	const[buttonColor, setButtonColor] = useState(props.buttonColor);
	const[selectionState, setSelectionState] = useState(props.selectionState);
	let truncatedName = props.name.substring(0, 11);
	if (props.name.length > 11) {
		truncatedName += "...";
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
				<button onClick = {onPersonSelection}>{truncatedName}</button>
			</div>
	    </div>
    );
}

export default IndvButton;