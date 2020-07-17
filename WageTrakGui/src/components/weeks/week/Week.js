import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import EditPeriod from '../../../modals/editPeriod/editPeriod';
import './Week.css';

const payPeriod = (props) => {
	const [showModal, setModal] = useState(false);

	const titleClicked = () => {
		if (window.location.pathname === "/wagetrak/job/weeks/viewWeek/shift") {
			props.history.push("/wagetrak/job/weeks/viewWeek");
		} else if (window.location.pathname !== "/wagetrak/job/weeks/viewWeek") {
			props.history.push("/wagetrak/job/weeks/week");
		}
	}

	const shiftClicked = (s) => {
		props.setShift(s)
		if (window.location.pathname === "/wagetrak/job/weeks/viewWeek") {
			props.history.push("/wagetrak/job/weeks/viewWeek/shift");
		} else {
			props.history.push("/wagetrak/job/weeks/week/shift");
		}

		// console.log(s);
	}

	const addShiftHandler = () => {
		if (window.location.pathname === "/wagetrak/job/weeks/viewWeek") {
			props.history.push("/wagetrak/view-week/add-shift");
		} else {
			props.history.push("/wagetrak/add-shift");
			console.log('else block reached')
		}

		// props.addShift();
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
			<article className="week">
				<header className="flexDiv" onClick={() => titleClicked()}>
					<div className="nameDiv">
						<p className="margin">Pay period: {props.currentWeek.dateName}</p>
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
							<p>Gross pay: ${props.currentWeek.grossPay}</p>
							<p>Net pay: ${props.currentWeek.netPay}</p>
							<p>Taxes taken: ${props.currentWeek.taxes}</p>
							<p>Night differential</p>
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
							{props.currentWeek && props.currentWeek.shifts.map(s => (
								<li key={s.date} className="margin" onClick={() => shiftClicked(s)}>
									<div>
										{s.date}: ${s.netPay} {s.hours} hours
							</div>
								</li>))
							}
						</ul>
					</section>
				</div>}
				{showModal === true && <EditPeriod 
											userChange={props.updateUser} 
											user={props.user} 
											job={props.currentJob} 
											closeModal={() => toggleModal()}
											week={props.currentWeek} 
										/>}
			</article>
		</React.Fragment>
	);
}

export default withRouter(payPeriod);