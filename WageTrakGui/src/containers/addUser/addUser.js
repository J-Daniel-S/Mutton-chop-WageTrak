// eslint-disable-next-line
import React, { useContext } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import UserContext from '../../context/userContext';
import { useAuth } from '../../context/authContext';

import { LoginPage, AppTitle, LoginButtonContainer } from '../../styles/styledComponents';

const addUser = (props) => {
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const { authTokens, setAuthTokens } = useAuth();
	// eslint-disable-next-line
	const { userState, updateUser } = React.useContext(UserContext);

	const signUp = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		const userName = form.formBasicUsername.value;
		const taxRate = form.formBasicTax.value;
		const password = form.formBasicPassword.value;
		//temporary solution
		// const token = 'Basic ' + window.btoa('curly jefferson' + ":" + 'pass');

		console.log(JSON.stringify({
			userName: userName,
			name: userName,
			taxRate: taxRate,
			password: password
		}));

		// fetch(
		// 	"http://localhost:8080/wageTrak/users",
		// 	{
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-type': 'application/json',
		// 			'Access-Control-Allow-Origin': 'localhost:3000/',
		// 			'Access-Control-Allow-Methods': 'POST'
		// 		},
		// 		body: JSON.stringify({
		// 			userName: userName,
		// 			name: userName,
		// 			taxRate: taxRate,
		// 			password: password
		// 		})
		// 	}
		// ).then(
		// 	fetch(
		// 		"http://localhost:8080/wageTrak-login",
		// 		{
		// 			method: 'POST',
		// 			headers: {
		// 				'Content-type': 'application/json',
		// 				'Access-Control-Allow-Origin': 'localhost:3000/',
		// 				'Access-Control-Allow-Methods': 'POST',
		// 				Accept: 'application/json, text/plain, */*',
		// 				authorization: token
		// 			}
		// 		}).then(res => {
		// 			if (res.status === 200) {
		// 				setAuthTokens(token);
		// 				setLoggedIn(true);
		// 			}
		// 		}).catch(e => setIsError(true)));
	}

	if (loggedIn) {
		props.setAuthorized(true);
	}

	if (isError) {
		alert("Username or password is incorrect");
	}

	const taxPlaceholder = "Google 'what is my tax bracket?'";

	return (
		<LoginPage>
			<AppTitle>WageTrak</AppTitle>
			<section style={{ margin: '10vh auto' }}>
				<Card border="info">
					<Card.Header>
						<p>Signup</p>
					</Card.Header>
					<Form onSubmit={signUp}>
						<Form.Group controlId="formBasicUsername">
							<Form.Label>User name:</Form.Label>
							<Form.Control type="text" placeholder="" required />
						</Form.Group>
						<Form.Group controlId="formBasicTax">
							<Form.Label>Tax rate:</Form.Label>
							<Form.Control type="float" placeholder={taxPlaceholder} required />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control type="password" placeholder="Password" required />
						</Form.Group>
						<LoginButtonContainer>
							<Button variant="info" type="submit">
								Sign up
							</Button>{"  "}
							<Button variant="outline-info" onClick={() => props.register(false)}>Back to login</Button>
						</LoginButtonContainer>
					</Form>
					<Card.Footer>

					</Card.Footer>
				</Card>
			</section>
		</LoginPage>
	);
}

export default addUser;