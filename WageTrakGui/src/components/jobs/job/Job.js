import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import EditJob from '../../../modals/editJob/editJob';
import UserContext from '../../../context/userContext';
import './Job.css';

const job = (props) => {
	const [showModal, setModal] = useState(false);
	// eslint-disable-next-line
	const [userState, setUserState, jobState, setJobState, periodState, setPeriodState] = useContext(UserContext);

	const clickedUserNameHandler = () => {
		props.history.push("/wagetrak");
	}

	const clickedJobNameHandler = () => {
		props.history.push("/wagetrak/job");
	}

	const periodsClicked = () => {
		props.history.push("/wagetrak/job/periods");
	}

	const periodClicked = () => {
		props.history.push("/wagetrak/job/periods/period");
	}

	const addPeriodHandler = () => {
		props.history.push("/wagetrak/add-period");
	}

	const addShiftHandler = () => {
		props.history.push("/wagetrak/add-shift");
	}

	let jobTitle = "";
	let rate = "";
	let totalGross = 0;
	let totalNet = 0;
	let totalTax = 0;
	let currentPeriodNum = 0;
	let currentPeriodNet = 0;

	if (jobState) {
		jobTitle = jobState.name;
		rate = jobState.rate.toFixed(2);

		for (let period of jobState.payPeriods) {
			totalGross += period.grossPay;
		}

		for (let period of jobState.payPeriods) {
			totalNet += period.netPay;
		}

		for (let period of jobState.payPeriods) {
			totalTax += period.taxes;
		}

		let payPeriods = [];


		//these three blocks grab the latest pay period
		for (let period of jobState.payPeriods) {
			payPeriods.push(Date.parse(period.dateName));
		}

		currentPeriodNum = Math.max.apply(Math, payPeriods);

		for (let period of jobState.payPeriods) {
			if (Date.parse(period.dateName) === currentPeriodNum) {
				setPeriodState(period);
				currentPeriodNet = period.netPay;
			}
		}

	}

	const toggleModal = () => {
		if (showModal === true) {
			setModal(false);
		} else {
			setModal(true);
		}

	}

	return (
		<React.Fragment>
			<div className="job-backdrop" onClick={() => clickedUserNameHandler()}></div>
			<article className="job" >
				<header className="flexDiv top-button">
					<div className="name-div" onClick={() => clickedJobNameHandler()}>
						<p className="job-button-text margin" >{jobTitle}</p>
					</div>
					{window.location.pathname === "/wagetrak/job" &&
						<div className="editDiv" onClick={() => toggleModal()}>
							<i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
						</div>}
				</header>
				{!showModal && <div>
					<section>
						<div className="margin">
							<hr></hr>
							<p>Total pay before taxes: ${totalGross.toFixed(2)}</p>
							<hr></hr>
							<p>Total pay after taxes: ${totalNet.toFixed(2)}</p>
							<hr></hr>
							<p>Estimated taxes taken out: ${totalTax.toFixed(2)}</p>
							<hr></hr>
							<p>Pay after taxes this period: ${currentPeriodNet.toFixed(2)}</p>
							<hr></hr>
							<p>Hourly pay: ${rate}</p>
							<hr></hr>
						</div>
					</section>
					<section>
						<header className="button-look">
							<p className="job-button-text center-text" onClick={() => periodsClicked()}>View Pay Periods</p>
						</header>
						<div className="flexDiv">
							<p className="margin name-div">
								Current pay period: {periodState && <span className="small-button" onClick={() => periodClicked()}>{periodState.dateName}</span>}
							</p>
							{periodState.dateName &&
								<p className="editDiv shadow margin">add shift <i className="fa fa-plus fa-lg" aria-hidden="true" onClick={() => addShiftHandler()}></i></p>}
						</div>
					</section>
					<section className="bottom-button button-look" onClick={() => addPeriodHandler()} >
						<p className="job-button-text center-text">Start new pay period</p>
					</section>
				</div>}
				{showModal === true && <EditJob />}
			</article>
		</React.Fragment>
	);
}

export default withRouter(job);