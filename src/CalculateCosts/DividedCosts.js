import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import "./dividedCosts.css";

const DividedCosts = (props) => {

	const[showMoreDetail, setShowMoreDetail] = useState(false);
	const[sharedItems, setSharedItems] = useState({});
	const[taxAndTip, setTaxAndTip] = useState({});

	const fillPersonObject = () => {
		let tempPersonObj = {};
		for (let i in props.people) {
			tempPersonObj[props.people[i]["id"]] = props.people[i]["name"];
		}
		return tempPersonObj;
	}

	const[personObject, setPersonObject] = useState(() => {
		const initialState = fillPersonObject();
		return initialState;
	});

	const fillItemObject = () => {
		let tempItemObj = {};
		for (let i in props.items) {
			tempItemObj[props.items[i]["id"]] = [props.items[i]["name"], props.items[i]["price"]];
		}
		return tempItemObj;
	}

	const[itemObject, setItemObject] = useState(() => {
		const initialState = fillItemObject();
		return initialState;
	});

	const fillInvoice = () => {
		let tempPersonObj = {}; //{personID: name, personID: name}
		let tempItemObj = {}; //{itemID: [name, price], itemID: [name, price]}
		let tempAllInvoices = {}; //{personID: [itemID, 2, 3], personID: [itemID, 2, 3]}
		for (let i in props.people) {
			tempPersonObj[props.people[i]["id"]] = props.people[i]["name"];
			tempAllInvoices[props.people[i]["id"]] = [];
		}
		for (let i in props.items) {
			tempItemObj[props.items[i]["id"]] = [props.items[i]["name"], props.items[i]["price"]];
		}
		setItemObject(tempItemObj);
		setPersonObject(tempPersonObj);
		for (let i in props.itemEatenBy_All) {
			for (let ii in props.itemEatenBy_All[i]["peopleID"]) {
				let personID = props.itemEatenBy_All[i]["peopleID"][ii];
				tempAllInvoices[personID].push(props.itemEatenBy_All[i]["itemID"]);
			}
		}
		return tempAllInvoices;
	};

	const[allInvoices, setAllInvoices] = useState(() => {
		const initialState = fillInvoice();
		return initialState;
	});

	const fillPeople = () => {
		//invoice = {personID: [personName, owes, tax, tip]}
		//itemEatenBy_All = [{itemID: 1, peopleID: [2]}, {itemID: 2, peopleID: [1]}, {itemID: 3, peopleID: [2]}]
		//items = [{name: "Item3", price: 20, id: 3}, {name: "Item2", price: 15, id: 2}, {name: "Item1", price: 10, id: 1}]
		//person = [{name: "Person2", id: 2}, {name: "Person1", id: 1}]
		let tempPersonObj = {}; //{personID: name, personID: name}
		let tempItemObj = {}; //{itemID: [name, price], itemID: [name, price]}
		let tempSharedItem = {};//{itemID: numShared}
		let tempAllInvoices = {}; //{personID: [itemID, 2, 3], personID: [itemID, 2, 3]}
		let tempTaxAndTip = {}; //{personID: [tax, tip]}
		for (let i in props.people) {
			tempPersonObj[props.people[i]["id"]] = props.people[i]["name"];
			tempAllInvoices[props.people[i]["id"]] = [];
		}
		for (let i in props.items) {
			tempItemObj[props.items[i]["id"]] = [props.items[i]["name"], props.items[i]["price"]];
		}
		// setItemObject(tempItemObj);
		// setPersonObject(tempPersonObj);
		for (let i in props.itemEatenBy_All) {
			for (let ii in props.itemEatenBy_All[i]["peopleID"]) {
				let personID = props.itemEatenBy_All[i]["peopleID"][ii];
				tempAllInvoices[personID].push(props.itemEatenBy_All[i]["itemID"]);
			}
			tempSharedItem[props.itemEatenBy_All[i]["itemID"]] = props.itemEatenBy_All[i]["peopleID"].length;
		}
		setSharedItems(tempSharedItem);
		//setAllInvoices(tempAllInvoices);
		let invoiceArray = [];
		for (let i in tempAllInvoices) {
			let personID = i;
			let invoice = {"id": personID, "name": tempPersonObj[personID], "tax": 0, "tip": 0, "owes": 0};
			let tax = 0;
			let tip = 0;
			let owes = 0;
			for (let ii in tempAllInvoices[i]) {
				let itemID = tempAllInvoices[i][ii];
				let itemPrice = tempItemObj[itemID][1] / tempSharedItem[itemID];
				owes += itemPrice;
			}
			if (props.splitTaxEvenly) {
				tax = (props.totalTax / props.people.length);
				owes += tax;
			}
			else {
				tax = (props.totalTax * (owes/ props.totalFoodCost));
				owes += tax;
			}
			if (props.splitTipEvenly) {
				tip = (props.totalTip / props.people.length);
				owes += tip;
			}
			else {
				tip = (props.totalTip * (owes / props.totalFoodCost));
				owes += tip;
			}
			tempTaxAndTip[personID] = [tax, tip];
			setTaxAndTip(tempTaxAndTip);
			invoice["owes"] = owes;
			invoiceArray.push(invoice);
		}
		return invoiceArray;
	}

	const[thisPersonOwes, setThisPersonOwes] = useState(() => {
		const initialState = fillPeople();
		return initialState;
	});

	const getDetail = () => {
		let invoiceArray = []; //[{personID: id, name: name, items: []}]
		for (let i in allInvoices) {
			invoiceArray.push({"id": i, "name": personObject[i], "items": allInvoices[i]});
		}
		return invoiceArray;
	}

	const[thisPersonOwesDetail, setThisPersonOwesDetail] = useState(() => {
		const initialState = getDetail();
		return initialState;
	});

	const showMore = () => {
		setShowMoreDetail(!showMoreDetail);
	}

	if (!showMoreDetail) {
		return (
			<div className = "dividedCosts">
				{thisPersonOwes && thisPersonOwes.map((person) => (
					<li key = {person.id}>
						<div>{person.name} owes ${person.owes}</div>
					</li>)
				)}
				<div className = "moreDetail">
					<button onClick = {showMore}><BiChevronDown/></button>
				</div>
			</div>
		);
	}

	else {
		return (
			<div className = "dividedCosts">
				{thisPersonOwes && thisPersonOwes.map((person) => (
					<li key = {person.id}>
						<div>{person.name} owes ${person.owes}</div>
					</li>)
				)}
				{thisPersonOwesDetail && thisPersonOwesDetail.map((person) => (
					<li key = {person.id}>
						<div className = "ate">
							<div>Details for {person.name}:</div>
							<div> {person.items && person.items.map((itemID) => (
								<ul key = {person.id + person.name + itemID}>
									<div>{itemObject[itemID][0]}: ${itemObject[itemID][1] / sharedItems[itemID]}</div>
								</ul>)
								)}
							</div>
							<div>Tax: ${taxAndTip[person.id][0]}</div>
							<div>Tip: ${taxAndTip[person.id][1]}</div>
						</div>
					</li>)
				)}
				<div className = "moreDetail">
					<button onClick = {showMore}><BiChevronUp/></button>
				</div>
			</div>
		);
	}
}

export default DividedCosts
