import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import UserContext from '../../context/userContext';
import './NavMenu.css';

const navMenu = (props) => {
	const [userState, updateUser] = useContext(UserContext);

	const editUser = () => {

		let rate = document.forms["form"]["rate"].value;

		if (isNaN(rate)) {
			rate = userState.taxRate;
		} else if (rate === '' || rate === ' ') {
			alert("rate cannot be blank");
		} else if (Number.parseInt(rate) > 100) {
			alert("tax cannot be greater than 100%");
		} else {
			rate = Number.parseInt(rate) / 100;

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
						name: userState.name,
						taxRate: rate,
						id: userState.id
					})
				}
			).then(res => res.json()).then(res => {
				updateUser(res);
				props.toggleMenu();
			});
		}
	}

	return (
		<Modal.Dialog className="nav-menu">
			<Modal.Header>
				<ul className="menu-list">
					<li className="menu-item">
						<form id="form" name="form">
							<Button onClick={() => editUser()} className="margin" htmlFor="rate">Edit tax rate</Button>
							<input type="number" id="rate" name="rate" defaultValue={userState.taxRate * 100} /><span>%</span>
						</form>
					</li>
					<li className="menu-item">
						<Button onClick={() => props.toggleReport()}>Report bug</Button>
					</li>
				</ul>
			</Modal.Header>
		</Modal.Dialog>
	);
}

export default withRouter(navMenu);