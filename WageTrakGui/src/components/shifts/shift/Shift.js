import React, { useState, useContext } from 'react';

import EditShift from '../../../modals/editShift/EditShift';
import UserContext from '../../../context/userContext';
import './Shift.css';

const shift = (props) => {
	const [showModal, setModal] = useState(false);
	// eslint-disable-next-line
	const [userState, setUserState, jobState, setJobState, periodState, setPeriodState, viewPeriodState, setViewPeriodState,
		// eslint-disable-next-line
		shiftState] = useContext(UserContext);

	const toggleModal = () => {
		if (showModal === true) {
			setModal(false);
		} else {
			setModal(true);
		}
	}

	return (
		<article className="shift">
			<header className="shift-flex-div">
				<div className="nameDiv">
					<p className="shift-button-text">Shift: {shiftState.date} - ${shiftState.netPay.toFixed(2)}</p>
				</div>
				<div className="editDiv" onClick={() => toggleModal()} >
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
				</div>
			</header>
			{showModal === false && <section className="margin">
				<hr></hr>
				<p>Hours worked: {shiftState.hours}</p>
				{shiftState.overtime > 0 && <div>
					<hr></hr>
					<p>Overtime worked: {shiftState.overtime}</p>
				</div>}
				<hr></hr>
				<p>Gross pay: ${shiftState.grossPay.toFixed(2)}</p>
				<hr></hr>
				<p>Net pay: ${shiftState.netPay.toFixed(2)}</p>
				<hr></hr>
				<p>Taxes taken: ${shiftState.taxes.toFixed(2)}</p>
				<hr></hr>
			</section>}
			{showModal === true && <EditShift
				currentPeriod={props.currentPeriod}
				closeModal={() => toggleModal()}
			/>}
		</article>
	);
}

export default shift;