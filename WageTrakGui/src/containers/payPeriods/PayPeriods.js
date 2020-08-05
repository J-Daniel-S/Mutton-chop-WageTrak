import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';

import { PeriodsArticle, RoundedButton, LeftButtonText, PaySection, ListSection, ShadowButton, SmallThumbnail } from '../../styles/styledComponents';

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
		<PeriodsArticle>
			<RoundedButton onClick={() => headerClicked()} >
				<LeftButtonText>Pay periods:</LeftButtonText>
			</RoundedButton>
			<PaySection onClick={() => thisPeriodClicked()} >
				<p>Current period start date: <ShadowButton >{period.dateName}</ShadowButton></p>
			</PaySection>
			<ListSection>
				{periodsArr.map(p => (
					<SmallThumbnail key={p.dateName} onClick={() => periodClicked(p)}>{p.dateName}</SmallThumbnail>
				))}
			</ListSection>
		</PeriodsArticle>
	);
}

export default withRouter(payPeriods);