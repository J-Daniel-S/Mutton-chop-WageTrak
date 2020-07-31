import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Fade } from 'react-bootstrap';

import { useAuth } from '../../context/authContext'; 

const logout = (props) => {
	const { setAuthTokens } = useAuth();

	const logout = () => {
		setAuthTokens("");
		window.location.reload();
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