import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import { useAuth } from '../context/authContext';
import { LoginPage, AppTitle, LoginButtonContainer } from '../styles/styledComponents';

const addUser = (props) => {
	const { setAuthTokens } = useAuth();
	const [confirm, setConfirm] = useState(true);
	const [passValue, setPassValue] = useState({});

	const holdPassword = (value) => {
		setPassValue(value);
		setConfirm(false);
	}

	const checkValue = (confirm) => {

		if (passValue !== confirm || confirm === "") {
			setConfirm(false);
		} else {
			setConfirm(true);
		}
	}

	const signUp = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		const userName = form.formBasicUsername.value;
		const taxRate = form.formBasicTax.value;
		const password = form.formBasicPassword.value;
		const confirm = form.formBasicConfirm.value;
		const token = 'Basic ' + window.btoa(userName.toLowerCase() + ":" + taxRate + ":" + password);

		if (password !== confirm) {
			alert("Password and confirm password are not equal");
		} else {
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
					res.json().then(res => {
						if (res.message === "User registered") {
							alert(res.message);
						} else {
							alert("Something went wrong");
						}
					});
					props.toggleLogin();
				}
			}).catch(e => {
				alert("Failed to reach the server.  Please try again later");
				localStorage.setItem("tokens", "");
				setAuthTokens("");
				window.location.reload();

			});
		}
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
							<Form.Control type="number" min="1" max="100" placeholder={taxPlaceholder} required />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control type="password" placeholder="Password" onChange={(e) => holdPassword(e.currentTarget.value)} required />
						</Form.Group>
						<Form.Group controlId="formBasicConfirm">
							<Form.Label>Confirm password:</Form.Label>
							<Form.Control type="password" onChange={(e) => checkValue(e.currentTarget.value)} placeholder="Confirm" required />
						</Form.Group>
						<LoginButtonContainer>
							{confirm && <Button variant="info" type="submit">
								Sign up
							</Button>}{"  "}
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