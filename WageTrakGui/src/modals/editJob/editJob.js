import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Fade } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import ConfirmEdit from '../confirm/ConfirmEdit';
import UserContext from '../../context/userContext';

import { EditModal, Hr } from '../../styles/styledComponents';

const editJob = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [confirmEditState, setConfirmEditState] = useState({});
	// eslint-disable-next-line
	const [userState, setUserState, jobState] = useContext(UserContext);

	const toggleDeleteJob = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deleteJob = () => {
		// console.log("http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name)
		fetch(
			"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE'
				}
			}
		).then(res => res.json()).then(res => {
			setUserState(res);
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

	const submitChange = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		let name = form.formBasicName.value;
		let rate = form.formBasicRate.value;

		if (name === "" || name === " ") {
			name = jobState.name
		}

		if (rate === "0") {
			rate = jobState.rate;
		}

		if (rate <= 0) {
			alert('Hourly pay must be greater than zero');
		} else if (name.includes("?") || name.includes("/")) {
			alert('Name can\'t include ? or /');
		} else {

			// console.log(	"http://localhost:8080/wageTrak/" + userState.id);
			fetch(
				"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name,
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
				setUserState(res);
				props.history.push("/wagetrak");
			});
		}
	}

	return (
		<React.Fragment>
			<EditModal>
				<Fade appear in>
				<div>
					<Hr></Hr>
					<Form onSubmit={submitChange}>
						<Form.Label>Edit job name:</Form.Label>
						<Form.Group controlId="formBasicName">
							<Form.Control type="text" defaultValue={jobState.name} required />
						</Form.Group>
						<Form.Label>Edit hourly pay:</Form.Label>
						<Form.Group controlId="formBasicRate">
							<Form.Control type="decimal" defaultValue={jobState.rate} required />
						</Form.Group>
						<Button block variant="secondary" type="submit">Submit change</Button>
					</Form>
					<Hr></Hr>
					<Button block variant="secondary" onClick={() => toggleDeleteJob()}>Delete Job</Button>
				</div>
				</Fade>
				{confirmDeleteState === true && <ConfirmDelete delete={() => deleteJob()} closeModal={() => toggleDeleteJob()} />}
				{confirmEditState === true && <ConfirmEdit submitChange={() => submitChange()} closeModal={() => editJob()} />}
			</EditModal>
		</React.Fragment>
	);
}

export default withRouter(editJob);