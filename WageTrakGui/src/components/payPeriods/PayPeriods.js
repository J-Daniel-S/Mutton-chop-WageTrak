import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';
import './PayPeriods.css';

const payPeriods = (props) => {
	// eslint-disable-next-line
	const [userState, setUserState, job, setJob, period, setPeriod, selectedPeriod, setSelectedPeriod] = useContext(UserContext);

	const headerClicked = () => {
		props.history.push("/wagetrak/job/periods");
	}

	const thisPeriodClicked = () => {
		props.history.push("/wagetrak/job/periods/period");
	}

	const periodClicked = (period) => {
		setSelectedPeriod(period);
		props.history.push("/wagetrak/job/periods/viewPeriod");
	}

	let periods = [...job.payPeriods];

	let periodsArr = periods.sort((a, b) => Date.parse(a.dateName) < Date.parse(b.dateName) ? 1 : -1);

	return (
		<article className="periods">
			<header className="period-button" onClick={() => headerClicked()} >
				<p className="periods-button-text">Pay periods:</p>
			</header>
			<section className="margin" onClick={() => thisPeriodClicked()} >
				<p>Current period: <span className="small-button">{period.dateName}</span></p>
			</section>
			<section className="periodsDiv periods-list" >
				{periodsArr.map(p => (
					<p key={p.dateName} onClick={() => periodClicked(p)} className="margin periods-thumbnail">{p.dateName}</p>
				))}
			</section>
		</article>
	);
}

export default withRouter(payPeriods);