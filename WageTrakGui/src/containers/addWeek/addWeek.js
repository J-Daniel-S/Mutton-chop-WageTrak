import React from 'react';
import { withRouter } from 'react-router-dom';

import './addPeriod.css';

const addPeriod = (props) => {

	const nameClicked = () => {
		props.history.push("/wagetrak/job");
	}

	const periodAdded = (name) => {
		let date1 = "0" + name.value.substring(6, 11);
		let date2 = name.value.substring(0, 4);
		const date = date1+ "-" +date2;
		postPeriod(date);
		setTimeout(props.updateUser(), 800);
		setTimeout(props.history.push("/wagetrak"), 1100);

	}

	const postPeriod = (dateName) => {
		console.log(JSON.stringify({
					dateName: dateName,
				}))
		fetch(
			"http://localhost:8080/wageTrak/" + props.userData.id + "/" + props.jobData.name,
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
		).then(res => console.log(res));

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
				<span className="user-name">{props.jobData.name}</span>
			</section>
		</article>
		<div className="background" onClick={() => nameClicked()}></div>
		</React.Fragment>
	);
}

export default withRouter(addPeriod);