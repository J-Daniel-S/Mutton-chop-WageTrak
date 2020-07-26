import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import UserContext from '../../context/userContext';
import './ReportBug.css';

const ReportBug = (props) => {
	const [userState] = useContext(UserContext);

	const submit = () => {

		let text = document.forms["reportForm"]["reportText"].value;

		if (!text) {
			props.toggleReport();
		} else if (text === '' || text === ' ') {
			props.toggleReport();
		} else {

			fetch(
				"http://localhost:8080/wageTrak/bugs",
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'http://localhost:3000'
					},
					mode: 'cors',
					body: JSON.stringify({
						userId: userState.id,
						text: text
					})
				}
			).then(props.toggleReport());
		}
	}

	return (
		<Modal.Dialog className="nav-menu">
			<Modal.Header>
				<form id="reportForm" name="reportForm">
					<input type="text" id="reportText" name="reportText" className="input" placeholder="tell us what's wrong"/>
					<Button onClick={() => submit()} htmlFor="text">Submit</Button>
				</form>
			</Modal.Header>
		</Modal.Dialog>
	);
}

export default withRouter(ReportBug);