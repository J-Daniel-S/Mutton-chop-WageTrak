import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Form, Fade } from 'react-bootstrap';

import UserContext from '../../context/userContext';
import ConfirmDelete from '../confirm/ConfirmDelete';
import { useAuth } from '../../context/authContext';

import Loading from '../../styles/Loading';

const navMenu = (props) => {
	const [userState, updateUser] = useContext(UserContext);
	const [confirm, setConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const { authTokens, setAuthTokens } = useAuth();

	const editUser = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		let rate = form.formBasicTaxRate.value;

		rate = Number.parseInt(rate) / 100;

		fetch(
			"http://localhost:8080/wageTrak/users",
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localhost:3000',
					authorization: authTokens
				},
				mode: 'cors',
				body: JSON.stringify({
					name: userState.name,
					taxRate: rate,
					id: userState.id
				})
			}
		).then(res => res.json()).then(res => {
			updateUser(res);
			props.toggleMenu();
		});
	}

	const toggleDelete = () => {
		if (confirm !== true) {
			setConfirm(true);
		} else {
			setConfirm(false);
		}
	}

	const deleteUser = () => {
		fetch(
			"http://localhost:8080/wageTrak/users/" + userState.id,
			{
				method: 'DELETE',
				headers: {
					'Access-Control-Allow-Methods': 'DELETE',
					Accept: 'application/json',
					authorization: authTokens
				}
			}
		).then(res => {
			if (res.status === 200) {
				res.json().then(res => {
					alert(res.message)
					setAuthTokens("");
					window.location.reload();
				});
			} else {
				alert("There was an error");
			}
		});
	}

	const reload = () => {
		props.getUser();
		setConfirm(false);
		setLoading(true);
		setTimeout(() => props.toggleMenu(), 1500);
	}

	let placeholder = userState.taxRate * 100 + '% tax';

	return (
		<React.Fragment>
			{confirm === false && loading === false && <Fade appear in>
				<Modal.Dialog>
					<Modal.Body>
						<Form onSubmit={editUser}>
							<Form.Group controlId="formBasicTaxRate">
								<Form.Control type="number" placeholder={placeholder} required max="100" />
							</Form.Group>
							<Button block size="sm" variant="secondary" type="submit">Edit tax rate</Button>
							<Button block size="sm" variant="secondary" onClick={() => props.toggleReport()}>Report bug</Button>
							<Button block size="sm" variant="secondary" onClick={() => reload()}>Reload user data</Button>
							<Button block size="sm" variant="secondary" onClick={() => toggleDelete()}>Delete User</Button>
						</Form>
					</Modal.Body>
				</Modal.Dialog>
			</Fade>}
			{confirm === true && <ConfirmDelete delete={() => deleteUser()} closeModal={() => toggleDelete()} />}
			{loading === true && <Modal.Dialog>
				<Modal.Body>
					<Loading />
				</Modal.Body>
			</Modal.Dialog>}
		</React.Fragment>
	);
}

export default withRouter(navMenu);