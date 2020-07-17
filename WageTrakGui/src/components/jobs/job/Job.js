import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import EditJob from '../../../modals/editJob/editJob';
import './Job.css';

const job = (props) => {
	const [showModal, setModal] = useState(false);

	const clickedUserNameHandler = () => {
		props.history.push("/wagetrak");
	}

	const clickedJobNameHandler = () => {
		props.history.push("/wagetrak/job");
	}

	const weeksClicked = () => {
		props.history.push("/wagetrak/job/weeks");
	}

	const weekClicked = () => {
		props.history.push("/wagetrak/job/weeks/week");
	}

	const addWeekHandler = () => {
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
	let currentWeekNum = 0;
	let currentWeekNet = 0;

	if (props.currentJob) {
		jobTitle = props.currentJob.name;
		rate = props.currentJob.rate.toFixed(2);

		for (let period of props.currentJob.weeks) {
			totalGross += period.grossPay;
		}

		for (let period of props.currentJob.weeks) {
			totalNet += period.netPay;
		}

		for (let period of props.currentJob.weeks) {
			totalTax += period.taxes;
		}

		let weeks = [];


		//these three blocks grab the latest pay period
		for (let period of props.currentJob.weeks) {
			weeks.push(Date.parse(period.dateName));
		}

		currentWeekNum = Math.max.apply(Math, weeks);

		for (let period of props.currentJob.weeks) {
			if (Date.parse(period.dateName) === currentWeekNum) {
				props.setWeek(period);
				currentWeekNet = period.netPay;
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
							<p>Net pay this period: ${currentWeekNet.toFixed(2)}</p>
							<p>Hourly pay: ${rate}</p>
						</div>
					</section>
					<section className="section">
						<header>
							<p className="margin" onClick={() => weeksClicked()}>Pay periods section</p>
						</header>
						<div className="flexDiv">
							<p className="margin nameDiv">
								Current: {props.currentWeek && <span onClick={() => weekClicked()}>{props.currentWeek.dateName}</span>}
							</p>
							<p className="editDiv">add shift <i className="fa fa-plus" aria-hidden="true" onClick={() => addShiftHandler()}></i></p>
						</div>
					</section>
					<section onClick={() => addWeekHandler()} className="buttonDiv section">
						<p>Start new pay period</p>
					</section>
				</div>}
				{showModal === true && <EditJob userChange={props.updateUser} user={props.user} job={props.currentJob} closeModal={() => toggleModal()} />}
			</article>
		</React.Fragment>
	);
}

export default withRouter(job);