import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import Jobs from '../../components/jobs/Jobs';
import EditUser from '../../modals/editUser/editUser';
import UserContext from '../../context/userContext';

import './User.css';

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
			<main className="user">
				<header className="margin flexDiv" onClick={() => clickedNameHandler()}>
					<div className="userName capitalize">{userState.name}</div>
					{window.location.pathname === "/wagetrak" &&
						<div className="editDiv" onClick={() => toggleModal()}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></div>}
				</header>
				<section className="add-job-button">
					<div onClick={() => addJobHandler()}>
						Add Job
  					</div>
				</section>
				<section>
					<Jobs />
				</section>
			</main>
			{showModal === true && <EditUser closeModal={() => toggleModal()} />}
		</React.Fragment>
	);
}

export default withRouter(user);