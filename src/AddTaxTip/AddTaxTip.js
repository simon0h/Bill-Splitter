import React, { useState } from "react";
import './addTaxTip.css';
import { FaSave } from "react-icons/fa";

const AddTaxTip = (props) => {
	const[tax, setTax] = useState(props.taxTip.tax);
	const[tip, setTip] = useState(props.taxTip.tip);

	const[taxButtonColor_Percent, setTaxButtonColor_Percent] = useState(props.inputTaxAsPercent);
	const[tipButtonColor_Percent, setTipButtonColor_Percent] = useState(props.inputTipAsPercent);
	
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const taxChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tax cannot be negative");
			setTax("");
		}
		else {
			setTax(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const tipChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tip cannot be negative");
			setTip("");
		}
		else {
			setTip(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const taxLabel = () => {
		if (!taxButtonColor_Percent) {
			return (["$", ""]);
		}
		return (["", "%"]);
	}

	const tipLabel = () => {
		if (!tipButtonColor_Percent) {
			return (["$", ""]);
		}
		return (["", "%"]);
	}

	const changeTaxInputType = () => {
		if (taxButtonColor_Percent) {
			setTaxButtonColor_Percent(false);
		}
		else {
			setTaxButtonColor_Percent(true);
		}
	}

	const changeTipInputType = () => {
		if (tipButtonColor_Percent) {
			setTipButtonColor_Percent(false);
		}
		else {
			setTipButtonColor_Percent(true);
		}
	}

	const changeTaxInputButton = () => {
		if (taxButtonColor_Percent) {
			return ("Enter by amount instead");
		}
		return ("Enter by percentage instead");
	}

	const changeTipInputButton = () => {
		if (tipButtonColor_Percent) {
			return ("Enter by amount instead");
		}
		return ("Enter by percentage instead");
	}
	
	const handleButtonClick = () => {
		setIsAlertVisible(true);
		setTimeout(() => {
			setIsAlertVisible(false);
		}, 1800);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.setTaxTip({tax: tax, tip: tip});
		props.setInputTaxAsPercent(taxButtonColor_Percent);
		props.setInputTipAsPercent(tipButtonColor_Percent);
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
						inputMode = "decimal"/>
					<div className = "textAndToggle">
						<div className = "toggleLable">Enter by amount </div>
						<label className="switch">
							<input type="checkbox" onClick = {changeTipInputType}></input>
							<span className="slider round"></span>
						</label>
					</div>
				</div>
				<div className = "save">
					<button onClick = {handleButtonClick} type = "submit"><FaSave/></button>
				</div>
				{isAlertVisible && <div className='alert-container'>
					<div className='alert-inner'>Saved</div>
				</div>}
			</form>
		</div>
	);
}

export default AddTaxTip;