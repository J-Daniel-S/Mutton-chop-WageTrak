import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import UserContext from '../../context/userContext';
import './addUser.css';

const addUser = (props) => {
	// eslint-disable-next-line
	const [ userState, updateUser ] = useContext(UserContext);

	const signUp = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		const userName = form.formBasicUsername.value;
		const taxRate = form.formBasicTax.value;
		const password = form.formBasicPassword.value;

		console.log(JSON.stringify({
					userName: userName,
					name: userName,
					taxRate: taxRate,
					password: password
				}));

		fetch(
			"http://localhost:8080/wageTrak/users",
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'POST'
				},
				body: JSON.stringify({
					userName: userName,
					name: userName,
					taxRate: taxRate,
					password: password
				})
			}
		).then(res => res.json()).then(res => {
			updateUser(res);
			props.history.push('/wagetrak');
		});
	}

	return (
		<React.Fragment>
			<header>
				<p>Wagetrak Signup</p>
			</header>
			<Form onSubmit={signUp}>
				<Form.Group controlId="formBasicUsername">
					<Form.Control type="text" placeholder="User name" required />
				</Form.Group>
				<Form.Group controlId="formBasicTax">
					<Form.Control type="float" placeholder="tax rate" required />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Control type="password" placeholder="Password" required />
				</Form.Group>
				<Button variant="primary" type="submit" >
					Sign up
				</Button>
			</Form>
		</React.Fragment>
	);
}

export default withRouter(addUser);