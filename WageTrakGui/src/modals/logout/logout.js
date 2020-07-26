import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import './logout.css';

const logout = (props) => {

	const logout = () => {
		// props.history.push("/wagetrak-login");
		console.log("Logout");
	}

	return (
		<Modal.Dialog>
			<Modal.Header className="logout">
				<Button onClick={() => logout()} className="margin" htmlFor="name">Logout</Button>
			</Modal.Header>
		</Modal.Dialog>
	);
}

export default withRouter(logout);