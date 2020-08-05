import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import { LoginPage, AppTitle, LoginButtonContainer } from '../styles/styledComponents';

const addUser = (props) => {

	const signUp = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		const userName = form.formBasicUsername.value;
		const taxRate = form.formBasicTax.value;
		const password = form.formBasicPassword.value;
		const token = 'Basic ' + window.btoa(userName.toLowerCase() + ":" + taxRate + ":" + password);

		fetch(
			"http://localhost:8080/wageTrak-login/register",
			{
				method: 'POST',
				headers: {
					Accept: 'application/json, text/plain, */*',
					Authorization: token
				},
				body: {}
			}
		).then(res => {
			if (res.status === 401) {
				alert("User with that username already exists");
			} else {
				res.json().then(res => alert(res.message));
				props.toggleLogin();
			}
		});
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
							<Form.Control type="text" placeholder="" maxLength="21" required />
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