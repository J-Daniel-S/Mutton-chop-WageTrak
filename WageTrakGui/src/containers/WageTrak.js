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

//must add signup page

//Proper function to front end login page after spring security is added

//create a util on the back end that does the tasks preventing the different objects from being pojos

//standardize variable names in props drills

//must add logging on the back end

//useContext to undo props drilling?

//Spring Security

//eliminate bugs that aren't due to reloading

//add error handling

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
				//this is not a good solution for the long term
				/*
				eventually I'll have to add loading animations, possibly clear the state, then update it again
				*/
				if(res.name === "noSuchUser") {
					getUser();
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
						updateUser={setUserState} 
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
									updateUser={setUserState}
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
									updateUser={setUserState}
									currentUser={userState}
									currentJob={jobState} 
								/> }
				/>
				<Route
					path="/wagetrak/job/weeks/viewWeek"
					render={() => <PayPeriod 
									currentPeriod={viewPeriodState} 
									setShift={setShiftState} 
									updateUser={setUserState}
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
									updateUser={setUserState} /> }
				/>
				<Route
					path="/wagetrak/job/weeks/viewWeek/shift"
					render={() => <Shift 
									currentUser={userState}
									currentJob={jobState} 
									currentShift={shiftState}
									currentPeriod={viewPeriodState}  
									updateUser={setUserState} />}
				/>
				<Route
					path="/wagetrak/add-job"
					render={() => <AddJob 
									currentUser={userState} 
									updateUser={setUserState}/> }
				/>
				<Route
					path="/wagetrak/add-period"
					render={() => <AddPeriod 
									currentJob={jobState} 
									updateUser={setUserState} 
									currentUser={userState}
								/> }
				/>
				<Route
					path="/wagetrak/add-shift"
					render={() => <AddShift 
									jobData={jobState} 
									periodData={periodState}
									updateUser={setUserState} 
									currentUser={userState}
								/> }
				/>
				<Route
					path="/wagetrak/view-week/add-shift"
					render={() => <AddShift
									jobData={jobState} 
									periodData={viewPeriodState}
									updateUser={setUserState} 
									currentUser={userState}
								/> }
				/>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default wageTrak;