import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import ConfirmEdit from '../confirm/ConfirmEdit';
import './EditShift.css';

const editShift = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [confirmEditState, setConfirmEditState] = useState({});

	const toggleDeleteShift = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deleteShift = () => {
		// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName + "/" + props.currentShift.date);
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName + "/" + props.currentShift.date,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE'
				}
			}
		).then(res => res.json()).then(res => {
			props.updateUser(res);
			props.history.push("/wagetrak");
		});
	}

	const editShift = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const submitChange = () => {

		let date = document.forms['editShiftform']['dateEdit'].value;
		let hours = document.forms['editShiftform']['hoursEdit'].value;
		let ot = document.forms['editShiftform']['otEdit'].value;

		date = date.replace("?", "").replace("/", "-");
		date = date.replace("/", "-");
		hours = Number.parseFloat(hours).toFixed(1);
		ot = Number.parseFloat(ot).toFixed(1);

		if (hours > 24) {
			alert('Are you sure you worked that many hours?')
		} else if (Date.parse(date) < Date.parse(props.currentPeriod.dateName) - 43200000) {
			alert('Shift date cannot be before start of pay period');
		} else if (Number.parseFloat(ot) > Number.parseFloat(hours)) {
			alert('Overtime can\'t exceed hours worked');
		} else if (hours.includes("-")) {
			alert('Hours cannot be negative');
		} else if (hours.includes("-")) {
			alert('Overtime cannot be negative');
		} else if (date === '') {
			alert('Shift date cannot be empty');
		} else if (hours === '' || ot === '' || isNaN(hours)) {
			alert('Fields cannot be blank or negative');
		} else if (hours <= 0) {
			alert('Hours must be greater than 0')
		} else if (ot < 0) {
			alert('Overtime cannot be less than 0')
		} else {

			date = "0" + date.substring(6, 11);

			if (date === props.currentShift.date && hours === props.currentShift.hours) {
				props.history.push("/wagetrak");
			} else {

				console.log("date: " + date + " hours: " + hours + " overtime: " + ot);
				// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName + "/" + props.currentShift.date);
				fetch(
					"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName + "/" + props.currentShift.date,
					{
						method: 'PUT',
						headers: {
							'Content-type': 'application/json',
							'Access-Control-Allow-Origin': 'localhost:3000/',
							'Access-Control-Allow-Methods': 'PUT'
						},
						body: JSON.stringify({
							date: date,
							hours: hours,
							overtime: ot
						})
					}
				).then(res => res.json()).then(res => {
					props.updateUser(res);
					props.history.push("/wagetrak");
				});
			}
		}

	}

	return (
		<React.Fragment>
			<article className="theModal">
				<div>
					<Button onClick={() => toggleDeleteShift()}>Delete Shift</Button>
				</div>
				<div>
					<form id="editShiftform" name="editShiftform">
						<Button onClick={() => editShift()} className="margin" htmlFor="nameEdit">Submit Changes</Button>
						<p className="margin">date</p>
						<input type="date" id="dateEdit" name="dateEdit" className="form-control anInput" defaultValue={props.currentShift.date} />
						<p className="margin">hours</p>
						<input type="number" id="hoursEdit" name="hoursEdit" className="form-control anInput" defaultValue={props.currentShift.hours} />
						<p className="margin">overtime</p>
						<input type="number" id="otEdit" name="otEdit" className="form-control anInput" defaultValue={props.currentShift.overtime} />
					</form>
				</div>
				{confirmDeleteState === true && <ConfirmDelete delete={() => deleteShift()} closeModal={() => toggleDeleteShift()} />}
				{confirmEditState === true && <ConfirmEdit submitChange={() => submitChange(
					document.getElementById('nameEdit'),
					document.getElementById('hoursEdit'),
					document.getElementById('otEdit')
				)} closeModal={() => editShift()} />}
			</article>
		</React.Fragment>
	);
}

export default withRouter(editShift);