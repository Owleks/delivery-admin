import React from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, makeStyles } from '@material-ui/core';

export const NAVBARWIDTH = 200;
const useStyles = makeStyles({
  nav: {
    maxWidth: NAVBARWIDTH,
    width: NAVBARWIDTH,
  },
});

export const LeftNavComponent = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Drawer
      open={true}
      variant="permanent"
    >
      <nav className={classes.nav}>
        <List>
          <ListItem button>
            <ListItemText primary="Your Menus" onClick={() => history.push('/menus')} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Your Orders" onClick={() => history.push('/orders')} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Restaurant profile" onClick={() => history.push('/restaurant-profile')} />
          </ListItem>
        </List>
      </nav>
    </Drawer>
  );
};
