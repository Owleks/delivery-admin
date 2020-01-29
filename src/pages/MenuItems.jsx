import React, { useEffect, useState, useContext } from 'react';
import { Grid, Card, Button } from '@material-ui/core';

import { AuthContext } from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import { CreateMenuModal } from '../components/CreateMenuModal';
import CreateEditMenuItemModal from '../components/CreateEditMenuItemModal';

export const MenuItemsPageComponent = () => {

    const [isCreateEditMenuItemOpened, setIsCreateEditMenuItemOpened] = useState(false);

    const handleOnAddMenuItem = () => {
        setIsCreateEditMenuItemOpened(true);
    };

    const handleOnSubmit = () => {
        setIsCreateEditMenuItemOpened(false);
    };

    return (
        <>
            <Grid container={true} direction="column">
                <div>Menu items</div>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleOnAddMenuItem}>Create item</Button>
            <CreateEditMenuItemModal
                isCreate={true}
                isOpen={isCreateEditMenuItemOpened}
                onClose={() => setIsCreateEditMenuItemOpened(false)}
                onSubmit={handleOnSubmit}
            >

            </CreateEditMenuItemModal>
        </>
    );
};
