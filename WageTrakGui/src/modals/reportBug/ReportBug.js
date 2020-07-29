import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

import UserContext from '../../context/userContext';

const ReportBug = (props) => {
	const [userState] = useContext(UserContext);

	const submit = (event) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		let text = form.formBasicReport.value;

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
		<Modal.Dialog>
			<Modal.Body>
				<Form onSubmit={submit}>
					<Form.Group controlId="formBasicReport">
						<Form.Control type="text" placeholder="Tell us what's wrong" />
					</Form.Group>
					<Button block size="sm" variant="secondary" type="submit">Submit</Button>
				</Form>
			</Modal.Body>
		</Modal.Dialog>
	);
}

export default withRouter(ReportBug);