import React, {useContext, useState} from 'react';
import {Button, Input} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import {AuthContext} from '../common/AuthContext';

export const SignupPageComponent = () => {
    const history = useHistory();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [restaurant, setRestaurant] = useState('');

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
    const onRestaurantChange = (e) => {
        const { value } = e.target;
        setRestaurant(value);
    };

    const onSignup = async () => {
        try {
            await authContext.signup(restaurant, login, password);
            history.push('/orders');
        } catch(e){
            alert('Nope');
        }
    };

    return (
        <>
            <form>
                <Input value={restaurant}  placeholder="Restaurant" onChange={onRestaurantChange}/>
                <Input value={login} placeholder="Login" onChange={onLoginChange}/>
                <Input value={password} type="password" placeholder="Password" onChange={onPasswordChange}/>
                <Button variant="contained" color="primary" onClick={onSignup}>Signup</Button>
            </form>
        </>
    );

};
