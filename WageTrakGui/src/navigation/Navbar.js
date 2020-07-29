import React, { useState } from 'react';

import Logout from '../modals/logout/logout';
import NavMenu from '../modals/menu/NavMenu';
import ReportBug from '../modals/reportBug/ReportBug';
import './Navbar.css';

const navbar = (props) => {
	const [logout, setLogout] = useState(false);
	const [navMenu, setNavMenu] = useState(false);
	const [report, setReport] = useState(false);

	const toggleLogout = () => {
		if (!logout) {
			if (navMenu) {
				setNavMenu(false);
			}
			setLogout(true);
		} else {
			setLogout(false);
		}
	}

	const toggleNavMenu = () => {
		if (!navMenu && report) {
			if (logout) {
				setLogout(false);
			}
			setReport(false);
			setNavMenu(false);
		} else if (!navMenu) {
			if (logout) {
				setLogout(false);
			}
			setNavMenu(true);
		} else {
			setNavMenu(false);
		}
	}

	const toggleReport = () => {
		if (!report) {
			setNavMenu(false);
			setReport(true);
		} else {
			setReport(false);
		}
	}

	const goBack = () => {
		if (window.location.pathname !== "/wagetrak") {
			window.history.back();
		}
	}

	return (
		<React.Fragment>
			<section className="navbar sticky-top nav-extra">
				<div>
					<i onClick={() => goBack()} className="fa fa-chevron-left fa-2x back-button" aria-hidden="true"></i>
				</div>
				<div>
					<i onClick={() => toggleNavMenu()} className="fa fa-bars fa-2x nav-toggle" aria-hidden="true"></i>
				</div>
				<div>
					<i onClick={() => toggleLogout()} className="fa fa-external-link-square fa-2x logout-button" aria-hidden="true"></i>
				</div>
			</section>
			{logout && !navMenu && !report && <Logout />}
			{navMenu && !logout && !report && <NavMenu toggleMenu={() => toggleNavMenu()} toggleReport={() => toggleReport()} />}
			{report && !navMenu && !logout && <ReportBug toggleReport={() => toggleReport()} /> }
		</React.Fragment>
	);
}

export default navbar;