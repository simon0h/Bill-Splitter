import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FiChevronsDown } from "react-icons/fi";

import "./dividedCosts.css";

const DividedCosts = (props) => {

	const[showMoreDetail, setShowMoreDetail] = useState(false);
	const[sharedItems, setSharedItems] = useState({});
	const[taxAndTip, setTaxAndTip] = useState({});

	const truncateName = (name, length) => {
		if (name.length > length) {
			return (name.substring(0, length) + "...");
		}
		return name;
	}

	const truncateDecimal = (num) => {
		return (Math.floor(num * 100) / 100);
	}

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
				if (personID in tempAllInvoices) {
					tempAllInvoices[personID].push(props.itemEatenBy_All[i]["itemID"]);
				}
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
		for (let i in props.itemEatenBy_All) {
			for (let ii in props.itemEatenBy_All[i]["peopleID"]) {
				let personID = props.itemEatenBy_All[i]["peopleID"][ii];
				if (personID in tempAllInvoices) {
					tempAllInvoices[personID].push(props.itemEatenBy_All[i]["itemID"]);
				}
			}
			tempSharedItem[props.itemEatenBy_All[i]["itemID"]] = props.itemEatenBy_All[i]["peopleID"].length;
		}
		setSharedItems(tempSharedItem);
		let invoiceArray = [];
		for (let i in tempAllInvoices) {
			let personID = i;
			let invoice = {"id": personID, "name": tempPersonObj[personID], "tax": 0, "tip": 0, "owes": 0};
			let tax = 0;
			let tip = 0;
			let owes = 0;
			for (let ii in tempAllInvoices[i]) {
				let itemID = tempAllInvoices[i][ii];
				let itemPrice = 0;
				if (itemID in tempItemObj) {
					itemPrice = tempItemObj[itemID][1] / tempSharedItem[itemID];
				}
				owes += itemPrice;
			}
			if (props.splitTaxEvenly) {
				if (props.people.length > 0) {
					tax = (props.totalTax / props.people.length);
					owes += tax;
				}
			}
			else {
				if (props.totalFoodCost > 0) {
					tax = (props.totalTax * (owes / props.totalFoodCost));
					owes += tax;
				}
			}
			if (props.splitTipEvenly) {
				if (props.people.length > 0) {
					tip = (props.totalTip / props.people.length);
					owes += tip;
				}
			}
			else {
				if (props.totalFoodCost > 0) {
					tip = (props.totalTip * (owes / props.totalFoodCost));
					owes += tip;
				}
			}
			if (tax === 69 || tip === 69 || owes === 69) {
				console.log("nice");
			}
			tempTaxAndTip[personID] = [truncateDecimal(tax), truncateDecimal(tip)];
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
				{thisPersonOwesDetail.length > 0 &&
					<hr/>
				}
				{thisPersonOwes && thisPersonOwes.map((person) => (
					<li key = {person.id}>
						<div className = "personOwes">{truncateName(person.name, 15)} owes ${truncateDecimal(person.owes)}</div>
					</li>)
				)}
				{thisPersonOwesDetail.length > 0 &&
				<div className = "moreDetail">
					<button onClick = {showMore}><BiChevronDown/></button>
				</div>}
			</div>
		);
	}

	else {
		return (
			<div className = "dividedCosts">
				<hr/>
				{thisPersonOwes && thisPersonOwes.map((person) => (
					<li key = {person.id}>
						<div className = "personOwes">{truncateName(person.name, 15)} owes ${person.owes}</div>
					</li>)
				)}
				<div className = "moreDetail">
					<button onClick = {showMore}><BiChevronUp/></button>
				</div>
				{thisPersonOwesDetail && thisPersonOwesDetail.map((person) => (
					<li key = {person.id}>
						<div className = "ate">
							<div className = "detailHeader">Details for {truncateName(person.name, 15)}:</div>
							<hr/>
							<div> {person.items && person.items.map((itemID) => (
								<ul key = {person.id + person.name + itemID}>
									<div>{truncateName(itemObject[itemID][0], 15)}: ${truncateDecimal(itemObject[itemID][1] / sharedItems[itemID])}</div>
								</ul>)
								)}
							</div>
							<div>Tax: ${taxAndTip[person.id][0]}</div>
							<div>Tip: ${taxAndTip[person.id][1]}</div>
						</div>
					</li>)
				)}
			</div>
		);
	}
}

export default DividedCosts
