import React, {useEffect, useState, useContext} from 'react';
import {Grid, Card, Button} from '@material-ui/core';

import {AuthContext} from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import {CreateMenuModal} from '../components/CreateMenuModal';

export const MenuItemsPageComponent = () => {


    return (
        <Grid container={true} direction="column">
            <div>Menu items</div>
        </Grid>
    );
};
