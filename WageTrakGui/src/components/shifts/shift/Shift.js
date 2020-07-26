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
			<header className="flexDiv">
				<div className="nameDiv">
					<p className="margin">Shift: {shiftState.date} - ${shiftState.netPay.toFixed(2)}</p>
				</div>
				<div className="editDiv" onClick={() => toggleModal()} >
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
				</div>
			</header>
			{showModal === false && <section className="margin">
				<p>Hours worked: {shiftState.hours}</p>
				<p>Overtime worked: {shiftState.overtime}</p>
				<p>Gross pay: ${shiftState.grossPay.toFixed(2)}</p>
				<p>Net pay: ${shiftState.netPay.toFixed(2)}</p>
				<p>Taxes taken: ${shiftState.taxes.toFixed(2)}</p>
				<p>{shiftState.night && "Night Shift"}</p>
			</section>}
			{showModal === true && <EditShift
				currentPeriod={props.currentPeriod}
				closeModal={() => toggleModal()}
			/>}
		</article>
	);
}

export default shift;