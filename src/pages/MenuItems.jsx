import React, {useEffect, useState, useContext} from 'react';
import {Grid, Card, Button} from '@material-ui/core';

import {AuthContext} from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import {CreateMenuModal} from '../components/CreateMenuModal';

export const MenusPageComponent = () => {
    const {user} = useContext(AuthContext);
    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

    const fetchMenus = async () => {
        setIsLoading(true);
        const menus = await Api.fetchMenus({restaurant: user.restaurant});
        setMenus(menus);
        setIsLoading(false);
    };

    const onMenuCreated = () => {
        fetchMenus();
        setIsCreateMenuOpen(false);
    }

    useEffect(() => {
        if (user)
            fetchMenus();
    }, [user]);

    const showLoading = isLoading;
    const showNoMenus = !isLoading && !menus.length;
    const showMenus = !isLoading && menus.length;

    if (!user) {
        return (<div>Forbidden. Login please.</div>);
    }

    return (
        <Grid container={true} direction="column">
            <Grid item={true}>
                <Button ariant="contained" color="primary" onClick={() => setIsCreateMenuOpen(true)}>Create Menu</Button>
            </Grid>
            <Grid item={true}>
                <header>Your menus</header>
            </Grid>
            {showMenus && <Grid item={true} container={true} direction="column">
                {menus.map((menu) => (
                    <Grid
                        item={true}
                        key={menu._id}
                    >
                        <Card>{menu.name}</Card>
                    </Grid>
                ))}
            </Grid>}
            {showNoMenus && <div>No menus :/ </div>}
            {showLoading && <div>Loading.....</div>}
            <CreateMenuModal
                isOpen={isCreateMenuOpen}
                onClose={() => setIsCreateMenuOpen(false)}
                onMenuCreated={onMenuCreated}
            />
        </Grid>
    );
};
