import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Button, makeStyles, Divider, CircularProgress } from '@material-ui/core';

import { AuthContext } from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import CreateEditMenuItemModal from '../components/CreateEditMenuItemModal';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2, 0)
    },
    menuItemsContainer: {
        margin: theme.spacing(2, 0),
    },
    menuItem: {
        margin: theme.spacing(2, 0),
    },
    name: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: theme.spacing(0, 1),
    },
    control: {
        marginRight: theme.spacing(2),
    }
}));

export const MenuItemsPageComponent = () => {

    const classes = useStyles();
    const {user} = useContext(AuthContext);
    const {menuId} = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [itemToUpdate, setItemToUpdate] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateEditMenuItemOpened, setIsCreateEditMenuItemOpened] = useState(false);

    const handleOnAddMenuItem = () => {
        setItemToUpdate(undefined);
        setIsCreateEditMenuItemOpened(true);
    };
    const handleOnEditMenuItem = (item) => {
        setItemToUpdate(item);
        setIsCreateEditMenuItemOpened(true);
    };
    const fetchMenuItems = async () => {
        setIsLoading(true);
        const menuItems = await Api.fetchMenuItems({
            restaurantId: user.restaurant,
            menuId: menuId
        });
        setIsLoading(false);
        setMenuItems(menuItems);
    };
    const handleOnDeleteMenuItem = async (item) => {
        // TODO: add confirmation modal
        await Api.deleteMenuItem(item._id);
        fetchMenuItems();
    };
    const handleOnSubmit = async () => {
        fetchMenuItems();
        setIsCreateEditMenuItemOpened(false);
    };
    useEffect(() => {
        if (user)
            fetchMenuItems();
    }, [user]);

    const menuItemsElements = menuItems.map(item => (
        <Grid item key={item._id}>
            <Grid container direction="row" className={classes.menuItem} item>
                <Grid item className={classes.name}>{item.name}</Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        className={classes.control}
                        onClick={() => {
                            handleOnDeleteMenuItem(item)
                        }}
                    >
                        Remove
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.control}
                        onClick={() => {
                            handleOnEditMenuItem(item)
                        }}
                    >
                        Edit
                    </Button>
                </Grid>
            </Grid>
            <Grid item><Divider /></Grid>
        </Grid>
    ));

    return (
        <>
            <Box className={classes.root}>
                {isLoading && (<Box><CircularProgress /></Box>)}
                {!isLoading && (
                    <>
                        <Grid container={true} direction="column" className={classes.menuItemsContainer}>
                            <Grid item><Divider /></Grid>
                            {menuItemsElements}
                        </Grid>
                        <Button variant="contained" color="primary" onClick={handleOnAddMenuItem}>Create item</Button>
                        <CreateEditMenuItemModal
                            itemToUpdate={itemToUpdate}
                            isOpen={isCreateEditMenuItemOpened}
                            onClose={() => setIsCreateEditMenuItemOpened(false)}
                            onSubmit={handleOnSubmit}
                        />
                    </>
                )}
            </Box>
        </>
    );
};
