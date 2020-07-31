import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import User from './user/User';
import Job from './jobs/job/Job';
import Navbar from '../navigation/Navbar';
import PayPeriods from './payPeriods/PayPeriods';
import PayPeriod from './payPeriods/payPeriod/PayPeriod';
import Shift from './shifts/shift/Shift';
import AddUser from '../containers/addUser/addUser';
import AddJob from './addjob/addJob';
import AddPeriod from './addPeriod/addPeriod';
import AddShift from './addShift/addShift';
import UserContext from '../context/userContext';

import './WageTrak.css';

//code logout for navbar after security

//Spring Security

//add tests to back end

//add login logic to login page

//remove hard coded user id from WageTrak.js

//code signup for back end

const wageTrak = (props) => {
	const [userState, setUserState] = useState({});
	const [jobState, setJobState] = useState({});
	const [periodState, setPeriodState] = useState({});
	const [viewPeriodState, setViewPeriodState] = useState({});
	const [shiftState, setShiftState] = useState({});
	const [jobsState, setJobsState] = useState({});

	const contextArr = [userState, setUserState, jobState, setJobState, periodState, setPeriodState, viewPeriodState, setViewPeriodState,
		shiftState, setShiftState, jobsState, setJobsState];

	//check here if you're not loading a user on render
	let userId = "5f1d3876aba88b644faeff0d";

	useEffect(() => {
		getUser();
	}, []);

	const getUser = () => {
		fetch(
			"http://localhost:8080/wageTrak/users/" + userId,
			{
				method: 'GET'
			}
		).then(res => res.json())
			.then(res => {
				if (res.name === "noSuchUser") {
					getUser();
				} else {
					setUserState(res);
					setJobsState(res.jobs);
				}
			}
			).catch(res => {
				console.log('err' + res.data)
				if (res.name === "noSuchUser") {
					getUser();
				} else {
					setUserState(res);
					setJobsState(res.jobs);
				}
			});
		setUserState(userState);
	}


	let userData = "Loading...";

	if (userState) {
		userData = <User />
	}

	return (
		<React.Fragment>
			<UserContext.Provider value={[...contextArr]}>
				<BrowserRouter>
					<Navbar />
					{window.location.pathname === "/" || window.location.pathname === "/wagetrak/wagetrak/job" ? <Redirect to="/wagetrak" /> : null}
					<Route
						path="/wagetrak-signup"
						render={() => <AddUser />}
					/>
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
				</BrowserRouter>
			</UserContext.Provider>
		</React.Fragment>
	);
}

export default wageTrak;