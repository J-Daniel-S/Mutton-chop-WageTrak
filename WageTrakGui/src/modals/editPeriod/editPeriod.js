import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Fade } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import ConfirmEdit from '../confirm/ConfirmEdit';
import UserContext from '../../context/userContext';
import { useAuth } from '../../context/authContext';

import { EditModal, Hr } from '../../styles/styledComponents';

const editPeriod = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [confirmEditState, setConfirmEditState] = useState({});
	// eslint-disable-next-line
	const [userState, updateUser, jobState, setJobState, periodState, setPeriodState] = useContext(UserContext);
	const { authTokens } = useAuth();

	const toggleDeletePeriod = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deletePeriod = () => {
		fetch(
			"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE',
					Accept: 'application/json, text/plain, */*',
					authorization: authTokens
				}
			}
		).then(res => res.json()).then(res => {
			updateUser(res);
		}).then(props.history.push("/wagetrak")
		).catch(e => console.log(e));
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

			fetch(
				"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName,
				{
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						'Access-Control-Allow-Origin': 'localhost:3000/',
						'Access-Control-Allow-Methods': 'PUT',
						Accept: 'application/json, text/plain, */*',
						authorization: authTokens
					},
					body: JSON.stringify({
						dateName: dateName,
					})
				}
			).then(res => res.json()).then(res => {
				updateUser(res);
				props.history.push("/wagetrak");
			}).catch(e => alert("There was an error: " + e));
		}
	}

	return (
		<React.Fragment>
			<Fade appear in>
				<EditModal>
					<div>
						<Hr></Hr>
						<Form onSubmit={submitChange}>
							<Form.Label>Edit Date:</Form.Label>
							<Form.Group controlId="formBasicDateName">
								<Form.Control type="date" defaultValue={props.currentPeriod.dateName} required />
							</Form.Group>
							<Button block variant="secondary" type="submit">Submit change</Button>
						</Form>
						<Hr></Hr>
						<Button block variant="secondary" onClick={() => toggleDeletePeriod()}>Delete Pay Period</Button>
					</div>
					{confirmDeleteState === true && <ConfirmDelete delete={() => deletePeriod()} closeModal={() => toggleDeletePeriod()} />}
					{confirmEditState === true && <ConfirmEdit submitChange={() => submitChange()} closeModal={() => editPeriod()} />}
				</EditModal>
			</Fade>
		</React.Fragment>
	);
}

export default withRouter(editPeriod);