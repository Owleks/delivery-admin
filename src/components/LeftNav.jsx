import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {List, ListItem, ListItemText, Drawer} from '@material-ui/core';

export const LeftNavComponent = () => {
    const history = useHistory();

    return (
        <Drawer
            open={true}
            variant="permanent"
        >
            <nav>
                <List>
                    <ListItem button>
                        <ListItemText primary="Your Menus" onClick={() => history.push('/menus')}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Your Orders" onClick={() => history.push('/Orders')}/>
                    </ListItem>
                </List>
            </nav>
        </Drawer>
    );
};
