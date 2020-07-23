import React from 'react';
import { withRouter } from 'react-router-dom';

import './addShift.css';

const addShift = (props) => {

	const nameClicked = () => {
		props.history.push("/wagetrak/job/weeks");
	}

	const shiftAdded = () => {

		let name = document.forms['addShiftForm']['name'].value;
		let hours = document.forms['addShiftForm']['hours'].value;
		let ot = document.forms['addShiftForm']['ot'].value;

		if (hours > 24) {
			alert('Are you sure you worked that many hours?')
		} else if (Date.parse(name) < Date.parse(props.periodData.dateName) - 43200000) {
			alert('Shift date cannot be before start of pay period');
		} else if (Number.parseFloat(ot) > Number.parseFloat(hours)) {
			alert('Overtime can\'t exceed hours worked');
		} else if (name === '') {
			alert('Shift date cannot be empty');
		} else if (hours === '' || ot === '' || isNaN(hours)) {
			alert('Fields cannot be blank');
		} else if (Number.parseFloat(hours) <= 0) {
			alert('Hours must be greater than 0')
		} else if (Number.parseFloat(ot) < 0) {
			alert('Overtime cannot be less than 0')
		} else {
			const date = "0" + name.substring(6, 11);
			postShift(date, hours, ot);
		}
	}


	//will need to include differentials here
	const postShift = (date, hours, ot) => {
		const hoursWorked = Number.parseFloat(hours).toFixed(1);
		const overWorked = Number.parseFloat(ot).toFixed(1);

		console.log(JSON.stringify({
					date: date,
					hours: hoursWorked,
					overtime: overWorked
				}))
		// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.jobData.name + "/" + props.periodData.dateName);
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.jobData.name  + "/" + props.periodData.dateName,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localhost:3000/',
					'Access-Control-Allow-Methods': 'POST'
				},
				body: JSON.stringify({
					date: date,
					hours: hoursWorked,
					overtime: overWorked
				})
			}
		).then(res => res.json()).then(res => {
			props.updateUser(res);
			props.history.push('/wagetrak');
		});
	}

	return (
		<React.Fragment>
		<article className="add">
			<header className="margin title">
				<p>Add shift:</p>
			</header>
			<main>
				<form id="addShiftForm" name="addShiftForm">
					<section className="form-group">
						<label className="margin" htmlFor="name">Enter start date</label>
						<input type="date" id="name" name="name" defaultValue={props.periodData.dateName.slice(0, 5)} className="form-control anInput" required></input>
						<label className="margin" htmlFor="hours">Hours worked:</label>
						<input type="number" id="hours" name="hours" defaultValue="0.0" className="form-control anInput" required></input>
						<label className="margin" htmlFor="overtime">Overtime hours worked:</label>
						<input type="number" id="ot" name="ot" defaultValue="0.0" className="form-control anInput"></input>
						<p>Do not subtract overtime from hours worked</p>
						<p>Overtime might make net pay calculations less accurate depending on policy and taxes</p>
					</section>
					<section className="submit-button" onClick={() => shiftAdded()
					}>
						<p>Submit</p>
					</section>
				</form>
			</main>
			<section className="footer" onClick={() => nameClicked()}>
				<span className="name">Pay period: {props.periodData.dateName}</span>
			</section>
		</article>
		<div className="background" onClick={() => nameClicked()}></div>
		</React.Fragment>
	);
}

export default withRouter(addShift);