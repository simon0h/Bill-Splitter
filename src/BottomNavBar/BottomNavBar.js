import React, { useState } from "react";
import "./BottomNavBar.css"

const BottomNavBar = () => {

	const [showAbout, setShowAbout] = useState(false);
	const [showContact, setShowContact] = useState(false);
	const [showPrivacy, setShowPrivacy] = useState(false);

	const handleAboutClick = () => {
		setShowAbout(!showAbout);
		setShowContact(false);
		setShowPrivacy(false);
	}

	const handleContactClick = () => {
		setShowContact(!showContact);
		setShowAbout(false);
		setShowPrivacy(false);
	}

	const handlePrivacyClick = () => {
		setShowPrivacy(!showPrivacy);
		setShowContact(false);
		setShowAbout(false);
	}

	return (
		<div className="App">
			<button className = "about" onClick = {handleAboutClick}>About</button>
			<button className = "about" onClick = {handleContactClick}>Contact</button>
			<button className = "about" onClick = {handlePrivacyClick}>Privacy</button>
			{showAbout && <div className = "aboutContainer">
				<div className = "aboutInner">
					<p>A side project of mine built using React. I wanted to learn React, and I've always wanted to build a bill splitter that worked the way I wanted it to so here it is.</p>
					<p>Here's the GitHub repo: <a href="https://github.com/simon0h/Bill-Splitter">github.com/simon0h/Bill-Splitter</a></p>
					<p>And here's my website: <a href="https://simonoh.me">simonoh.me</a></p>
					<button className = "closeAbout" onClick = {handleAboutClick}>Close</button>
				</div>
			</div>}
			{showContact && <div className = "aboutContainer">
				<div className = "aboutInner">
					<p>Personal: <a href="mailto:email@simonoh.me">email@simonoh.me</a></p>
					<p>School: <a href="mailto:simonoh@nyu.edu">simonoh@nyu.edu</a></p>
					<button className = "closeAbout" onClick = {handleContactClick}>Close</button>
				</div>
			</div>}
			{showPrivacy && <div className = "aboutContainer">
				<div className = "aboutInner">
					<p>I do not collect any data that you have entered.</p>
					<button className = "closeAbout" onClick = {handlePrivacyClick}>Close</button>
				</div>
			</div>}
		</div>
	);
}

export default BottomNavBar;