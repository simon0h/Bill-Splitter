import React, { useState } from "react";
import './addTaxTip.css';
import { FaSave } from "react-icons/fa";

const AddTaxTip = (props) => {
	const [tax, setTax] = useState(props.taxTip.tax);
	const [tip, setTip] = useState(props.taxTip.tip);

	const [inputTaxAsPercent, setInputTaxAsPercent] = useState(props.inputTaxAsPercent);
	const [inputTipAsPercent, setInputTipAsPercent] = useState(props.inputTipAsPercent);
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const truncateDecimal = (num) => {
		return (Math.floor(num * 100) / 100);
	}

	const taxChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tax cannot be negative");
			setTax("");
			event.target.value = 0;
		}
		else {
			setTax(event.target.value);
		}
	}

	const tipChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tip cannot be negative");
			setTip("");
			event.target.value = 0;
		}
		else {
			setTip(event.target.value);
		}
	}

	const taxLabel = () => {
		if (!inputTaxAsPercent) {
			return (["$", ""]);
		}
		return (["", "%"]);
	}

	const tipLabel = () => {
		if (!inputTipAsPercent) {
			return (["$", ""]);
		}
		return (["", "%"]);
	}

	const changeTaxInputType = () => {
		setTax(0);
		setInputTaxAsPercent(!inputTaxAsPercent);
	}

	const changeTipInputType = () => {
		setTip(0);
		setInputTipAsPercent(!inputTipAsPercent);
	}

	const saveClickHandler = (event) => {
		setIsAlertVisible(true);
		setTimeout(() => {
			setIsAlertVisible(false);
		}, 1800);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.setTaxTip({tax: truncateDecimal(event.target[0].value), tip: truncateDecimal(event.target[2].value)});
		props.setInputTaxAsPercent(inputTaxAsPercent);
		props.setInputTipAsPercent(inputTipAsPercent);
	}

    return (
		<div className = "addTaxTip">
			<form onSubmit = {submitHandler}>
				<div className = "addTaxTipInputField">
					<label>Tax: </label>
					<input
						type = "number"
						onChange = {taxChangeHandler}
						placeholder = {" " + taxLabel()[0] + tax + taxLabel()[1]}
						inputMode = "decimal"
						step = "any"
					/>
					<div className = "textAndToggle">
						<div className = "toggleLable">Enter by amount </div>
						<label className = "switch">
							<input type = "checkbox" checked = {!inputTaxAsPercent} onChange = {changeTaxInputType} onClick = {changeTaxInputType}></input>
							<span className = "slider round"></span>
						</label>
					</div>
				</div>
    			<div className = "addTaxTipInputField">
					<label>Tip: </label>
					<input
						type = "number"
						onChange = {tipChangeHandler}
						placeholder = {" " + tipLabel()[0] + tip + tipLabel()[1]}
						inputMode = "decimal"
						step = "any"
					/>
					<div className = "textAndToggle">
						<div className = "toggleLable">Enter by amount </div>
						<label className="switch">
							<input type="checkbox" checked = {!inputTipAsPercent} onChange = {changeTipInputType} onClick = {changeTipInputType}></input>
							<span className="slider round"></span>
						</label>
					</div>
				</div>
				<div className = "save">
					<button onClick = {saveClickHandler} type = "submit"><FaSave/></button>
				</div>
				{isAlertVisible &&
					<div className = "alertContainer">
						<div className = "alertInner">Saved</div>
					</div>
				}
			</form>
		</div>
	);
}

export default AddTaxTip;