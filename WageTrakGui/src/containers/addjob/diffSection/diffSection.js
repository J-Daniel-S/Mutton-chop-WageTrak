import React from 'react';

const diffSection = (props) => {
	return(
		<section className="form-group diffBox">
				<div className="diffDiv">
					<label htmlFor="diffName" className="margin">Differential name:</label>
					<input type="text" id="diffName" className="form-control diffInput" placeholder="night" />
				</div>
				<div className="diffDiv">
					<label htmlFor="diffPay" className="margin">Shift Differential:</label>
					<input type="number" id="diffPay" className="form-control diffInput" placeholder="$##.##" />
				</div>
				<i className="fa fa-minus minus-button margin" aria-hidden="true" onClick={() => props.diffRemoved()}></i>
		</section>
	);
}

export default diffSection;