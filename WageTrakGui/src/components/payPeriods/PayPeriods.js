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

	let periods = [...props.currentJob.payPeriods];

	return (
		<article className="weeks">
			<header className="margin" onClick={() => headerClicked()} >
				<p>Pay periods:</p>
			</header>
			<section className="margin" onClick={() => thisPeriodClicked()} >
				<p>Current period: {props.currentPeriod.dateName}</p>
			</section>
			<section className="weeksDiv" >
				{periods.map(p => (
					<p key={p.dateName} onClick={() => periodClicked(p)} className="margin">{p.dateName}</p>
				))}
			</section>
		</article>
	);
}

export default withRouter(payPeriods);