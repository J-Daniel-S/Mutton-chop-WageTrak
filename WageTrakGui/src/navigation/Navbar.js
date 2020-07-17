import React from 'react';

import './Navbar.css';

const navbar = (props) => {
	return (
		<React.Fragment>
			<div className="navbar sticky-top nav-extra">
				<div className="container">
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default navbar;