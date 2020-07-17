import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import DiffSection from './diffSection/diffSection';
import './addJob.css';

//still in the works.  have to add modal to incorporate shift differentials

const addJob = (props) => {
	const [counter, setCounter] = useState({});

	const nameClicked = () => {
		props.history.push("/wagetrak");
	}

	const jobAdded = (name, hourly, diff1, diff2) => {
		jobAddedHandler(name.value, hourly.value);
		console.log(diff1);
		console.log(diff2);
		setTimeout(props.jobChange(), 800);
		setTimeout(props.history.push("/wagetrak"), 1100);
	}

	//Post request to job controller of api
	const jobAddedHandler = (name, hourly) => {
		name = name.replace("?", "");
		console.log(JSON.stringify({
			name: name.toLowerCase(),
			rate: Number.parseFloat(hourly).toFixed(2)
		}))
		fetch(
			"http://localhost:8080/wageTrak/" + props.userData.id,
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

	//I don't know how to fix this
	let differentials = 0;

	const diffAdded = () => {
		if (differentials < 2) {
			differentials++;
			setCounter(differentials);
		}
	}

	const diff1Removed = () => {
		differentials = 0;
		setCounter(differentials);
	}

	const diff2Removed = () => {
		differentials = 1;
		setCounter(differentials);
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
						<section>
							<label className="margin">Shift/night differential?</label>
							<i className="fa fa-plus add-button margin" aria-hidden="true" onClick={() => diffAdded()}></i>
						</section>
						<section>
							{/* I may just have to add differentials using a modal */}
							{counter > 0 && <DiffSection id="diff1" diffRemoved={() => diff1Removed()} />}
							{counter > 1 && <DiffSection id="diff2" diffRemoved={() => diff2Removed()} />}
						</section>
						<section className="submit-button" onClick={() => jobAdded(
							document.getElementById('name'),
							document.getElementById('hourly'),
							document.getElementById('diff1'),
							document.getElementById('diff2')
						)
						}>
							<p>Submit</p>
						</section>
					</form>
				</main>
				<section className="footer" onClick={() => nameClicked()}>
					<span className="user-name">{props.userData.name}</span>
				</section>
			</article>
			<div onClick={() => nameClicked()}className="background"></div>
		</React.Fragment>
	);
}

export default withRouter(addJob);