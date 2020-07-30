import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import Jobs from '../jobs/Jobs';
import EditUser from '../../modals/editUser/editUser';
import UserContext from '../../context/userContext';

import { UserMain, BlockButton, LargeTitleLeft, FlexHeader, IconButtonDiv } from '../../styles/styledComponents';

const user = (props) => {
	const [showModal, setShowModal] = useState({});
	const [userState] = useContext(UserContext);

	const clickedNameHandler = () => {
		props.history.push("/wagetrak");
	}

	const addJobHandler = () => {
		props.history.push("/wagetrak/add-job");
	}

	const toggleModal = () => {
		if (showModal === true) {
			setShowModal(false);
		} else {
			setShowModal(true);
		}
	}

	// console.log(userState);

	return (
		<React.Fragment>
			<UserMain>
				<FlexHeader onClick={() => clickedNameHandler()}>
					<LargeTitleLeft>{userState.name}</LargeTitleLeft>
					{window.location.pathname === "/wagetrak" &&
						<IconButtonDiv onClick={() => toggleModal()}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></IconButtonDiv>}
				</FlexHeader>
				<BlockButton>
					<div onClick={() => addJobHandler()}>
						Add Job
  					</div>
				</BlockButton>
				<section>
					<Jobs />
				</section>
			</UserMain>
			{showModal === true && <EditUser closeModal={() => toggleModal()} />}
		</React.Fragment>
	);
}

export default withRouter(user);