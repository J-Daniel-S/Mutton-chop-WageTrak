import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import User from './user/User';
import Job from '../components/jobs/job/Job';
import Navbar from '../navigation/Navbar';
import PayPeriods from '../components/payPeriods/PayPeriods';
import PayPeriod from '../components/payPeriods/payPeriod/PayPeriod';
import Shift from '../components/shifts/shift/Shift';
import AddJob from './addjob/addJob';
import AddPeriod from './addPeriod/addPeriod';
import AddShift from './addShift/addShift';

import './WageTrak.css';

//I must needs ask regarding why the updates aren't working how I want them to

//authcontext next with auth on the back end

//Must add taxrate after auth and add user are implemented from the front end

//change week on the back end

//add a blocker that stops the adding of a shift before the beginning of a period

//prevent empty values on the front end and add checks on the back end to make sure they aren't able to edit old entries
//standardize variable names in props drills
//change all placeholders to default values

//must add logging on the back end

//useContext to undo props drilling?

//eliminate bugs that aren't due to reloading

const wageTrak = (props) => {
	const [ userState, setUserState ] = useState({});
	const [ jobState, setJobState ] = useState({});
	const [ periodState, setPeriodState ] = useState({});
	const [ viewPeriodState, setViewPeriodNow ] = useState({});
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

	let userData = "Loading...";

	if (userState) {
		userData = <User 
						currentUser={userState} 
						setJob={setJobState} 
						updateUser={() => updateUser()} 
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
									currentPeriod={periodState} 
									setPeriod={setPeriodState} 
									currentUser={userState}
									updateUser={() => updateUser()}
					/> }
				/>
				<Route
					path="/wagetrak/job/weeks"
					render={() => <PayPeriods 
									currentJob={jobState} 
									setPeriod={setViewPeriodNow} 
									currentPeriod={periodState}/> }
				/>
				<Route
					path="/wagetrak/job/weeks/week"
					render={() => <PayPeriod 
									currentPeriod={periodState} 
									setShift={setShiftState} 
									updateUser={() =>updateUser()}
									currentUser={userState}
									currentJob={jobState} 
								/> }
				/>
				<Route
					path="/wagetrak/job/weeks/viewWeek"
					render={() => <PayPeriod 
									currentPeriod={viewPeriodState} 
									setShift={setShiftState} 
									updateUser={() =>updateUser()}
									currentUser={userState}
									currentJob={jobState} 
								/> }
				/>
				<Route
					path="/wagetrak/job/weeks/week/shift"
					render={() => <Shift
									currentUser={userState} 
									currentJob={jobState} 
									currentShift={shiftState}
									currentPeriod={periodState} 
									updateUser={() => updateUser()} /> }
				/>
				<Route
					path="/wagetrak/job/weeks/viewWeek/shift"
					render={() => <Shift 
									currentUser={userState}
									currentJob={jobState} 
									currentShift={shiftState}
									currentPeriod={viewPeriodState}  
									updateUser={() => updateUser()} />}
				/>
				<Route
					path="/wagetrak/add-job"
					render={() => <AddJob 
									currentUser={userState} 
									updateUser={() => updateUser()}/> }
				/>
				<Route
					path="/wagetrak/add-period"
					render={() => <AddPeriod 
									jobData={jobState} 
									updateUser={() => updateUser()} 
									currentUser={userState}
								/> }
				/>
				<Route
					path="/wagetrak/add-shift"
					render={() => <AddShift 
									jobData={jobState} 
									periodData={periodState}
									updateUser={() => updateUser()} 
									currentUser={userState}
								/> }
				/>
				<Route
					path="/wagetrak/view-week/add-shift"
					render={() => <AddShift
									jobData={jobState} 
									periodData={viewPeriodState}
									updateUser={() => updateUser()} 
									currentUser={userState}
								/> }
				/>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default wageTrak;