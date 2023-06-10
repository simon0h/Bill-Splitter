import React, { useState } from "react";
import './checkTop.css';
import { FaTimes } from "react-icons/fa";

const CheckTop = (props) => {
	let pageText = "";
	if (props.navButtonType == "next") {
		pageText = "next";
	}
	else if (props.navButtonType == "prev") {
		pageText = "previous";
	}
	else {
		pageText = "next and previous";
	}
	if (props.hideCheckTop) {
		return (<div></div>);
	}
	else {
		return(
			<div className = "tip"> 
				<p>Button to go to the {pageText} page is located on top of the page</p>
				<button className = "closeTip" onClick = {props.setHideCheckTop}><FaTimes/></button>
			</div>
		);
	}
}

export default CheckTop;