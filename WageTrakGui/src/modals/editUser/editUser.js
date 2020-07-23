import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import ConfirmDeleteUser from './confirmDeleteUser/confirmDeleteUser';
import ConfirmEditUser from './confirmEditUser/confirmEditUser';
import './editUser.css';

const editUser = (props) => {
	const [ confirmDeleteState, setConfirmDeleteState ] = useState({});
	const [ confirmEditState, setConfirmEditState ] = useState({});

	const toggleDeleteUser = () => {
		if (confirmDeleteState === true) {
			setConfirmDeleteState(false);
		} else {
			setConfirmDeleteState(true);
		}
	}

	const deleteUser = () => {
		fetch(
			"http://localhost:8080/wageTrak/users/" + props.user.id,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Origins': 'http://localhost:3000',
					'Access-Control-Allow-Methods': 'DELETE'
				}
			}
		).then(res => {
			//return to login here
			console.log(res);
			setTimeout(props.userChange(), 800);
			setTimeout(props.history.push("/wagetrak"), 1100);
		});
	}

	const editUser = () => {
		if (confirmEditState === true) {
			setConfirmEditState(false);
		} else {
			setConfirmEditState(true);
		}
	}

	const changeName = (name) => {

		name = name.value.replace("?", "");
		fetch(
			"http://localhost:8080/wageTrak/users",
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': 'http://localhost:3000'
				},
				mode: 'cors',
				body: JSON.stringify({
					name: name.toLowerCase(),
					id: props.user.id,
					jobs: props.user.jobs
				})
			}
		).then(res => res.json()).then(res => {
			props.updateUser(res);
			editUser(false);
			props.closeModal();
		});

	}

	return (
		<React.Fragment>
			<Modal.Dialog>
				<Modal.Header>
					<Button onClick={() => toggleDeleteUser()}>Delete User</Button>
				</Modal.Header>
				<Modal.Body>
					<form>
						<Button onClick={() => editUser()} className="margin" htmlFor="name">Edit name</Button>
						<input type="text" id="nameEdit" className="form-control anInput" placeholder="e.g. Roger Lord Mortimer" required />
					</form>
				</Modal.Body>
			</Modal.Dialog>
			{confirmDeleteState === true && <ConfirmDeleteUser deleteUser={() => deleteUser()} closeModal={() => toggleDeleteUser()} />}
			{confirmEditState === true && <ConfirmEditUser changeName={() => changeName(document.getElementById('nameEdit'))} closeModal={() => editUser()} />}
		</React.Fragment>
	);
}

export default withRouter(editUser);