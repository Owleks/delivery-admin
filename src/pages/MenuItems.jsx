import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button, makeStyles, Divider } from '@material-ui/core';

import { AuthContext } from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import CreateEditMenuItemModal from '../components/CreateEditMenuItemModal';

const useStyles = makeStyles(theme => ({
    menuItemsContainer: {
        margin: theme.spacing(2, 0),
    },
    menuItem: {
        margin: theme.spacing(2, 0),
    },
    name: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    const [isCreateEditMenuItemOpened, setIsCreateEditMenuItemOpened] = useState(false);

    const handleOnAddMenuItem = () => {
        setIsCreateEditMenuItemOpened(true);
    };
    const handleOnEditMenuItem = (item) => {
        console.log(item);
    };
    const handleOnDeleteMenuItem = (item) => {
        console.log(item);
    };
    const handleOnSubmit = () => {
        fetchMenuItems();
        setIsCreateEditMenuItemOpened(false);
    };
    const fetchMenuItems = async () => {
        const menuItems = await Api.fetchMenuItems({
            restaurantId: user.restaurant,
            menuId: menuId
        });
        setMenuItems(menuItems);
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
                        onClick={() => {handleOnDeleteMenuItem(item)}}
                    >
                        Remove
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.control}
                        onClick={() => {handleOnEditMenuItem(item)}}
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
            <Grid container={true} direction="column" className={classes.menuItemsContainer}>
                {menuItemsElements}
            </Grid>
            <Button variant="contained" color="primary" onClick={handleOnAddMenuItem}>Create item</Button>
            <CreateEditMenuItemModal
                item={true}
                isOpen={isCreateEditMenuItemOpened}
                onClose={() => setIsCreateEditMenuItemOpened(false)}
                onSubmit={handleOnSubmit}
            />
        </>
    );
};
