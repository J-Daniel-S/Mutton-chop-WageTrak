import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ConfirmDelete from '../confirm/ConfirmDelete';
import ConfirmEdit from '../confirm/ConfirmEdit';
import './editPeriod.css';

const editPeriod = (props) => {
	const [confirmDeleteState, setConfirmDeleteState] = useState({});
	const [confirmEditState, setConfirmEditState] = useState({});

	const toggleDeletePeriod = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deletePeriod = () => {
		// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.week.dateName);
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName,
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

	const editPeriod = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const submitChange = (dateName) => {

		dateName = dateName.value.replace("?", "").replace("/", "-");
		dateName = dateName.replace("/", "-");
		
		if (dateName === "" || dateName === " ") {
			dateName = props.currentPeriod.dateName
		}
		
		if (dateName === props.currentPeriod.dateName) {
			props.history.push("/wagetrak");
		} else {

		console.log("dateName: " + dateName);
		// console.log("http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName);
		fetch(
			"http://localhost:8080/wageTrak/" + props.currentUser.id + "/" + props.currentJob.name + "/" + props.currentPeriod.dateName,
			{
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'PUT'
				},
				body: JSON.stringify({
					dateName: dateName,
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
						<Button onClick={() => toggleDeletePeriod()}>Delete Pay Period</Button>
					</div>
					<div>
						<form>
							<Button onClick={() => editPeriod()} className="margin" htmlFor="nameEdit">Edit Period</Button>
							<input type="text" id="nameEdit" className="form-control anInput" placeholder={props.currentPeriod.dateName} />
						</form>
					</div>
				{confirmDeleteState === true && <ConfirmDelete delete={() => deletePeriod()} closeModal={() => toggleDeletePeriod()} />}
				{confirmEditState === true && <ConfirmEdit submitChange={() => submitChange(document.getElementById('nameEdit')
																					)} closeModal={() => editPeriod()} />} 
			</article>
		</React.Fragment>
	);
}

export default withRouter(editPeriod);