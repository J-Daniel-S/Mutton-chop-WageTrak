import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import User from './user/User';
import Job from './jobs/job/Job';
import Navbar from '../navigation/Navbar';
import PayPeriods from './payPeriods/PayPeriods';
import PayPeriod from './payPeriods/payPeriod/PayPeriod';
import Shift from './shifts/shift/Shift';
import AddJob from './addjob/addJob';
import AddPeriod from './addPeriod/addPeriod';
import AddShift from './addShift/addShift';
import Loading from '../styles/Loading';
import UserContext from '../context/userContext';
import { useAuth } from '../context/authContext';

import Logout from '../modals/logout/logout';
import NavMenu from '../modals/menu/NavMenu';
import ReportBug from '../modals/reportBug/ReportBug';

import './WageTrak.css';

const wageTrak = (props) => {
	const [userState, setUserState] = useState({});
	const [jobState, setJobState] = useState({});
	const [periodState, setPeriodState] = useState({});
	const [viewPeriodState, setViewPeriodState] = useState({});
	const [shiftState, setShiftState] = useState({});
	const [jobsState, setJobsState] = useState({});
	const { authTokens } = useAuth();

	const [logout, setLogout] = useState(false);
	const [navMenu, setNavMenu] = useState(false);
	const [report, setReport] = useState(false);

	const contextArr = [userState, setUserState, jobState, setJobState, periodState, setPeriodState, viewPeriodState, setViewPeriodState,
		shiftState, setShiftState, jobsState, setJobsState];

	useEffect(() => {
		getUser();
	}, []);

	const getUser = () => {
		fetch(
			"http://localhost:8080/wageTrak/users/" + props.userId,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json, text/plain, */*',
					Authorization: authTokens
				}
			}
		).then(res => res.json())
			.then(res => {
					setUserState(res);
					//this exists simply to force a re-render when jobs is changed
					setJobsState(res.jobs);
			}).catch(res => {
				console.log('err: ' + res.data)
					setUserState(res);
					//this exists simply to force a re-render when jobs is changed
					setJobsState(res.jobs);
				}
			);
		setUserState(userState);
	}

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

	const toggleMenu = () => {
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
		} else if (window.location.pathname === "/wagetrak") {
			toggleLogout();
		}
	}

	//spinner
	let userData = <Loading />;

	if (userState) {
		userData = <User />
	}

	return (
		<React.Fragment>
			<UserContext.Provider value={[...contextArr]}>
				<BrowserRouter>
					<Navbar getUser={() => getUser()} toggleLogout={toggleLogout} toggleMenu={toggleMenu} toggleReportBug={toggleReport} goBack={goBack} />
					{window.location.pathname === "/" || window.location.pathname === "/wagetrak/wagetrak/job" ? <Redirect to="/wagetrak" /> : null}
					<Route
						path="/wagetrak/"
						render={() => userData}
					/>
					<Route
						path="/wagetrak/job"
						render={() => <Job />}
					/>
					<Route
						path="/wagetrak/job/periods"
						render={() => <PayPeriods />}
					/>
					<Route
						path="/wagetrak/job/periods/period"
						render={() => <PayPeriod
							currentPeriod={periodState}
						/>}
					/>
					<Route
						path="/wagetrak/job/periods/viewPeriod"
						render={() => <PayPeriod
							currentPeriod={viewPeriodState}
						/>}
					/>
					<Route
						path="/wagetrak/job/periods/period/shift"
						render={() => <Shift
							currentPeriod={periodState}
						/>}
					/>
					<Route
						path="/wagetrak/job/periods/viewPeriod/shift"
						render={() => <Shift
							currentPeriod={viewPeriodState}
						/>}
					/>
					<Route
						path="/wagetrak/add-job"
						render={() => <AddJob />}
					/>
					<Route
						path="/wagetrak/add-period"
						render={() => <AddPeriod />}
					/>
					<Route
						path="/wagetrak/add-shift"
						render={() => <AddShift
							currentPeriod={periodState}
						/>}
					/>
					<Route
						path="/wagetrak/view-period/add-shift"
						render={() => <AddShift
							currentPeriod={viewPeriodState}
						/>}
					/>
					{logout && !navMenu && !report && <Logout />}
					{navMenu && !logout && !report && <NavMenu getUser={() => getUser()} toggleMenu={() => toggleMenu()} toggleReport={() => toggleReport()} />}
					{report && !navMenu && !logout && <ReportBug toggleReport={() => toggleReport()} />}
				</BrowserRouter>
			</UserContext.Provider>
		</React.Fragment>
	);
}

export default wageTrak;