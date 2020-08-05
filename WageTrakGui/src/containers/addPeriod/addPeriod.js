import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';
import { useAuth } from '../../context/authContext';

import { Title, Hr, AddJobArticle, AddBackdrop, FooterButton, CenterButtonText, FormInput, FormLabel, RoundedButtonCentered } from '../../styles/styledComponents';

const addPeriod = (props) => {
	const [userState, updateUser, jobState] = useContext(UserContext);
	const { authTokens } = useAuth();

	const nameClicked = () => {
		props.history.push("/wagetrak/job");
	}

	const periodAdded = (name) => {
		let date1 = "0" + name.value.substring(6, 11);
		let date2 = name.value.substring(0, 4);
		const date = date1 + "-" + date2;
		postPeriod(date);
	}

	const postPeriod = (dateName) => {
		fetch(
			"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name,
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
					dateName: dateName,
				})
			}
		).then(res => res.json()).then(res => {
			updateUser(res);
			props.history.push('/wagetrak');
		});
	}

	return (
		<React.Fragment>
			<AddJobArticle>
				<header>
					<Hr></Hr>
						<Title>Start new pay period:</Title>
					<Hr></Hr>
				</header>
				<main>
					<form>
						<section className="form-group">
							<FormLabel htmlFor="name">Enter start date</FormLabel>
							<FormInput type="date" id="name" placeholder="Select start date" className="form-control" required></FormInput>
						</section>
						<RoundedButtonCentered onClick={() => periodAdded(
							document.getElementById('name')
						)
						}>
							<CenterButtonText>Submit</CenterButtonText>
						</RoundedButtonCentered>
					</form>
					<hr></hr>
				</main>
				<FooterButton onClick={() => nameClicked()}>
					<CenterButtonText>{jobState.name}</CenterButtonText>
				</FooterButton>
			</AddJobArticle>
			<AddBackdrop onClick={() => nameClicked()}></AddBackdrop>
		</React.Fragment>
	);
}

export default withRouter(addPeriod);