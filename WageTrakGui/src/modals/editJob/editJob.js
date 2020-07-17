import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ConfirmDeleteJob from './confirmDeleteJob/ConfirmDeleteJob';
import ConfirmEditJob from './confirmEditJob/ConfirmEditJob';
import './editJob.css';

const editJob = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [confirmEditState, setConfirmEditState] = useState({});

	const toggleDeleteJob = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deleteJob = () => {
		// console.log("http://localhost:8080/wageTrak/" + props.user.id + "/" + props.job.name)
		fetch(
			"http://localhost:8080/wageTrak/" + props.user.id + "/" + props.job.name,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE'
				}
			}
		).then(res => {
			console.log(res);
			setTimeout(props.userChange(), 800);
			setTimeout(props.history.push("/wagetrak"), 1100);
		});
	}

	const editJob = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const submitChange = (name, rate) => {

		name = name.value.replace("?", "");
		
		rate = rate.value;

		if (name === props.job.name || name === "" || name === " ") {
			name = props.job.name
		}

		if (rate === props.job.rate || rate === "0" || rate === "" || !rate) {
			rate = props.job.rate;
		}

		console.log(name + ":" +  rate);
		// console.log(	"http://localhost:8080/wageTrak/" + props.user.id);
		fetch(
			"http://localhost:8080/wageTrak/" + props.user.id + "/" + props.job.name,
			{
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'PUT'
				},
				body: JSON.stringify({
					name: name.toLowerCase(),
					rate: rate
				})
			}
		).then(res => {
			console.log(res);
			setTimeout(props.userChange(), 800);
			setTimeout(props.history.push("/wagetrak"), 1100);
		});

	}

	return (
		<React.Fragment>
			<article className="theModal">
					<div>
						<Button onClick={() => toggleDeleteJob()}>Delete Job</Button>
					</div>
					<div>
						<form>
							<Button onClick={() => editJob()} className="margin" htmlFor="nameEdit">Edit job</Button>
							<input type="text" id="nameEdit" className="form-control anInput" placeholder={props.job.name} />
							<input type="number" id="rateEdit" className="form-control anInput" placeholder={"$"+props.job.rate} />
						</form>
					</div>
				{confirmDeleteState === true && <ConfirmDeleteJob deleteJob={() => deleteJob()} closeModal={() => toggleDeleteJob()} />}
				{confirmEditState === true && <ConfirmEditJob submitChange={() => submitChange(document.getElementById('nameEdit'),
																						document.getElementById('rateEdit')
																					)} closeModal={() => editJob()} />} 
			</article>
		</React.Fragment>
	);
}

export default withRouter(editJob);