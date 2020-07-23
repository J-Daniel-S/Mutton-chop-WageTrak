import React, {useContext} from 'react';

import Wagetrak from './containers/WageTrak';
import Authorization from './auth/Authorization';
import { AuthContext } from './auth/authContext';

const wageLogin = (props) => {
  const authContext = useContext(AuthContext);

  let content = <Authorization />;
  if (authContext.isAuth) {
   content = <Wagetrak />; 
  }
  return content;
};

export default wageLogin;
