import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';

import { AuthContext } from './authContext';

const authorization = (props) => {
	const authContext = useContext(AuthContext);

	const login = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		console.log(form);

		//code for validation here
		authContext.login();
	}

	return (
		<React.Fragment>
			<header>
				<p>Wagetrak Login</p>
			</header>
			<Form onSubmit={login}>
				<Form.Group controlId="formBasicUsername">
					<Form.Control type="text" placeholder="User name"></Form.Control>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</React.Fragment>
	);
}

export default authorization;