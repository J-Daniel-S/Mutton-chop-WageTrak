import React from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

const confirmEditUser = (props) => {

	return (
		<React.Fragment>
			<Modal.Dialog>
				<Modal.Header>
					<p>Really change name?</p>
				</Modal.Header>
				<Modal.Body>
					<ButtonGroup className="mb-2">
						<Button onClick={() => props.changeName()}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></Button>
						<Button onClick={() => props.closeModal()}><i className="fa fa-times" aria-hidden="true"></i></Button>
					</ButtonGroup>
				</Modal.Body>
			</Modal.Dialog>
		</React.Fragment>
	);
}

export default confirmEditUser;