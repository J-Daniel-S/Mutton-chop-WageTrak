import React from 'react';
import { withRouter } from 'react-router-dom';

import './PayPeriods.css';

const payPeriods = (props) => {

	const headerClicked = () => {
		props.history.push("/wagetrak/job/weeks");
	}

	const thisPeriodClicked = () => {
		props.history.push("/wagetrak/job/weeks/week");
	}

	const periodClicked = (period) => {
		props.setPeriod(period);
		props.history.push("/wagetrak/job/weeks/viewWeek");
	}

	let periods = [...props.currentJob.weeks];

	// weeks = weeks.sort((a, b) => Date.parse(a.dateName) - Date.parse(b.datename));
	// console.log(Date.parse(weeks[0].dateName));
	// console.log(Date.parse(weeks[1].dateName));

	return (
		<article className="weeks">
			<header className="margin" onClick={() => headerClicked()} >
				<p>Pay periods:</p>
			</header>
			<section className="margin" onClick={() => thisPeriodClicked()} >
				<p>Current period: {props.currentPeriod.dateName}</p>
			</section>
			<section className="weeksDiv" >
				{periods.map(w => (
					<p key={w.dateName} onClick={() => periodClicked(w)} className="margin">{w.dateName}</p>
				))}
			</section>
		</article>
	);
}

export default withRouter(payPeriods);