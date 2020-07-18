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
		).then(res => {
			console.log(res);
			setTimeout(props.updateUser(), 1100);
			setTimeout(props.history.push("/wagetrak"), 1300);
		});
	}

	const editShift = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const submitChange = (date, hours, ot) => {

		date = date.value.replace("?", "").replace("/", "-");
		date = date.replace("/", "-");
		hours = Number.parseFloat(hours.value).toFixed(1);
		let overtime = Number.parseFloat(ot.value).toFixed(1);

		if (hours === "" || hours === " " || hours.isNaN()) {
			hours = props.currentShift.hours;
		}
		
		if (overtime === "" || overtime === " ") {
			overtime = props.currentShift.overtime
		}
		
		if (date === props.currentShift.date && hours.value === props.currentShift.hours) {
			props.history.push("/wagetrak");
		} else {

		console.log("date: " + date + " hours: " + hours + " overtime: " + overtime);
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
					overtime: overtime
				})
			}
		).then(res => {
			console.log(res);
			setTimeout(props.updateUser(), 800);
			setTimeout(props.history.push("/wagetrak"), 1100);
		});
		}

	}

	return (
		<React.Fragment>
			<article className="theModal">
					<div>
						<Button onClick={() => toggleDeleteShift()}>Delete Shift</Button>
					</div>
					<div>
						<form>
							<Button onClick={() => editShift()} className="margin" htmlFor="nameEdit">Submit Changes</Button>
							<p className="margin">date</p>
							<input type="text" id="nameEdit" className="form-control anInput" defaultValue={props.currentShift.date} />
							<p className="margin">hours</p>
							<input type="number" id="hoursEdit" className="form-control anInput" defaultValue={props.currentShift.hours} />
							<p className="margin">overtime</p>
							<input type="number" id="otEdit" className="form-control anInput" defaultValue={props.currentShift.overtime} />
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