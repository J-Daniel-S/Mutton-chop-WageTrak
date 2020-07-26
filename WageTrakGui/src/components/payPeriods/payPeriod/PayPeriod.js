import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import EditPeriod from '../../../modals/editPeriod/editPeriod';
import UserContext from '../../../context/userContext';
import './Period.css';

const payPeriod = (props) => {
	const [showModal, setModal] = useState(false);
	// eslint-disable-next-line
	const [userState, setUserState, jobState, setJobState, periodState, setPeriodState, viewPeriodState, setViewPeriodState,
		// eslint-disable-next-line
		shiftState, setShiftState] = useContext(UserContext);

	const titleClicked = () => {
		if (window.location.pathname === "/wagetrak/job/weeks/viewWeek/shift") {
			props.history.push("/wagetrak/job/weeks/viewWeek");
		} else if (window.location.pathname !== "/wagetrak/job/weeks/viewWeek") {
			props.history.push("/wagetrak/job/weeks/week");
		}
	}

	const shiftClicked = (s) => {
		setShiftState(s)
		if (window.location.pathname === "/wagetrak/job/weeks/viewWeek") {
			props.history.push("/wagetrak/job/weeks/viewWeek/shift");
		} else {
			props.history.push("/wagetrak/job/weeks/week/shift");
		}
	}

	const addShiftHandler = () => {
		if (window.location.pathname === "/wagetrak/job/weeks/viewWeek") {
			props.history.push("/wagetrak/view-week/add-shift");
		} else {
			props.history.push("/wagetrak/add-shift");
		}
	}

	const toggleModal = () => {
		if (showModal === true) {
			setModal(false);
		} else {
			setModal(true);
		}
	}

	let shifts = props.currentPeriod.shifts.sort((a, b) => a.date < b.date ? 1 : -1);

	return (
		<React.Fragment>
			<article className="period">
				<header className="flexDiv" onClick={() => titleClicked()}>
					<div className="nameDiv">
						<p className="margin">Pay period: {props.currentPeriod.dateName}</p>
					</div>
					{(window.location.pathname === "/wagetrak/job/weeks/week" ||
						window.location.pathname === "/wagetrak/job/weeks/viewWeek") &&
						<div className="editDiv" onClick={() => toggleModal()}>
							<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
						</div>}
				</header>
				{showModal === false && <div>
					<section>
						<p className="margin">Pay this period</p>
						<div className="margin">
							<p>Gross pay: ${props.currentPeriod.grossPay.toFixed(2)}</p>
							<p>Net pay: ${props.currentPeriod.netPay.toFixed(2)}</p>
							<p>Taxes taken: ${props.currentPeriod.taxes.toFixed(2)}</p>
						</div>
					</section>
					<section onClick={() => addShiftHandler()} className="buttonDiv">
						<p>Add Shift</p>
					</section>
					<section>
						<header className="shiftHeader">
							<p>Shifts:</p>
						</header>
						<ul className="shift-list">
							{props.currentPeriod && shifts.map(s => (
								<li key={s.date} className="margin" onClick={() => shiftClicked(s)}>
									<div>
										{s.date}: ${s.netPay.toFixed(2)} {s.hours} hours
							</div>
								</li>))
							}
						</ul>
					</section>
				</div>}
				{showModal === true && <EditPeriod
					closeModal={() => toggleModal()}
					currentPeriod={props.currentPeriod}
				/>}
			</article>
		</React.Fragment>
	);
}

export default withRouter(payPeriod);