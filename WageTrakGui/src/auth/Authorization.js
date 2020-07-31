import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import { useAuth } from '../context/authContext';
import UserContext from '../context/userContext';

import { LoginPage, AppTitle, LoginButtonContainer } from '../styles/styledComponents';

const authorization = (props) => {
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const { setAuthTokens } = useAuth();
	// eslint-disable-next-line
	const { userState, updateUser } = React.useContext(UserContext);

	const login = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		let user = form.formBasicUsername.value;
		let password = form.formBasicPassword.value;

		const token = 'Basic ' + window.btoa(user + ":" + password);

		console.log(JSON.stringify({
			userName: user,
			password: password
		}));

		fetch(
			"http://localhost:8080/wageTrak-test-login",
			{
				method: 'GET',
				headers: {
					Accept: 'application/json, text/plain, */*',
					authorization: token
				}
			}).then(res => {
				if (res.status === 200) {
					setAuthTokens(token);
					setLoggedIn(true);
				} 
			}).catch(e => setIsError(true));

	}

	if (loggedIn) {
		props.setAuthorized(true);
	}

	if(isError) {
		alert("incorrect username or password");
	}

	return (
		<LoginPage>
			<AppTitle>WageTrak</AppTitle>
			<section style={{ margin: '20vh auto' }}>
				<Card border="info">
					<Card.Header>
						<p style={{ color: 'teal' }}>Login</p>
					</Card.Header>
					<Form onSubmit={login}>
						<Form.Group controlId="formBasicUsername">
							<Form.Control type="text" placeholder="User name" required></Form.Control>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Control type="password" placeholder="Password" required />
						</Form.Group>
						<LoginButtonContainer>
							<Button variant="info" type="submit">
								Login
						</Button>{"  "}
							<Button onClick={() => props.register(true)} variant="outline-info">
								Register new user
						</Button>
						</LoginButtonContainer>
					</Form>
					<Card.Footer>

					</Card.Footer>
				</Card>
			</section>
		</LoginPage>
	);
}

export default authorization;