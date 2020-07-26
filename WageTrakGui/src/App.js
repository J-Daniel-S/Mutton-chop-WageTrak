// eslint-disable-next-line
import React from 'react';

import Wagetrak from './containers/WageTrak';
// eslint-disable-next-line
import Authorization from './auth/Authorization';
// eslint-disable-next-line
import { AuthContext } from './auth/authContext';

const wageLogin = (props) => { 
  return (<Wagetrak />);
  // const authContext = useContext(AuthContext);

  // let content = <Authorization />;
  // if (authContext.isAuth) {
  //  content = <Wagetrak />; 
  // }
  // return content;
};

export default wageLogin;
