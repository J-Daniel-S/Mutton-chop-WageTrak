import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Fade } from 'react-bootstrap';

import { useAuth } from '../../context/authContext';
import ToggleContext from '../../context/toggleContext';

const logout = (props) => {
	const { setAuthTokens } = useAuth();
	const [ setLogout ] = useContext(ToggleContext);

	const logout = () => {
		localStorage.setItem("tokens", "");
		setAuthTokens("");
		window.location.reload();
	}

	return (
		<Fade appear in>
			<Modal.Dialog>
				<Modal.Header closeButton onClick={() => setLogout(false)}>Logout</Modal.Header>
				<Modal.Body>
					<Button block variant="secondary" onClick={() => logout()}>Logout</Button>
				</Modal.Body>
			</Modal.Dialog>
		</Fade>
	);
}

export default withRouter(logout);