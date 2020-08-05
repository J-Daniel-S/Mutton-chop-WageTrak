import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';
import { useAuth } from '../../context/authContext';

import { AddJobArticle, Hr, RoundedButtonCentered, CenterButtonText, FooterButton, AddBackdrop, FormLabel, FormInput, PaySection,
		Title } from '../../styles/styledComponents';

const addJob = (props) => {
	const [userState, updateUser] = useContext(UserContext);
	const { authTokens } = useAuth();

	const nameClicked = () => {
		props.history.push("/wagetrak");
	}

	const jobAdded = () => {

		let fName = document.forms['addJobForm']['name'].value;
		let fHourly = document.forms['addJobForm']['hourly'].value;

		if (fName === '') {
			alert('Name cannot be empty');
		} else if (fHourly <= 0) {
			alert('Hourly wage must be greater than zero');
		} else if (fHourly === '') {
			alert('Hourly wage cannot be empty')
		} else if (fName.includes("?") || fName.includes("/")) {
			alert('Please do not include "?" or "/" in the name');
		} else {
			jobAddedHandler(fName, fHourly);
		}

	}

	const jobAddedHandler = (name, hourly) => {
		fetch(
			"http://localhost:8080/wageTrak/" + userState.id,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'POST',
					Accept: 'application/json, text/plain, */*',
					authorization: authTokens
				},
				body: JSON.stringify({
					name: name.toLowerCase(),
					rate: Number.parseFloat(hourly).toFixed(2)
				})
			}
		).then(res => res.json()).then(res => {
			updateUser(res);
			props.history.push("/wagetrak");
		});
	}

	return (
		<React.Fragment>
			<AddJobArticle>
				<PaySection>
					<Hr></Hr>
					<Title>Add new job:</Title>
					<Hr></Hr>
				</PaySection>
				<main>
					<form id="addJobForm" name="addJobForm" onSubmit={() => jobAdded()}>
							<FormLabel htmlFor="name">Job name</FormLabel>
							<FormInput className="form-control" type="text" id="name" name="name" placeholder="Enter job title" />
							<FormLabel htmlFor="hourly">Hourly rate</FormLabel>
							<FormInput className="form-control" type="number" id="hourly" name="hourly" placeholder="$##.##" />
							<Hr></Hr>
						<RoundedButtonCentered onClick={() => jobAdded(
						)}>
							<CenterButtonText>Submit</CenterButtonText>
						</RoundedButtonCentered>
					</form>
				</main>
				<FooterButton onClick={() => nameClicked()}>
					<CenterButtonText>{userState.name}</CenterButtonText>
				</FooterButton>
			</AddJobArticle>
			<AddBackdrop onClick={() => nameClicked()}></AddBackdrop>
		</React.Fragment>
	);
}

export default withRouter(addJob);