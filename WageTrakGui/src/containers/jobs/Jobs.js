import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import UserContext from '../../context/userContext';
import { useAuth } from '../../context/authContext';
import ConfirmDelete from '../../modals/confirm/ConfirmDelete';

import { LargeListArticle, LargeUl, LargeThumbnail, LargeTitleMargin, IconButtonDiv } from '../../styles/styledComponents';

const jobs = (props) => {
	const [showModal, setModal] = useState(false);
	const [userState, setUserState, job, selectJob] = useContext(UserContext);
	const { authTokens } = useAuth();

	const jobClickedHandler = (j) => {
		selectJob(j);
		props.history.push("wagetrak/job");
	}

	const toggleModal = (j) => {
		selectJob(j);
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
					'Access-Control-Allow-Methods': 'DELETE',
					Accept: 'application/json, text/plain, */*',
					authorization: authTokens
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
			{showModal === false && <LargeListArticle>
				<LargeUl>
					{userState.jobs && jobs.map(j => (
						<li key={j.name}>
							<LargeThumbnail>
								<LargeTitleMargin onClick={() =>
									jobClickedHandler(j)
								}>{j.name}</LargeTitleMargin>
								<IconButtonDiv onClick={() => toggleModal(j)}>
									<i className="fa fa-times fa-2x" aria-hidden="true"></i>
								</IconButtonDiv>
							</LargeThumbnail>
						</li>
					)
					)}
				</LargeUl>
			</LargeListArticle>}
			{showModal && <section>
				<LargeUl>
					<li>
						<hr></hr>
						<LargeTitleMargin>
							<p>{job.name}</p>
						</LargeTitleMargin>
						<hr></hr>
					</li>
				</LargeUl>
				<ConfirmDelete delete={() => deleteJob()} closeModal={() => toggleModal()} />
			</section>}
		</React.Fragment>
	);
}

export default withRouter(jobs);