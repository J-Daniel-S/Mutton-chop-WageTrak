import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Form, Fade } from 'react-bootstrap';

import UserContext from '../../context/userContext';

const navMenu = (props) => {
	const [userState, updateUser] = useContext(UserContext);

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
					'Access-Control-Allow-Origin': 'http://localhost:3000'
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

	let placeholder = userState.taxRate * 100 + '% tax';

	return (
		<Fade appear in>
			<Modal.Dialog>
				<Modal.Body>
					<Form onSubmit={editUser}>
						<Form.Group controlId="formBasicTaxRate">
							<Form.Control type="number" placeholder={placeholder} required max="100" />
						</Form.Group>
						<Button block size="sm" variant="secondary" type="submit">Edit tax rate</Button>
						<Button block size="sm" variant="secondary" onClick={() => props.toggleReport()}>Report bug</Button>
						<Button block size="sm" variant="secondary" onClick={() => {
							props.getUser();
							window.location.reload();
						}
						}>Reload user data</Button>
					</Form>
				</Modal.Body>
			</Modal.Dialog>
		</Fade>
	);
}

export default withRouter(navMenu);