import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import UserContext from '../../context/userContext';
import './editUser.css';

const editUser = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [userState, setUserState] = useContext(UserContext);

	const toggleDeleteUser = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deleteUser = () => {
		fetch(
			"http://localhost:8080/wageTrak/users/" + userState.id,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Origins': 'http://localhost:3000',
					'Access-Control-Allow-Methods': 'DELETE'
				}
			}
		).then(res => {
			//return to login here
			console.log(res);
		});
	}

	const editUser = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		const name = form.formBasicName.value;

		if (!name) {
			alert("Name cannot be blank!");
		} else {
			fetch(
				"http://localhost:8080/wageTrak/users",
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'http://localhost:3000'
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
			<Modal.Dialog>
				<Modal.Header>
					<Button onClick={() => toggleDeleteUser()}>Delete User</Button>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={editUser}>
						<Form.Group controlId="formBasicName">
							<Form.Control type="text" placeholder="Edit name" required />
						</Form.Group>
						<Button type="submit" variant="primary">Edit name</Button>
					</Form>
				</Modal.Body>
			</Modal.Dialog>
			{confirmDeleteState === true && <ConfirmDelete deleteUser={() => deleteUser()} closeModal={() => toggleDeleteUser()} />}
		</React.Fragment>
	);
}

export default withRouter(editUser);