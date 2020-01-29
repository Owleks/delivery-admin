import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Grid, Button} from '@material-ui/core';

import {AuthContext} from '../common/AuthContext';

export const HeaderComponent = () => {
    const history = useHistory();
    const {user} = useContext(AuthContext);

    const login = () => {
        history.push('/login');
    };

    const signup = () => {
        history.push('/signup');
    };

    const logout = () => {
        alert('todo');
    };

    return (
        <Grid container direction="row" justify="flex-end">
            <Grid item>
                {!user && <>
                    <Button variant="contained" color="primary" onClick={login}>Login</Button>
                    <Button variant="contained" color="primary" onClick={signup}>Signup</Button>
                </>}

                {user && <>
                    <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
                </>}
            </Grid>
        </Grid>
    );
};
