import React , { useState } from "react";
import DividedCosts from "./DividedCosts";

import "./calculateCosts.css";

const CalculateCosts = (props) => {

	const[refresh, setRefresh] = useState("");
	const[subtotalBlankSpace, setSubtotalBlankSpace] = useState("");

	const[splitTaxButton, setSplitTaxButton] = useState(() => {
		if (props.splitTaxEvenly) {
			return("Don't split tax evenly");
		}
		return("Split tax evenly");
	});

	const[splitTipButton, setSplitTipButton] = useState(() => {
		if (props.splitTipEvenly) {
			return("Don't split tip evenly");
		}
		return ("Split tip evenly");
	});

	const[totalTax, setTotalTax] = useState(() => {
		let tax = 0;
		if (props.inputTaxAsPercent) {
			tax = (Math.floor((props.totalFoodCost * (props.taxTip.tax / 100)) * 100) / 100);
		}
		else {
			tax = props.taxTip.tax;
		}
		return(tax);
	});

	const[totalTip, setTotalTip] = useState(() => {
		let tip = 0;
		if (props.inputTipAsPercent) {
			tip = (Math.floor((props.totalFoodCost * (props.taxTip.tip / 100)) * 100) / 100);
		}
		else {
			tip = props.taxTip.tip;
		}
		return(tip);
	})

	const[costBlankSpace, setCostBlankSpace] = useState(() => {
		let blankSpaceNum = 0;
		let costLength = 0;
		const subtotal = totalTax + totalTip + props.totalFoodCost;
		let subtotalLength = 0;
		costLength = (props.totalFoodCost).toString().length;
		subtotalLength = subtotal.toString().length;
		if (Math.floor(props.totalFoodCost) !== props.totalFoodCost) {
			costLength += (props.totalFoodCost).toString().split(".")[1].length || 0;
		}
		if (Math.floor(subtotal) !== subtotal) {
			subtotalLength += (subtotal).toString().split(".")[1].length || 0;
		}
		if (costLength > subtotalLength) {
			setSubtotalBlankSpace('-'.repeat(costLength - subtotalLength));
			return("");
		}
		return('-'.repeat(subtotalLength - costLength));
	})

	const showPercentage = (type) => {
		let percentage = "";
		if (type === "tax") {
			percentage = " (" + props.taxTip.tax + "% of the total price)";
		}
		else {
			percentage = " (" + props.taxTip.tip + "% of the total price)";
		}
		return(percentage);
	}

	const onSplitTaxMethod = () => {
		if (props.splitTaxEvenly) {
			setSplitTaxButton("Split tax evenly");
			setRefresh(0);
		}
		else {
			setSplitTaxButton("Don't split tax evenly");
			setRefresh(1);
		}
		props.setSplitTaxEvenly(!props.splitTaxEvenly);
	}

	const onSplitTipMethod = () => {
		if (props.splitTipEvenly) {
			setSplitTipButton("Split tip evenly");
			setRefresh(2);
		}
		else {
			setSplitTipButton("Don't split tip evenly");
			setRefresh(3);
		}
		props.setSplitTipEvenly(!props.splitTipEvenly);
	}

	return (
		<div className = "calculateCosts">
			<div className = "displayTax">
				Tax: ${totalTax} {showPercentage("tax")}
				<div className = "textAndToggle">
					<div className = "toggleLable">Don't split tax evenly </div>
					<label className = "switch">
						<input type = "checkbox" onClick = {onSplitTaxMethod}></input>
						<span className = "slider round"></span>
					</label>
				</div>
			</div>
			<div className = "displayTip">
				Tip: ${totalTip} {showPercentage("tip")}
				<div className = "textAndToggle">
					<div className = "toggleLable">Don't split tip evenly </div>
					<label className = "switch">
						<input type = "checkbox" onClick = {onSplitTipMethod}></input>
						<span className = "slider round"></span>
					</label>
				</div>
			</div>
			<div className = "cost">Cost of food: ${props.totalFoodCost}{costBlankSpace}</div>
			<div className = "subtotal">Subtotal: ${totalTax + totalTip + props.totalFoodCost}{subtotalBlankSpace}</div>
			<DividedCosts
				key = {refresh}
				itemEatenBy_All = {props.itemEatenBy_All}
				items = {props.items}
				people = {props.people}
				totalTax = {totalTax}
				totalTip = {totalTip}
				totalFoodCost = {props.totalFoodCost}
				splitTaxEvenly = {props.splitTaxEvenly}
				splitTipEvenly = {props.splitTipEvenly}
			/>
		</div>
	);
}

export default CalculateCosts;