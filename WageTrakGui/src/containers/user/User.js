import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Jobs from '../../components/jobs/Jobs';
import EditUser from '../../modals/editUser/editUser';

import './User.css';

const user = (props) => {
	const [ showModal, setShowModal ] = useState({});

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

	return (
		<React.Fragment>
			<main className="user">
				<header className="margin flexDiv" onClick={() => clickedNameHandler()}>
					<div className="userName capitalize">{props.user.name}</div>
					{window.location.pathname === "/wagetrak" && 
						<div className="editDiv" onClick={() => toggleModal()}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>}
				</header>
				<section className="buttonDiv">
					<div onClick={() => addJobHandler()}>
						Add Job
  					</div>
				</section>
				<section>
					<Jobs userJobs={props.user.jobs} setJob={props.setJob} user={props.user} jobChange={props.updateUser} />
				</section>
			</main>
			{showModal === true && <EditUser userChange={props.updateUser} user={props.user} closeModal={() => toggleModal()}/>}
		</React.Fragment>
	);
}

export default withRouter(user);