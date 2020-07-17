import React from 'react';

import './Shift.css';

const shift = (props) => {

	return (
		<article className="shift">
			<header className="flexDiv">
				<div className="nameDiv">
					<p className="margin">Shift: {props.currentShift.date} - ${props.currentShift.netPay}</p>
				</div>
				<div className="editDiv" onClick={() => props.editShift()} >
					<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
				</div>
			</header>
			<section className="margin">
				<p>Hours worked: {props.currentShift.hours}</p>
				<p>Gross pay: ${props.currentShift.grossPay}</p>
				<p>Net pay: ${props.currentShift.netPay}</p>
				<p>Taxes taken: ${props.currentShift.taxes}</p>
				<p>{props.currentShift.night && "Night Shift"}</p>
			</section>
		</article>
	);
}

export default shift;