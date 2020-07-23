import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import ConfirmEdit from '../confirm/ConfirmEdit';
import './editPeriod.css';

const editPeriod = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [confirmEditState, setConfirmEditState] = useState({});

	const toggleDeletePeriod = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deletePeriod = () => {
		// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.week.dateName);
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName,
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
		}).catch(err => console.log(err));
	}

	const editPeriod = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const submitChange = () => {

		let dateName = document.forms["editPeriodForm"]["nameEdit"].value;

		if (dateName === '') {
			alert('Date can\'t be blank');
		} else if (dateName === props.currentPeriod.dateName) {
			props.history.push("/wagetrak");
		} else {

			let date1 = dateName.substring(0, 4);
			let date2 = dateName.substring(6, 10);

			dateName = "0" + date2 + "-" + date1;

			console.log("dateName: " + dateName);
			// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName);
			fetch(
				"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName,
				{
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						'Access-Control-Allow-Origin': 'localhost:3000/',
						'Access-Control-Allow-Methods': 'PUT'
					},
					body: JSON.stringify({
						dateName: dateName,
					})
				}
			).then(res => res.json()).then(res => {
				let update = res;
				props.updateUser(update);
				props.history.push("/wagetrak");
			});
		}
	}

	return (
		<React.Fragment>
			<article className="theModal">
				<div>
					<Button onClick={() => toggleDeletePeriod()}>Delete Pay Period</Button>
				</div>
				<div>
					<form id="editPeriodForm" name="editPeriodForm">
						<Button onClick={() => editPeriod()} className="margin" htmlFor="nameEdit">Edit Period</Button>
						<input type="date" id="nameEdit" className="form-control anInput" placeholder={props.currentPeriod.dateName} />
					</form>
				</div>
				{confirmDeleteState === true && <ConfirmDelete delete={() => deletePeriod()} closeModal={() => toggleDeletePeriod()} />}
				{confirmEditState === true && <ConfirmEdit submitChange={() => submitChange()} closeModal={() => editPeriod()} />}
			</article>
		</React.Fragment>
	);
}

export default withRouter(editPeriod);