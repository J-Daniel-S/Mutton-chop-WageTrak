import React, { useState } from 'react';

import Logout from '../modals/logout/logout';
import NavMenu from '../modals/menu/NavMenu';
import ReportBug from '../modals/reportBug/ReportBug';

import { Navbar, BackButton, LogoutButton } from '../styles/styledComponents';

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
			<Navbar className="navbar sticky-top">
				<div>
					<BackButton onClick={() => goBack()} className="fa fa-chevron-left fa-2x" aria-hidden="true"></BackButton>
				</div>
				<div>
					<i onClick={() => toggleNavMenu()} className="fa fa-bars fa-2x" aria-hidden="true"></i>
				</div>
				<div>
					<LogoutButton onClick={() => toggleLogout()} className="fa fa-external-link-square fa-2x" aria-hidden="true"></LogoutButton>
				</div>
			</Navbar>
			{logout && !navMenu && !report && <Logout />}
			{navMenu && !logout && !report && <NavMenu toggleMenu={() => toggleNavMenu()} toggleReport={() => toggleReport()} />}
			{report && !navMenu && !logout && <ReportBug toggleReport={() => toggleReport()} /> }
		</React.Fragment>
	);
}

export default navbar;