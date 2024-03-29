import React , { useState } from "react";
import DividedCosts from "./DividedCosts";
import { BsThreeDots } from "react-icons/bs";

import "./calculateCosts.css";

const CalculateCosts = (props) => {

	const [refresh, setRefresh] = useState("");
	const [subtotalBlankSpace, setSubtotalBlankSpace] = useState("");
	const [showSplitEvenlyToggle, setShowSplitEvenlyToggle] = useState(false);

	const truncateDecimal = (num) => {
		return (Math.floor(num * 100) / 100);
	}

	const[splitTaxButton, setSplitTaxButton] = useState(() => {
		if (props.splitTaxEvenly) {
			return ("Don't split tax evenly");
		}
		return ("Split tax evenly");
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
			tax = truncateDecimal(props.totalFoodCost * props.taxTip.tax / 100);
		}
		else {
			tax = props.taxTip.tax;
		}
		return (tax);
	});

	const[totalTip, setTotalTip] = useState(() => {
		let tip = 0;
		if (props.inputTipAsPercent) {
			tip = truncateDecimal(props.totalFoodCost * props.taxTip.tip / 100);
		}
		else {
			tip = props.taxTip.tip;
		}
		return (tip);
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
		return ('-'.repeat(subtotalLength - costLength));
	})

	const showPercentage = (amount, totalAmount, inputAsPercent) => {
		let percentage = "";
		if (totalAmount === 0 || props.totalFoodCost === 0) {
			percentage = "";
		}
		else {
			if (inputAsPercent) {
				percentage = " (" + amount + "%)";
			}
			else {
				percentage = " (" + truncateDecimal(totalAmount / props.totalFoodCost * 100) + "%)";
			}
		}
		return (percentage);
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

	const handleShowSplitEvenlyToggle = () => {
		setShowSplitEvenlyToggle(!showSplitEvenlyToggle);
	}

	return (
		<div className = "calculateCosts">
			<div className = "displayTandT">
				Tax: ${totalTax} {showPercentage(props.taxTip.tax, totalTax, props.inputTaxAsPercent)}
			</div>
			<div className = "displayTandT">
				Tip: ${totalTip} {showPercentage(props.taxTip.tip, totalTip, props.inputTipAsPercent)}
			</div>
			<div className = "showSplitEvenlyToggleButton">
				<button onClick = {handleShowSplitEvenlyToggle}><BsThreeDots/></button>
			</div>
			{showSplitEvenlyToggle && <div className = "splitEvenlyToggle">
				<div className = "textAndToggle">
					<div className = "toggleLable">Don't split tax evenly </div>
					<label className = "switch">
						<input type = "checkbox" onClick = {onSplitTaxMethod}></input>
						<span className = "slider round"></span>
					</label>
				</div>
				<div className = "textAndToggle">
					<div className = "toggleLable">Don't split tip evenly </div>
					<label className = "switch">
						<input type = "checkbox" onClick = {onSplitTipMethod}></input>
						<span className = "slider round"></span>
					</label>
				</div>
			</div>}
			<div className = "cost">Cost of food: ${truncateDecimal(props.totalFoodCost)}{/*{costBlankSpace}*/}</div>
			<div className = "subtotal">Subtotal: ${truncateDecimal(totalTax + totalTip + props.totalFoodCost)}</div>
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
{/*			<div className = "exportText">
				<button><FiShare/></button>
			</div>*/}
		</div>
	);
}

export default CalculateCosts;