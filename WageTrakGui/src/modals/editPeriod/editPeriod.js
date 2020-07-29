import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import ConfirmEdit from '../confirm/ConfirmEdit';
import UserContext from '../../context/userContext';
import './editPeriod.css';

const editPeriod = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [confirmEditState, setConfirmEditState] = useState({});
	const [userState, updateUser, jobState] = useContext(UserContext);

	const toggleDeletePeriod = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deletePeriod = () => {
		// console.log("http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName);
		fetch(
			"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE'
				}
			}
		).then(res => res.json()).then(res => {
			window.location.reload();
			updateUser(res);
		}).then(props.history.push("/wagetrak")
		).catch(err => console.log(err));
	}

	const editPeriod = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const submitChange = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		let dateName = form.formBasicDateName.value;

		if (dateName === props.currentPeriod.dateName) {
			props.history.push("/wagetrak");
		} else {

			let date1 = dateName.substring(0, 4);
			let date2 = dateName.substring(6, 10);

			dateName = "0" + date2 + "-" + date1;

			// console.log("http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName);
			fetch(
				"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName,
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
				updateUser(res);
				props.history.push("/wagetrak");
			});
		}
	}

	return (
		<React.Fragment>
			<article className="theModal">
				<div>
					<hr></hr>
					<Form onSubmit={submitChange}>
						<Form.Label>Edit Date:</Form.Label>
						<Form.Group controlId="formBasicDateName">
							<Form.Control type="date" defaultValue={props.currentPeriod.dateName} required />
						</Form.Group>
						<Button block variant="secondary" type="submit">Submit change</Button>
					</Form>
					<hr></hr>
					<Button block variant="secondary" onClick={() => toggleDeletePeriod()}>Delete Pay Period</Button>
				</div>
				{confirmDeleteState === true && <ConfirmDelete delete={() => deletePeriod()} closeModal={() => toggleDeletePeriod()} />}
				{confirmEditState === true && <ConfirmEdit submitChange={() => submitChange()} closeModal={() => editPeriod()} />}
			</article>
		</React.Fragment>
	);
}

export default withRouter(editPeriod);