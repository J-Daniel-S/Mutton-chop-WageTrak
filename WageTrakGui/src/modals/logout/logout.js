import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Fade } from 'react-bootstrap';

const logout = (props) => {

	const logout = () => {
		// props.history.push("/wagetrak-login");
		console.log("Logout");
	}

	return (
		<Fade appear in>
			<Modal.Dialog>
				<Button variant="secondary" size="sm" onClick={() => logout()} className="margin" htmlFor="name">Logout</Button>
			</Modal.Dialog>
		</Fade>
	);
}

export default withRouter(logout);