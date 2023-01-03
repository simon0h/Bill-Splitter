import React, { useState } from "react";
import './addTaxTip.css';
import { FaSave } from "react-icons/fa";

const AddTaxTip = (props) => {
	const [tax, setTax] = useState(props.taxTip.tax);
	const [tip, setTip] = useState(props.taxTip.tip);

	// const [inputTaxAsPercent, setInputTaxAsPercent] = useState(props.inputTaxAsPercent);
	// const [inputTipAsPercent, setInputTipAsPercent] = useState(props.inputTipAsPercent);
	const [inputTaxAsPercent, setInputTaxAsPercent] = useState(true);
	const [inputTipAsPercent, setInputTipAsPercent] = useState(true);

	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const taxChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tax cannot be negative");
			setTax("");
			event.target.value = 0;
		}
		else if (event.target.value !== 0 && event.target.value < 0.01 && inputTaxAsPercent) {
			window.alert("Tax must be greater than or equal to 0.01%");
			setTax("");
			event.target.value = 0;
		}
		else {
			setTax(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const tipChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tip cannot be negative");
			setTip("");
			event.target.value = 0;
		}
		else if (event.target.value !== 0 && event.target.value < 0.01 && inputTipAsPercent) {
			window.alert("Tip must be greater than or equal to 0.01%");
			setTip("");
			event.target.value = 0;
		}
		else {
			setTip(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
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
		if (inputTaxAsPercent) {
			setInputTaxAsPercent(false);
		}
		else {
			setInputTaxAsPercent(true);
		}
	}

	const changeTipInputType = () => {
		setTip(0);
		if (inputTipAsPercent) {
			setInputTipAsPercent(false);
		}
		else {
			setInputTipAsPercent(true);
		}
	}

	const saveClickHandler = (event) => {
		setIsAlertVisible(true);
		setTimeout(() => {
			setIsAlertVisible(false);
		}, 1800);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.setTaxTip({tax: tax, tip: tip});
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
							<input type = "checkbox" onClick = {changeTaxInputType}></input>
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
							<input type="checkbox" onClick = {changeTipInputType}></input>
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