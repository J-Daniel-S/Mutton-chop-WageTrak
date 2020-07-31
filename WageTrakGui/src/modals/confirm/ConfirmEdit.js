import React from 'react';
import { Modal, Button, Fade } from 'react-bootstrap';

const confirmEdit = (props) => {

	return (
		<React.Fragment>
			<Fade appear in>
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>Really make changes?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Button block size="sm" variant="secondary" onClick={() => props.submitChange()}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></Button>
						<Button block size="sm" variant="secondary" onClick={() => props.closeModal()}><i className="fa fa-times" aria-hidden="true"></i></Button>
					</Modal.Body>
				</Modal.Dialog>
			</Fade>
		</React.Fragment>
	);
}

export default confirmEdit;