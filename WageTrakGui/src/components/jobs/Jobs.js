import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';
import ConfirmDelete from '../../modals/confirm/ConfirmDelete';
import './Jobs.css';

const jobs = (props) => {
	const [showModal, setModal] = useState(false);
	const [userState, setUserState, job, selectJob] = useContext(UserContext);

	const jobClickedHandler = (j) => {
		selectJob(j);
		props.history.push("wagetrak/job");
	}

	const toggleModal = (j) => {
		selectJob(j);
		// console.log('delete ' + name + "from " + userState.id);
		if (!showModal) {
			setModal(true);
		} else {
			setModal(false);
		}
	}

	const deleteJob = () => {
		let name = job.name;
		fetch(
			"http://localhost:8080/wageTrak/" + userState.id + "/" + name,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE'
				},
			}
		).then(res => res.json()).then(res => {
			setUserState(res);
			setModal(false);
		});
	}

	let jobs;

	if (userState.jobs) {
		jobs = userState.jobs.sort((a, b) => a.name > b.name ? 1 : -1);
	}

	return (
		<React.Fragment>
			{showModal === false && <article className="jobs">
				<ul className="jobs-list">
					{userState.jobs && jobs.map(j => (
						<li key={j.name}>
							<section className="job-thumbnail">
								<div className="job-name capitalize" onClick={() =>
									jobClickedHandler(j)
								}>{j.name}</div>
								<div onClick={() => toggleModal(j)}>
									<i className="fa fa-times delete-button fa-2x" aria-hidden="true"></i>
								</div>
							</section>
						</li>
					)
					)}
				</ul>
			</article>}
			{showModal && <section>
				<ul className="jobs-list">
					<li>
						<hr></hr>
						<p className="job-name capitalize">{job.name}</p>
						<hr></hr>
					</li>
				</ul>
				<ConfirmDelete delete={() => deleteJob()} closeModal={() => toggleModal()} />
			</section>}
		</React.Fragment>
	);
}

export default withRouter(jobs);