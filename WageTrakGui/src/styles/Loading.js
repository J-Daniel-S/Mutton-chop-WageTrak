import React from 'react';
import "./Loading.css";

const loading = (props) => {
	return (
		<React.Fragment>
			<p className="spinner-box">Figuring stuff out...<br></br></p>
			<section className="spinner-box">'
				<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
			</section>
		</React.Fragment>);
}

export default loading;