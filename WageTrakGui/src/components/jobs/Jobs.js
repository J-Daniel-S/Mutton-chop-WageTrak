import React from 'react';
import { withRouter } from 'react-router-dom';

import './Jobs.css';

const jobs = (props) => {
	// const { setJob } = useUser();

	const jobClickedHandler = () => {
		props.history.push("wagetrak/job");
	}

	const deleteClickedHandler = (name) => {
		// console.log('delete ' + name + "from " + props.user.id);
		deleteJob(name);
		setTimeout(props.jobChange(), 700);
	}

	const deleteJob = (name) => {
		fetch(
			"http://localhost:8080/wageTrak/" + props.user.id + "/" + name,
			{
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					'Access-Control-Allow-Origin': 'localhost:3000/',
					'Access-Control-Allow-Methods': 'DELETE'
				},
			}
		);
	}

	return (
		<div className="jobs">
			<ul className="jobs-list">
				{props.userJobs && props.userJobs.map(j => (
					<li key={j.name}>
						<div className="job-thumbnail">
							<div className="job-name" onClick={() => {
								props.setJob(j);
								jobClickedHandler();
							}}>{j.name}</div>
							<div onClick={() => deleteClickedHandler(j.name)}>
								<i className="fa fa-times delete-button" aria-hidden="true"></i>
							</div>
						</div>
					</li>
				)
				)}
			</ul>
		</div>
	);
}

export default withRouter(jobs);