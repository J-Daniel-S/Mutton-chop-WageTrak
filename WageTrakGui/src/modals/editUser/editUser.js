import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Form, Fade } from 'react-bootstrap';

import UserContext from '../../context/userContext';
import { useAuth } from '../../context/authContext';

const editUser = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [userState, setUserState] = useContext(UserContext);
	const { authTokens } = useAuth();

	const toggleDeleteUser = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const editUser = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		const name = form.formBasicName.value.substring(0, 20);

		if (!name) {
			alert("Name cannot be blank!");
		} else {
			fetch(
				"http://localhost:8080/wageTrak/users",
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'http://localhost:3000',
						Accept: 'application/json, text/plain, */*',
						authorization: authTokens
					},
					mode: 'cors',
					body: JSON.stringify({
						name: name.toLowerCase(),
						taxRate: userState.taxRate,
						id: userState.id
					})
				}
			).then(res => res.json()).then(res => {
				setUserState(res);
				props.closeModal();
			});
		}

	}

	return (
		<React.Fragment>
			<Fade appear in>
				<Modal.Dialog>
					<Modal.Header closeButton onClick={() => props.closeModal()}>
						<Modal.Title>Edit user?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={editUser}>
							<Form.Group controlId="formBasicName">
								<Form.Control type="text" placeholder="Does not change the username you log in with" required />
							</Form.Group>
							<Button size="sm" block type="submit" variant="secondary">Edit display name</Button>
							<Button size="sm" block variant="secondary" onClick={() => toggleDeleteUser()}>Delete User</Button>
						</Form>
					</Modal.Body>
				</Modal.Dialog>
			</Fade>
		</React.Fragment>
	);
}

export default withRouter(editUser);