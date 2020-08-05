import React from 'react';

import { Navbar, BackButton, LogoutButton } from '../styles/styledComponents';

const navbar = (props) => {

	return (
		<React.Fragment>
			<Navbar className="navbar sticky-top">
				<div>
					<BackButton onClick={() => props.goBack()} className="fa fa-chevron-left fa-2x" aria-hidden="true"></BackButton>
				</div>
				<div>
					<i onClick={() => props.toggleMenu()} className="fa fa-bars fa-2x" aria-hidden="true"></i>
				</div>
				<div>
					<LogoutButton onClick={() => props.toggleLogout()} className="fa fa-external-link-square fa-2x" aria-hidden="true"></LogoutButton>
				</div>
			</Navbar>
		</React.Fragment>
	);
}

export default navbar;