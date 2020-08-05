import React, { useState } from 'react';

import Wagetrak from './containers/WageTrak';
import Authorization from './auth/Authorization';
import AddUser from './auth/addUser';
import Loading from './styles/Loading';
// eslint-disable-next-line
import { AuthContext, useAuth } from './context/authContext';
import './index.css';

const wageApp = (props) => {
  const [ signup, setSignup ] = useState(false);
  // eslint-disable-next-line
  const [ isAuth, setIsAuth ] = useState(false);
  const [ userId, setUserId ] = useState({});
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [ authTokens, setAuthTokens ] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  let content = <Loading />;

  if (isAuth) {
    content = <Wagetrak userId={userId}/>; 
  } else if (!signup) {
      if (window.location.pathname !== "/") {
      window.location.assign("/");
      } else {
        content = <Authorization setAuthorized={setIsAuth} register={setSignup} setUserId={setUserId}/>
      }
  } else {
    content = <AddUser setAuthorized={setIsAuth} register={setSignup} setUserId={setUserId} toggleLogin={setSignup}/>
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      {content}
    </AuthContext.Provider>);
};

export default wageApp;
