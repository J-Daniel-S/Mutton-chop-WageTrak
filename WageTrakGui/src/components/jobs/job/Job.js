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
		props.history.push("/wagetrak/job/weeks");
	}

	const periodClicked = () => {
		props.history.push("/wagetrak/job/weeks/week");
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
				<header className="flexDiv">
					<div className="nameDiv" onClick={() => clickedJobNameHandler()}>
						<p className="capitalize margin bold" >{jobTitle}</p>
					</div>
					{window.location.pathname === "/wagetrak/job" &&
						<div className="editDiv" onClick={() => toggleModal()}>
							<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
						</div>}
				</header>
				{!showModal && <div>
					<section className="section">
						<div className="margin">
							<p>Total gross pay: ${totalGross.toFixed(2)}</p>
							<p>Net: ${totalNet.toFixed(2)}</p>
							<p>Taxes: ${totalTax.toFixed(2)}</p>
							<p>Net pay this period: ${currentPeriodNet.toFixed(2)}</p>
							<p>Hourly pay: ${rate}</p>
						</div>
					</section>
					<section className="section">
						<header>
							<p className="margin" onClick={() => periodsClicked()}>Pay periods section</p>
						</header>
						<div className="flexDiv">
							<p className="margin nameDiv">
								Current: {periodState && <span onClick={() => periodClicked()}>{periodState.dateName}</span>}
							</p>
							{periodState.dateName &&
								<p className="editDiv">add shift <i className="fa fa-plus" aria-hidden="true" onClick={() => addShiftHandler()}></i></p>}
						</div>
					</section>
					<section onClick={() => addPeriodHandler()} className="buttonDiv section">
						<p>Start new pay period</p>
					</section>
				</div>}
				{showModal === true && <EditJob />}
			</article>
		</React.Fragment>
	);
}

export default withRouter(job);