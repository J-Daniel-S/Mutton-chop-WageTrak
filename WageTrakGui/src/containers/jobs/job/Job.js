import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import EditJob from '../../../modals/editJob/editJob';
import UserContext from '../../../context/userContext';

import {
	Backdrop, JobArticle, Hr, RoundedButton, Flex3, Flex0, LeftButtonText, PaySection, IconButtonDiv, RoundedButtonCentered,
	CenterButtonText, FlexDiv, FlexText, ShadowButton
} from '../../../styles/styledComponents';

const job = (props) => {
	const [showModal, setModal] = useState(false);
	// eslint-disable-next-line
	const [userState, setUserState, jobState, setJobState, periodState, setPeriodState] = useContext(UserContext);

	const clickedUserNameHandler = () => {
		setTimeout(props.history.push("/wagetrak"), 501);
	}

	const clickedJobNameHandler = () => {
		props.history.push("/wagetrak/job");
	}

	const periodsClicked = () => {
		props.history.push("/wagetrak/job/periods");
	}

	const periodClicked = () => {
		props.history.push("/wagetrak/job/periods/period");
	}

	const addPeriodHandler = () => {
		props.history.push("/wagetrak/add-period");
	}

	const addShiftHandler = () => {
		props.history.push("/wagetrak/add-shift");
	}

	let jobTitle = "";
	let rate = "";
	let totalGross = 0;
	let totalNet = 0;
	let totalTax = 0;
	let currentPeriodNum = 0;
	let currentPeriodNet = 0;
	

	if (jobState) {
		jobTitle = jobState.name;
		rate = jobState.rate.toFixed(2);
		setPeriodState(null);

		for (let period of jobState.payPeriods) {
			totalGross += period.grossPay;
		}

		for (let period of jobState.payPeriods) {
			totalNet += period.netPay;
		}

		for (let period of jobState.payPeriods) {
			totalTax += period.taxes;
		}

		let payPeriods = [];


		//these three blocks grab the latest pay period
		for (let period of jobState.payPeriods) {
			payPeriods.push(Date.parse(period.dateName));
		}

		currentPeriodNum = Math.max.apply(Math, payPeriods);

		for (let period of jobState.payPeriods) {
			if (Date.parse(period.dateName) === currentPeriodNum && payPeriods.length !== 0) {
				setPeriodState(period);
				currentPeriodNet = period.netPay;
			}
		}

	}

	const toggleModal = () => {
		if (showModal === true) {
			setModal(false);
		} else {
			setModal(true);
		}

	}

	return (
		<React.Fragment>
			<Backdrop onClick={() => clickedUserNameHandler()}></Backdrop>
			<JobArticle>
				<RoundedButton>
					<Flex3 onClick={() => clickedJobNameHandler()}>
						<LeftButtonText>{jobTitle}</LeftButtonText>
					</Flex3>
					{window.location.pathname === "/wagetrak/job" &&
						<IconButtonDiv onClick={() => toggleModal()}>
							<i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
						</IconButtonDiv>}
				</RoundedButton>
				{!showModal && <div>
					<PaySection>
						<Hr></Hr>
						<p>Total pay before taxes: ${totalGross.toFixed(2)}</p>
						<Hr></Hr>
						<p>Total pay after taxes: ${totalNet.toFixed(2)}</p>
						<Hr></Hr>
						<p>Estimated taxes taken out: ${totalTax.toFixed(2)}</p>
						<Hr></Hr>
						<p>Pay after taxes this period: ${currentPeriodNet.toFixed(2)}</p>
						<Hr></Hr>
						<p>Hourly pay: ${rate}</p>
						<Hr></Hr>
					</PaySection>
					<section>
						<RoundedButtonCentered>
							<CenterButtonText onClick={() => periodsClicked()}>View Pay Periods</CenterButtonText>
						</RoundedButtonCentered>
						<FlexDiv>
							<Flex3>
								<FlexText>
									Current pay period: {periodState !== null &&
										<ShadowButton onClick={() => periodClicked()}>{periodState.dateName}</ShadowButton>}
								</FlexText>
							</Flex3>
							{periodState !== null &&
								<Flex0>
									<FlexText>
										<ShadowButton>add shift <i className="fa fa-plus fa-lg" aria-hidden="true" onClick={() => addShiftHandler()}></i>
										</ShadowButton>
									</FlexText>
								</Flex0>}
						</FlexDiv>
					</section>
					<RoundedButtonCentered onClick={() => addPeriodHandler()} >
						<CenterButtonText >Start new pay period</CenterButtonText>
					</RoundedButtonCentered>
				</div>}
				{showModal === true && <EditJob />}
			</JobArticle>
		</React.Fragment>
	);
}

export default withRouter(job);