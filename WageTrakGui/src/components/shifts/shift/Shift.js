import React, { useState } from 'react';

import EditShift from '../../../modals/editShift/EditShift';
import './Shift.css';

const shift = (props) => {
	const [showModal, setModal] = useState(false);

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
					<p className="margin">Shift: {props.currentShift.date} - ${props.currentShift.netPay.toFixed(2)}</p>
				</div>
				<div className="editDiv" onClick={() => toggleModal()} >
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
				</div>
			</header>
			{showModal === false && <section className="margin">
				<p>Hours worked: {props.currentShift.hours}</p>
				<p>Overtime worked: {props.currentShift.overtime}</p>
				<p>Gross pay: ${props.currentShift.grossPay.toFixed(2)}</p>
				<p>Net pay: ${props.currentShift.netPay.toFixed(2)}</p>
				<p>Taxes taken: ${props.currentShift.taxes.toFixed(2)}</p>
				<p>{props.currentShift.night && "Night Shift"}</p>
			</section>}
			{showModal === true && <EditShift
											currentPeriod={props.currentPeriod}
											currentShift={props.currentShift}  
											updateUser={props.updateUser} 
											currentUser={props.currentUser} 
											currentJob={props.currentJob} 
											closeModal={() => toggleModal()}
											
										/>}
		</article>
	);
}

export default shift;