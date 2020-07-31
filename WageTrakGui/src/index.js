import React from 'react';
import ReactDOM from 'react-dom';

import AuthContextProvider from './auth/authContext';
import WageLogin from './App';

import './index.css';

ReactDOM.render(
			<AuthContextProvider>
				<WageLogin />
			</AuthContextProvider>
				, document.getElementById('root'));
