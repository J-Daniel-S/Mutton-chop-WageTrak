import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';
import './PayPeriods.css';

const payPeriods = (props) => {
	// eslint-disable-next-line
	const [userState, setUserState, job, setJob, period, setPeriod, selectedPeriod, setSelectedPeriod] = useContext(UserContext);

	const headerClicked = () => {
		props.history.push("/wagetrak/job/weeks");
	}

	const thisPeriodClicked = () => {
		props.history.push("/wagetrak/job/weeks/week");
	}

	const periodClicked = (period) => {
		setSelectedPeriod(period);
		props.history.push("/wagetrak/job/weeks/viewWeek");
	}

	let periods = [...job.payPeriods];

	let periodsArr = periods.sort((a, b) => Date.parse(a.dateName) < Date.parse(b.dateName) ? 1 : -1);

	return (
		<article className="weeks">
			<header className="margin" onClick={() => headerClicked()} >
				<p>Pay periods:</p>
			</header>
			<section className="margin" onClick={() => thisPeriodClicked()} >
				<p>Current period: {period.dateName}</p>
			</section>
			<section className="weeksDiv" >
				{periodsArr.map(p => (
					<p key={p.dateName} onClick={() => periodClicked(p)} className="margin">{p.dateName}</p>
				))}
			</section>
		</article>
	);
}

export default withRouter(payPeriods);