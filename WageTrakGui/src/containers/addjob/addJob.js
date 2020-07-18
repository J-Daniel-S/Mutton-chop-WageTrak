import React from 'react';
import { withRouter } from 'react-router-dom';

import './addJob.css';

const addJob = (props) => {

	const nameClicked = () => {
		props.history.push("/wagetrak");
	}

	const jobAdded = (name, hourly) => {
		if (name.value === "" || name.value === null || !name.value) {
			props.history.push("/wagetrak");
		} else {
			jobAddedHandler(name.value, hourly.value);
			setTimeout(props.updateUser(), 800);
			setTimeout(props.history.push("/wagetrak"), 1100);
		}
	}

	//Post request to job controller of api
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
		).then(res => console.log(res));

	}

	return (
		<React.Fragment>
			<article className="addJob">
				<header className="margin title">
					<p>Add new job:</p>
				</header>
				<main>
					<form>
						<section className="form-group">
							<label className="margin" htmlFor="name">Job name</label>
							<input type="text" id="name" className="form-control anInput" placeholder="Enter job title" required />
							<label className="margin" htmlFor="hourly">Hourly rate</label>
							<input type="number" id="hourly" className="form-control anInput" placeholder="$##.##" required />
						</section>
						<section className="submit-button" onClick={() => jobAdded(
							document.getElementById('name'),
							document.getElementById('hourly')
						)
						}>
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