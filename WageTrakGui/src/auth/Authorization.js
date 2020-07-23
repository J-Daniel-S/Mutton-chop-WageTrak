import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';

import { AuthContext } from './authContext';

const authorization = (props) => {
	const authContext = useContext(AuthContext);

	const login = () => {
		authContext.login();
	}

	return (
		<React.Fragment>
			<header>
				<p>Wagetrak Login</p>
			</header>
			<Form>
				<Form.Group controlId="formBasicUsername">
					<Form.Control type="text" placeholder="User name"></Form.Control>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={() => login()}>
					Login
				</Button>
			</Form>
		</React.Fragment>
	);
}

export default authorization;