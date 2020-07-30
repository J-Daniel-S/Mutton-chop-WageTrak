import React, { useState, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import EditPeriod from '../../../modals/editPeriod/editPeriod';
import UserContext from '../../../context/userContext';

import { PeriodArticle, RoundedButton, Flex3, LeftButtonText, IconButtonDiv, PaySection, RoundedButtonCentered, CenterButtonText, Hr, ListSection, LargeUl,
	ShadowButton } from '../../../styles/styledComponents';

const payPeriod = (props) => {
	const [showModal, setModal] = useState(false);
	// eslint-disable-next-line
	const [userState, setUserState, jobState, setJobState, periodState, setPeriodState, viewPeriodState, setViewPeriodState,
		// eslint-disable-next-line
		shiftState, setShiftState] = useContext(UserContext);
	let topElement = useRef();

	const titleClicked = () => {
		if (window.location.pathname === "/wagetrak/job/periods/viewPeriod/shift") {
			props.history.push("/wagetrak/job/periods/viewPeriod");
		} else if (window.location.pathname !== "/wagetrak/job/periods/viewPeriod") {
			props.history.push("/wagetrak/job/periods/period");
		}
	}

	const shiftClicked = (s) => {
		topElement.scrollIntoView();
		setShiftState(s)
		if (window.location.pathname === "/wagetrak/job/periods/viewPeriod") {
			props.history.push("/wagetrak/job/periods/viewPeriod/shift");
		} else {
			props.history.push("/wagetrak/job/periods/period/shift");
		}
	}

	const addShiftHandler = () => {
		if (window.location.pathname === "/wagetrak/job/periods/viewPeriod") {
			props.history.push("/wagetrak/view-period/add-shift");
		} else {
			props.history.push("/wagetrak/add-shift");
		}
	}

	const toggleModal = () => {
		if (showModal === true) {
			setModal(false);
		} else {
			setModal(true);
		}
	}

	let shifts = props.currentPeriod.shifts.sort((a, b) => a.date < b.date ? 1 : -1);

	return (
		<PeriodArticle>
			<RoundedButton onClick={() => titleClicked()} ref={(el) => topElement = el}>
				<Flex3>
					<LeftButtonText>Pay period: {props.currentPeriod.dateName}</LeftButtonText>
				</Flex3>
				{(window.location.pathname === "/wagetrak/job/periods/period" ||
					window.location.pathname === "/wagetrak/job/periods/viewPeriod") &&
					<IconButtonDiv onClick={() => toggleModal()}>
						<i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
					</IconButtonDiv>}
			</RoundedButton>
			{showModal === false && <div>
				<section>
					<PaySection>
						<Hr></Hr>
						<p>Total pay this pay period: ${props.currentPeriod.grossPay.toFixed(2)}</p>
						<Hr></Hr>
						<p>After taxes: ${props.currentPeriod.netPay.toFixed(2)}</p>
						<Hr></Hr>
						<p>Taxes taken: ${props.currentPeriod.taxes.toFixed(2)}</p>
						<Hr></Hr>
					</PaySection>
				</section>
				<RoundedButtonCentered onClick={() => addShiftHandler()}>
					<CenterButtonText>Add Shift</CenterButtonText>
				</RoundedButtonCentered>
				<section>
					<PaySection>
						<p>Shifts this pay period:</p>
						<Hr></Hr>
					</PaySection>
					<ListSection>
						<LargeUl>
							{props.currentPeriod && shifts.map(s => (
								<li key={s.date} onClick={() => shiftClicked(s)}>
									<ShadowButton>
										{s.date}: Net pay - ${s.netPay.toFixed(2)} - {s.hours} hours worked
							</ShadowButton>
								</li>))
							}
						</LargeUl>
					</ListSection>
				</section>
			</div>}
			{showModal === true && <EditPeriod
				closeModal={() => toggleModal()}
				currentPeriod={props.currentPeriod}
			/>}
		</PeriodArticle>
	);
}

export default withRouter(payPeriod);