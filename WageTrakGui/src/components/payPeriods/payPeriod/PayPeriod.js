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
		if (window.location.pathname === "/wagetrak/job/periods/viewPeriod/shift") {
			props.history.push("/wagetrak/job/periods/viewPeriod");
		} else if (window.location.pathname !== "/wagetrak/job/periods/viewPeriod") {
			props.history.push("/wagetrak/job/periods/period");
		}
	}

	const shiftClicked = (s) => {
		setShiftState(s)
		if (window.location.pathname === "/wagetrak/job/periods/viewPeriod") {
			props.history.push("/wagetrak/job/periods/viewPeriod/shift");
		} else {
			props.history.push("/wagetrak/job/periods/period/shift");
		}
	}

	const addShiftHandler = () => {
		if (window.location.pathname === "/wagetrak/job/periods/viewPeriod") {
			props.history.push("/wagetrak/view-period/add-shift");
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
				<header className="flex-div a-button" onClick={() => titleClicked()}>
					<div className="period-name-div">
						<p className="period-button-text">Pay period: {props.currentPeriod.dateName}</p>
					</div>
					{(window.location.pathname === "/wagetrak/job/periods/period" ||
						window.location.pathname === "/wagetrak/job/periods/viewPeriod") &&
						<div className="editDiv" onClick={() => toggleModal()}>
							<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
						</div>}
				</header>
				{showModal === false && <div>
					<section>
						<div className="margin">
							<p>Total pay this pay period: ${props.currentPeriod.grossPay.toFixed(2)}</p>
							<p>After taxes: ${props.currentPeriod.netPay.toFixed(2)}</p>
							<p>Taxes taken: ${props.currentPeriod.taxes.toFixed(2)}</p>
						</div>
					</section>
					<section onClick={() => addShiftHandler()} className="a-button center-text">
						<p>Add Shift</p>
					</section>
					<section>
						<header className="shiftHeader">
							<p>Shifts this pay period:</p>
						</header>
						<div className="scrollable">
							<ul className="shift-list">
								{props.currentPeriod && shifts.map(s => (
									<li key={s.date} className="shift-thumbnail" onClick={() => shiftClicked(s)}>
										<div>
											{s.date}: Net pay - ${s.netPay.toFixed(2)} - {s.hours} hours worked
							</div>
									</li>))
								}
							</ul>
						</div>
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