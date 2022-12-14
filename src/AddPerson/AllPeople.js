import React from "react";
import IndvPerson from "./IndvPerson";

const allPeople = (props) => {

	const editPerson = (id, newName) => {
		props.editPerson(id, newName);
	}

	const removePerson = (id) => {
    	props.removePerson(id);
	}

 	return (
    	<ul className = "AllPeople">
	    	{props.people && props.people.map((person) =>
	      		(<IndvPerson
	      			key = {person.id}
	      			name = {person.name}
	      			id = {person.id}
	      			editPerson = {editPerson}
	      			removePerson = {removePerson}
	      		/>)
	      	)}
    	</ul>
  	);
}

export default allPeople;