import React from 'react';
import { withRouter } from 'react-router-dom';

import './addPeriod.css';

const addPeriod = (props) => {

	const nameClicked = () => {
		props.history.push("/wagetrak/job");
	}

	const periodAdded = (name) => {

		if (name.value === '') {
			alert('Start date cannot be blank')
		} else {
			let date1 = "0" + name.value.substring(6, 11);
			let date2 = name.value.substring(0, 4);
			const date = date1 + "-" + date2;
			postPeriod(date);
		}



	}

	const postPeriod = (dateName) => {
		console.log(JSON.stringify({
			dateName: dateName,
		}))
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'POST'
				},
				body: JSON.stringify({
					dateName: dateName,
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
					<p>Start new pay period:</p>
				</header>
				<main>
					<form>
						<section className="form-group">
							<label className="margin" htmlFor="name">Enter start date</label>
							<input type="date" id="name" placeholder="Select start date" className="form-control anInput" required></input>
						</section>
						<section className="submit-button" onClick={() => periodAdded(
							document.getElementById('name')
						)
						}>
							<p>Submit</p>
						</section>
					</form>
				</main>
				<section className="footer" onClick={() => nameClicked()}>
					<span className="user-name">{props.currentJob.name}</span>
				</section>
			</article>
			<div className="background" onClick={() => nameClicked()}></div>
		</React.Fragment>
	);
}

export default withRouter(addPeriod);