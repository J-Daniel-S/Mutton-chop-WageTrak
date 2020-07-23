import React from 'react';
import { withRouter } from 'react-router-dom';

import './addJob.css';

const addJob = (props) => {

	const nameClicked = () => {
		props.history.push("/wagetrak");
	}

	const jobAdded = () => {

		let fName = document.forms['addJobForm']['name'].value;
		let fHourly = document.forms['addJobForm']['hourly'].value;

		if (fName === '') {
			alert('Name cannot be empty');
		} else if (fHourly <= 0) {
			alert('Hourly wage must be greater than zero');
		} else if (fHourly === '') {
			alert('Hourly wage cannot be empty')
		} else if (fName.includes("?") || fName.includes("/")) {
			alert('Please do not include "?" or "/" in the name');
		} else {
			jobAddedHandler(fName, fHourly);
		}
		
	}

	const jobAddedHandler = (name, hourly) => {
		name = name.replace("?", "");
		console.log(JSON.stringify({
			name: name.toLowerCase(),
			rate: Number.parseFloat(hourly).toFixed(2)
		}))
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'POST'
				},
				body: JSON.stringify({
					name: name.toLowerCase(),
					rate: Number.parseFloat(hourly).toFixed(2)
				})
			}
		).then(res => res.json()).then(res => {
			props.updateUser(res);
			props.history.push("/wagetrak");
		});
	}

	return (
		<React.Fragment>
			<article className="addJob">
				<header className="margin title">
					<p>Add new job:</p>
				</header>
				<main>
					<form id="addJobForm" name="addJobForm" onSubmit={() => jobAdded()}>
						<section className="form-group">
							<label className="margin" htmlFor="name">Job name</label>
							<input type="text" id="name" name="name" className="form-control anInput" placeholder="Enter job title" />
							<label className="margin" htmlFor="hourly">Hourly rate</label>
							<input type="number" id="hourly" name="hourly" className="form-control anInput" placeholder="$##.##" />
						</section>
						<section className="submit-button" onClick={() => jobAdded(
							document.getElementById('name'),
							document.getElementById('hourly')
						) }>
							<p>Submit</p>
						</section>
					</form>
				</main>
				<section className="footer" onClick={() => nameClicked()}>
					<span className="user-name">{props.currentUser.name}</span>
				</section>
			</article>
			<div onClick={() => nameClicked()} className="background"></div>
		</React.Fragment>
	);
}

export default withRouter(addJob);