import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';

import { AddShiftArticle, AddBackdrop, Hr, Title, FormLabel, FormInput, RoundedButtonCentered, CenterButtonText, FooterButton } from '../../styles/styledComponents';

const addShift = (props) => {
	const [userState, updateUser, jobState] = useContext(UserContext);

	const nameClicked = () => {
		props.history.push("/wagetrak/job/periods");
	}

	const shiftAdded = () => {

		let name = document.forms['addShiftForm']['name'].value;
		let hours = document.forms['addShiftForm']['hours'].value;
		let ot = document.forms['addShiftForm']['ot'].value;

		if (hours > 24) {
			alert('Are you sure you worked that many hours?')
		} else if (Date.parse(name) < Date.parse(props.currentPeriod.dateName) - 43200000) {
			alert('Shift date cannot be before start of pay period');
		} else if (Number.parseFloat(ot) > Number.parseFloat(hours)) {
			alert('Overtime can\'t exceed hours worked');
		} else if (name === '') {
			alert('Shift date cannot be empty');
		} else if (hours === '' || ot === '' || isNaN(hours)) {
			alert('Fields cannot be blank');
		} else if (Number.parseFloat(hours) <= 0) {
			alert('Hours must be greater than 0')
		} else if (Number.parseFloat(ot) < 0) {
			alert('Overtime cannot be less than 0')
		} else {
			const date = "0" + name.substring(6, 11);
			postShift(date, hours, ot);
		}
	}


	//will need to include differentials here
	const postShift = (date, hours, ot) => {
		const hoursWorked = Number.parseFloat(hours).toFixed(1);
		const overWorked = Number.parseFloat(ot).toFixed(1);

		// console.log(JSON.stringify({
		// 	date: date,
		// 	hours: hoursWorked,
		// 	overtime: overWorked
		// }))
		// console.log("http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName);
		fetch(
			"http://localhost:8080/wageTrak/" + userState.id + "/" + jobState.name + "/" + props.currentPeriod.dateName,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localhost:3000/',
					'Access-Control-Allow-Methods': 'POST'
				},
				body: JSON.stringify({
					date: date,
					hours: hoursWorked,
					overtime: overWorked
				})
			}
		).then(res => res.json()).then(res => {
			updateUser(res);
			props.history.push('/wagetrak');
		});
	}

	return (
		<React.Fragment>
			<AddShiftArticle>
				<header>
					<Hr></Hr>
					<Title>Add shift:</Title>
					<Hr></Hr>
				</header>
				<main>
					<form id="addShiftForm" name="addShiftForm">
						<section className="form-group">
							<FormLabel htmlFor="name">Enter start date</FormLabel>
							<FormInput type="date" id="name" name="name" defaultValue={props.currentPeriod.dateName.slice(0, 5)} className="form-control" required></FormInput>
							<FormLabel htmlFor="hours">Hours worked:</FormLabel>
							<FormInput type="number" id="hours" name="hours" defaultValue="0.0" className="form-control" required></FormInput>
							<FormLabel htmlFor="overtime">Overtime hours worked:</FormLabel>
							<FormInput type="number" id="ot" name="ot" defaultValue="0.0" className="form-control"></FormInput>
							<p>Do not subtract overtime from hours worked</p>
							<p>Overtime might make net pay calculations less accurate depending on policy and taxes</p>
						</section>
						<RoundedButtonCentered onClick={() => shiftAdded()
						}>
							<CenterButtonText>Submit</CenterButtonText>
						</RoundedButtonCentered>
					</form>
				</main>
				<FooterButton onClick={() => nameClicked()}>
					<CenterButtonText>Pay period: {props.currentPeriod.dateName}</CenterButtonText>
				</FooterButton>
			</AddShiftArticle>
			<AddBackdrop onClick={() => nameClicked()}></AddBackdrop>
		</React.Fragment>
	);
}

export default withRouter(addShift);