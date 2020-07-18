import React from 'react';
import { withRouter } from 'react-router-dom';

import './addShift.css';

const addShift = (props) => {

	const nameClicked = () => {
		props.history.push("/wagetrak/job/weeks");
	}

	const shiftAdded = (name, hours, overtime) => {
		const date = "0" + name.value.substring(6, 11);

		postShift(date, hours.value, overtime.value);
		setTimeout(props.updateUser(), 800);
		setTimeout(props.history.push("/wagetrak"), 1100);

	}


	//will need to include differentials here
	const postShift = (date, hours, overtime) => {
		const hoursWorked = Number.parseFloat(hours).toFixed(1);
		const overWorked = Number.parseFloat(overtime).toFixed(1);

		console.log(JSON.stringify({
					date: date,
					hours: hoursWorked,
					overtime: overWorked
				}))
		console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.jobData.name + "/" + props.periodData.dateName);
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
		).then(res => { 
			console.log(res);
		})
	}

	return (
		<React.Fragment>
		<article className="add">
			<header className="margin title">
				<p>Add shift:</p>
			</header>
			<main>
				<form>
					<section className="form-group">
						<label className="margin" htmlFor="name">Enter start date</label>
						<input type="date" id="name" placeholder="Select shift date" className="form-control anInput" required></input>
						<label className="margin" htmlFor="hours">Hours worked:</label>
						<input type="number" id="hours" placeholder="0.0" className="form-control anInput" required></input>
						<label className="margin" htmlFor="overtime">Overtime hours worked:</label>
						<input type="number" id="overtime" placeholder="0.0" className="form-control anInput"></input>
						<p>(Overtime might make net pay calculations less accurate depending on policy and taxes)</p>
					</section>
					<section className="submit-button" onClick={() => shiftAdded(
						document.getElementById('name'),
						document.getElementById('hours'),
						document.getElementById('overtime')
						)
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