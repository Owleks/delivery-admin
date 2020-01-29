import React, {useState, useContext, memo} from 'react';
import {Button, Input} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import {AuthContext} from '../common/AuthContext';

export const LoginPageComponent = memo(() => {
    const history = useHistory();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
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

    const onLogin = async () => {
        try {
            await authContext.login(login, password);
            history.push('/orders');
        } catch(e){
            alert('Nope');
        }
    };

    return (
        <>
            <form>
                <Input value={login} placeholder="Login" onChange={onLoginChange}/>
                <Input value={password} type="password" placeholder="Password" onChange={onPasswordChange}/>
                <Button variant="contained" color="primary" onClick={onLogin}>Login</Button>
            </form>
        </>
    );
});
