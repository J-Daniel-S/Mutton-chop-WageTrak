import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import User from './user/User';
import Job from '../components/jobs/job/Job';
import Navbar from '../navigation/Navbar';
import PayPeriods from '../components/weeks/Weeks';
import PayPeriod from '../components/weeks/week/Week';
import Shift from '../components/shifts/shift/Shift';
import AddJob from './addjob/addJob';
import AddPeriod from './addWeek/addWeek';
import AddShift from './addShift/addShift';

import './WageTrak.css';

//I must needs ask regarding why the updates aren't working how I want them to
//currently working on delete and edit for shifts

//differentials after that. Use the modal strategy that you used for the editing modals

//After that check to find errors when clicking on null areas

//authcontext next with auth on the back end

const wageTrak = (props) => {
	const [ userState, setUserState ] = useState({});
	const [ jobState, setJobState ] = useState({});
	const [ weekState, setWeekState ] = useState({});
	const [ viewWeekState, setViewWeekState ] = useState({});
	const [ shiftState, setShiftState ] = useState({});
	// eslint-disable-next-line
	const [ jobsState, setJobsState ] = useState({});

	let userId = "5f0698a40555da4001e17b84";

	//initial user retrieval
	useEffect(() => {
		updateUser();
	}, []);

	const updateUser = () => {
		fetch(
			"http://localhost:8080/wageTrak/users/" + userId,
			{
				method: 'GET'
			}
		).then(res => res.json())
			.then(res => {
				//this is not a good solution for the long term
				/*
				eventually I'll have to add loading animations, possibly clear the state, then update it again
				*/
				if(res.name === "noSuchUser") {
					updateUser();
				} else {
					setUserState(res);
					setJobsState(res.jobs);
				}
			}
			).catch(res =>
				console.log('err' + res.data)
		);
		setUserState(userState);
	}

	const editUser = () => {
		console.log('edit user clicked');
	}

	const postPeriodHandler = (dateName) => {
		console.log('post period clicked');
		console.log(dateName);
	}

	const postShiftHandler = (date, hours) => {
		console.log('post shift clicked');
		// console.log(dateName);
	}

	const editPeriodHandler = () => {
		console.log("edit period clicked");
	}

	const updateJobHandler = () => {
		console.log("update job clicked");
	}

	const editShiftHandler = () => {
		console.log("edit shift clicked");
	}

	const addShiftHandler = () => {
		console.log("add shift handler");
	}

	let userData = "Loading...";

	if (userState) {
		userData = <User 
						user={userState} 
						setJob={setJobState} 
						updateUser={() => updateUser()} 
						editUser={() => editUser()}
					/>
	}

	return (
		<React.Fragment>
			<Navbar />
			<BrowserRouter>
				{window.location.pathname === "/" || window.location.pathname === "/wagetrak/wagetrak/job" ? <Redirect to="/wagetrak" /> : null}
				<Route
					path="/wagetrak/"
					render={() => userData }
				/>
				<Route
					path="/wagetrak/job"
					render={() => <Job 
									currentJob={jobState} 
									currentWeek={weekState} 
									setWeek={setWeekState} 
									updateJob={() => updateJobHandler()}
									user={userState}
									updateUser={() => updateUser()}
					/> }
				/>
				<Route
					path="/wagetrak/job/weeks"
					render={() => <PayPeriods 
									currentJob={jobState} 
									currentWeek={weekState} 
									setWeek={setViewWeekState} 
									viewWeek={viewWeekState}/> }
				/>
				<Route
					path="/wagetrak/job/weeks/week"
					render={() => <PayPeriod 
									currentWeek={weekState} 
									addShift={() => addShiftHandler()} 
									setShift={setShiftState} 
									editPeriod={() => editPeriodHandler()}
									updateUser={() =>updateUser()}
									user={userState}
									currentJob={jobState} 
								/> }
				/>
				<Route
					path="/wagetrak/job/weeks/viewWeek"
					render={() => <PayPeriod 
									currentWeek={viewWeekState} 
									addShift={() => addShiftHandler()} 
									setShift={setShiftState} 
									editPeriod={() => editPeriodHandler()}
									updateUser={() =>updateUser()}
									user={userState}
									currentJob={jobState} 
								/> }
				/>
				<Route
					path="/wagetrak/job/weeks/week/shift"
					render={() => <Shift 
									currentJob={jobState} 
									currentShift={shiftState} 
									editShift={() => editShiftHandler()} /> }
				/>
				<Route
					path="/wagetrak/job/weeks/viewWeek/shift"
					render={() => <Shift 
									currentJob={jobState} 
									currentShift={shiftState} 
									editShift={() => editShiftHandler()} />}
				/>
				<Route
					path="/wagetrak/add-job"
					render={() => <AddJob 
									userData={userState} 
									jobChange={() => updateUser()}/> }
				/>
				<Route
					path="/wagetrak/add-period"
					render={() => <AddPeriod 
									jobData={jobState} 
									updateUser={() => updateUser()} 
									addPeriod={() => postPeriodHandler() }
									userData={userState}
								/> }
				/>
				<Route
					path="/wagetrak/add-shift"
					render={() => <AddShift 
									jobData={jobState} 
									periodData={weekState}
									updateUser={() => updateUser()} 
									addShift={() => postShiftHandler() }
									userData={userState}
								/> }
				/>
				<Route
					path="/wagetrak/view-week/add-shift"
					render={() => <AddShift
									jobData={jobState} 
									periodData={viewWeekState}
									updateUser={() => updateUser()} 
									addShift={() => postShiftHandler() }
									userData={userState}
								/> }
				/>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default wageTrak;