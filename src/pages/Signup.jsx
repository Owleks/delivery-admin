import React, { useContext, useState } from 'react';
import { Button, Input } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../common/AuthContext';

export const SignupPageComponent = () => {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [domainName, setDomainName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const authContext = useContext(AuthContext);

  // TODO: useCallback
  const onLoginChange = (e) => {
    const { value } = e.target;
    setLogin(value);
  };
  const onPasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };
  const onRestaurantDomainChange = (e) => {
    const { value } = e.target;
    setDomainName(value);
  };

  const onRestaurantNameChange = (e) => {
    const { value } = e.target;
    setRestaurantName(value);
  };

  const onSignup = async () => {
    try {
      await authContext.signup(domainName, restaurantName, login, password);
      history.push('/orders');
    } catch (e) {
      alert('Nope');
    }
  };

  return (
    <form>
      <Input value={domainName} placeholder="Restaurant Domain Name" onChange={onRestaurantDomainChange}/>
      <br/>
      <Input value={restaurantName} placeholder="Restaurant Name" onChange={onRestaurantNameChange}/>
      <br/>
      <Input value={login} placeholder="Login" onChange={onLoginChange}/>
      <br/>
      <Input value={password} type="password" placeholder="Password" onChange={onPasswordChange}/>
      <br/>
      <Button variant="contained" color="primary" onClick={onSignup}>Signup</Button>
    </form>
  );

};
