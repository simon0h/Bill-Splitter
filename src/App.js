import React, { useState } from "react";
import AddTaxTip from "./AddTaxTip/AddTaxTip"
import AddItem from "./AddItem/AddItem";
import AllItems from "./AddItem/AllItems";
import AddPerson from "./AddPerson/AddPerson";
import AllPeople from "./AddPerson/AllPeople";
import MatchPersonFood from "./MatchPersonFood/MatchPersonFood";
import CalculateCosts from "./CalculateCosts/CalculateCosts";
import BottomNavBar from "./BottomNavBar/BottomNavBar";
import CheckTop from "./CheckTop/CheckTop";
import "./App.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const App = () => {
	const [screen, setScreen] = useState(0);

	const [taxTip, setTaxTip] = useState({tax: 0, tip: 0});
	const [inputTipAsPercent, setInputTipAsPercent] = useState(true);
	const [inputTaxAsPercent, setInputTaxAsPercent] = useState(true);

	const [totalFoodCost, setTotalFoodCost] = useState(0);

	const [items, setItems] = useState(""); // Change to a dict
	const [people, setPerson] = useState(""); // Change to a dict

	const [numItems, setNumItems] = useState(0);
	const [numPeople, setNumPeople] = useState(0);

	const [itemID, setItemID] = useState(1);
	const [personID, setPersonID] = useState(1);

	const [itemEatenBy_All, setItemEatenBy_All] = useState("");

	const [splitTipEvenly, setSplitTipEvenly] = useState(true);
	const [splitTaxEvenly, setSplitTaxEvenly] = useState(true);

	const [hideCheckTop, setHideCheckTop] = useState(false);

	const addNewItem = (newItem) => {
		setTotalFoodCost(prevState => prevState + newItem.price);
		setNumItems(numItems + 1);
		if (numItems > 100) {
			setNumItems(100);
			window.alert("Number of items cannot exceed 100");
		}
		else {
			setItems((prevItems) => {
				return [newItem, ...prevItems];
			});
			setItemEatenBy_All(itemEatenBy_All => [...itemEatenBy_All, {itemID: newItem.id, peopleID: []}]);
		}
	}

	const editItem = (id, newName, newPrice) => {
		editNamePrice(id, newName, newPrice); // Optimization: if statement to check which one changed
	}

	const editNamePrice = (id, newName, newPrice) => {
		const newList = items.map((item) => {
	      if (item.id === id) {
	        const updatedItem = {
	          ...item,
	          name: newName,
	          price: newPrice,
	        };
	        return updatedItem;
	      }
	      return item;
	    });
	    setItems(newList);
	}

	const removeItem = (id, price) => {
		setTotalFoodCost(totalFoodCost - price);
		setNumItems(numItems - 1);
		const newList = items.filter((item) => item.id !== id);
    	setItems(newList);
	}

	const addNewPerson = (newPerson) => {
		setNumPeople(numPeople + 1);
		if (numPeople > 50) {
			setNumPeople(50);
			window.alert("Number of items cannot exceed 50");
		}
		else {
			setPerson((prevPeople) => {
				return [newPerson, ...prevPeople];
			});
		}
	}

	const editPerson = (id, newName) => {
		editPersonName(id, newName); // Optimization: if statement to check which one changed
	}

	const editPersonName = (id, newName) => {
		const newList = people.map((person) => {
	      if (person.id === id) {
	        const updatedPeople = {
	          ...person,
	          name: newName,
	        };
	        return updatedPeople;
	      }
	      return person;
	    });
	    setPerson(newList);
	}

	const removePerson = (id) => {
		setNumPeople(numPeople - 1);
		const newList = people.filter((person) => person.id !== id);
    	setPerson(newList);
    	removePersonItemEatenBy_All(id);
	}

	const removePersonItemEatenBy_All = (personID) => {
		const newItemEatenBy_All = itemEatenBy_All.map((obj) => {
			let tempArray = (obj.peopleID).filter((person) => person !== personID);
			return {itemID: obj.itemID, peopleID: tempArray};
		});
		setItemEatenBy_All(newItemEatenBy_All);
	}

	const matchItemEatenBy_All = (itemID, thisItemEatenBy) => {
		const newItemEatenBy_All = itemEatenBy_All.map((obj) => {
			if (obj.itemID === itemID) {
				return {itemID: itemID, peopleID: thisItemEatenBy};
			}
			else {
				return obj;
			}
		});
		setItemEatenBy_All(newItemEatenBy_All);
	}

	const prevScreen = () => {
		setScreen(screen - 1);
	}

	const nextScreen = () => {
		setScreen(screen + 1);
	}

	if (screen === 0) {
		return (
	    	<div className="App">
	    		<div className = "singleButton">
	    			<button type = "submit" onClick = {nextScreen}><FaArrowRight/></button>
				</div>
	    		<AddTaxTip
	    			taxTip = {taxTip}
	    			setTaxTip = {setTaxTip}
	    			inputTaxAsPercent = {inputTaxAsPercent}
	    			inputTipAsPercent = {inputTipAsPercent}
	    			setInputTaxAsPercent = {setInputTaxAsPercent}
	    			setInputTipAsPercent = {setInputTipAsPercent}
	    		/>
	    		<AddItem
	    			onAddItem = {addNewItem}
	    			itemID = {itemID}
	    			setItemID = {setItemID}
	    		/>
	    		<AllItems
	    			items = {items}
	    			editItem = {editItem}
	    			removeItem = {removeItem}
	    		/>
	    		<CheckTop
	    			navButtonType = {"next"}
	    			hideCheckTop = {hideCheckTop}
	    			setHideCheckTop = {setHideCheckTop}
	    		/>
				<BottomNavBar/>
	    	</div>
		);
	}

	else if (screen === 1) {
		return (
	    	<div className="App">
	    		<div className = "doubleButton">
					<div className = "back">
	    				<button type = "submit" onClick = {prevScreen}><FaArrowLeft/></button>
					</div>
					<div className = "next">
	    				<button type = "submit" onClick = {nextScreen}><FaArrowRight/></button>
					</div>
				</div>
    			<AddPerson
    				onAddPerson = {addNewPerson}
    				personID = {personID}
    				setPersonID = {setPersonID}
    			/>
    			<AllPeople
    				people = {people}
    				editPerson = {editPerson}
    				removePerson = {removePerson}
    			/>
    			<CheckTop
	    			navButtonType = {"both"}
	    			hideCheckTop = {hideCheckTop}
	    			setHideCheckTop = {setHideCheckTop}
	    		/>
				<BottomNavBar/>
	    	</div>
		);
	}

	else if (screen === 2) {
		return (
	    	<div className="App">
	    		<div className = "doubleButton">
					<div className = "back">
	    				<button type = "submit" onClick = {prevScreen}><FaArrowLeft/></button>
					</div>
					<div className = "next">
	    				<button type = "submit" onClick = {nextScreen}><FaArrowRight/></button>
					</div>
				</div>
    			<MatchPersonFood
    				items = {items}
    				people = {people}
    				itemEatenBy_All = {itemEatenBy_All}
    				matchItemEatenBy_All = {matchItemEatenBy_All}
    			/>
    			<CheckTop
	    			navButtonType = {"both"}
	    			hideCheckTop = {hideCheckTop}
	    			setHideCheckTop = {setHideCheckTop}
	    		/>
				<BottomNavBar/>
	    	</div>
		);
	}

	else {
		return (
	    	<div className="App">
	    		<div className = "singleButton">
	    			<button type = "submit" onClick = {prevScreen}><FaArrowLeft/></button>
	    		</div>
    			<CalculateCosts
    				items = {items}
					people = {people}
					itemEatenBy_All = {itemEatenBy_All}
					taxTip = {taxTip}
					inputTaxAsPercent = {inputTaxAsPercent}
					inputTipAsPercent = {inputTipAsPercent}
					totalFoodCost = {totalFoodCost}
					splitTaxEvenly = {splitTaxEvenly}
					splitTipEvenly = {splitTipEvenly}
					setSplitTaxEvenly = {setSplitTaxEvenly}
					setSplitTipEvenly = {setSplitTipEvenly}
    			/>
    			<CheckTop
	    			navButtonType = {"prev"}
	    			hideCheckTop = {hideCheckTop}
	    			setHideCheckTop = {setHideCheckTop}
	    		/>
	    		<BottomNavBar/>
			</div>
		);
	}
}

export default App;
