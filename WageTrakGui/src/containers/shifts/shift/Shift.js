import React, { useState, useContext } from 'react';

import EditShift from '../../../modals/editShift/EditShift';
import UserContext from '../../../context/userContext';

import { ShiftArticle, Hr, RoundedButton, Flex3, IconButtonDiv, LeftButtonText, PaySection } from '../../../styles/styledComponents';

const shift = (props) => {
	const [showModal, setModal] = useState(false);
	// eslint-disable-next-line
	const [userState, setUserState, jobState, setJobState, periodState, setPeriodState, viewPeriodState, setViewPeriodState,
		// eslint-disable-next-line
		shiftState] = useContext(UserContext);

	const toggleModal = () => {
		if (showModal === true) {
			setModal(false);
		} else {
			setModal(true);
		}
	}

	return (
		<ShiftArticle>
			<RoundedButton>
				<Flex3>
					<LeftButtonText>Shift date: {shiftState.date} - ${shiftState.netPay.toFixed(2)}</LeftButtonText>
				</Flex3>
				<IconButtonDiv onClick={() => toggleModal()} >
					<i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
				</IconButtonDiv>
			</RoundedButton>
			{showModal === false && <PaySection>
				<Hr></Hr>
				<p>Hours worked: {shiftState.hours}</p>
				{shiftState.overtime > 0 && <div>
					<Hr></Hr>
					<p>Overtime worked: {shiftState.overtime}</p>
				</div>}
				<Hr></Hr>
				<p>Gross pay: ${shiftState.grossPay.toFixed(2)}</p>
				<Hr></Hr>
				<p>Net pay: ${shiftState.netPay.toFixed(2)}</p>
				<Hr></Hr>
				<p>Taxes taken: ${shiftState.taxes.toFixed(2)}</p>
				<Hr></Hr>
			</PaySection>}
			{showModal === true && <EditShift
				currentPeriod={props.currentPeriod}
				closeModal={() => toggleModal()}
			/>}
		</ShiftArticle>
	);
}

export default shift;