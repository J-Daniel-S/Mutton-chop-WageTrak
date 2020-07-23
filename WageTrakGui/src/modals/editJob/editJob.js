import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import ConfirmEdit from '../confirm/ConfirmEdit';
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
		// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name)
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE'
				}
			}
		).then(res => res.json()).then(res => {
			props.updateUser(res);
			props.history.push("/wagetrak");
		});
	}

	const editJob = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const submitChange = () => {

		let name = document.forms["ediJobForm"]["nameEdit"].value;
		let rate = document.forms["editJobForm"]["rateEdit"].value;

		if (name === "" || name === " ") {
			name = props.currentJob.name
		}

		if (rate === "0" || rate === "" || !rate) {
			rate = props.currentJob.rate;
		}

		if (rate <= 0) {
			alert('Hourly pay must be greater than zero');
		} else if (name.includes("?") || name.includes("/")) {
			alert('Name can\'t include ? or /');
		} else {

			console.log(name + ":" + rate);
			// console.log(	"http://localhost:8080/wageTrak/" + props.currentUser.id);
			fetch(
				"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name,
				{
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						'Access-Control-Allow-Origin': 'http://localhost:3000',
						'Access-Control-Allow-Methods': 'PUT'
					},
					body: JSON.stringify({
						name: name.toLowerCase(),
						rate: rate
					})
				}
			).then(res => res.json()).then(res => {
				props.updateUser(res);
				props.history.push("/wagetrak");
			});
		}
	}

	return (
		<React.Fragment>
			<article className="theModal">
				<div>
					<Button onClick={() => toggleDeleteJob()}>Delete Job</Button>
				</div>
				<div>
					<form id="editJobForm" name="ediJobForm">
						<Button onClick={() => editJob()} className="margin" htmlFor="nameEdit">Edit job</Button>
						<input type="text" id="nameEdit" name="nameEdit" className="form-control anInput" defaultValue={props.currentJob.name} />
						<input type="number" id="rateEdit" name="rateEdit" className="form-control anInput" defaultValue={props.currentJob.rate} />
					</form>
				</div>
				{confirmDeleteState === true && <ConfirmDelete delete={() => deleteJob()} closeModal={() => toggleDeleteJob()} />}
				{confirmEditState === true && <ConfirmEdit submitChange={() => submitChange()} closeModal={() => editJob()} />}
			</article>
		</React.Fragment>
	);
}

export default withRouter(editJob);