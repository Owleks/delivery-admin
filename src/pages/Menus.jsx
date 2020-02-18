import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Button, Divider, makeStyles} from '@material-ui/core';

import {AuthContext} from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import {CreateEditMenuModal} from '../components/CreateEditMenuModal';
import ConfirmationModal from '../components/ConfirmationModal';
import {ENVIRONMENT} from '../environments/environment';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  name: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textDecoration: 'none',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    marginRight: theme.spacing(2),
  },
  image: {
    width: 100,
    height: 100
  }
}));

export const MenusPageComponent = () => {
  const {user} = useContext(AuthContext);
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [menuToUpdate, setMenuToUpdate] = useState(undefined);
  const [menuToDelete, setMenuToDelete] = useState(undefined);
  const [deleteMessage, setDeleteMessage] = useState('');
  const classes = useStyles();

  const fetchMenus = async () => {
    setIsLoading(true);
    const menus = await Api.fetchMenus({restaurant: user.restaurant});
    setMenus(menus);
    setIsLoading(false);
  };
  const handleOnAddMenu = () => {
    setMenuToUpdate(undefined);
    setIsCreateMenuOpen(true);
  };
  const handleOnSubmit = () => {
    fetchMenus();
    setIsCreateMenuOpen(false);
  };
  const handleOnUpdateMenu = (menu) => {
    setMenuToUpdate(menu);
    setIsCreateMenuOpen(true);
  };
  const handleOnDeleteMenu = (menuToDelete) => {
    setMenuToDelete(menuToDelete);
    setIsConfirmationModalOpen(true);
    setDeleteMessage(`Are you sure you want to delete ${menuToDelete.name}?`);
  };

  const handleOnAcceptDeleteMenu = async () => {
    await Api.deleteMenu(menuToDelete._id);
    const newMenus = menus.filter(menu => menu._id !== menuToDelete._id);
    setIsConfirmationModalOpen(false);
    setMenus([...newMenus]);
  };

  useEffect(() => {
    if (user) {
      fetchMenus();
    }
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
        <header><b>Your menus</b></header>
      </Grid>
      {showMenus && <Grid item={true} container={true} direction="column" className={classes.root}>
        <Divider />
        {menus.map((menu) => (
          <Grid container item key={menu._id} direction="column">
            <Grid container item>
              <Link to={`/menus/${menu._id}`} className={classes.name}>
                <Grid container item>
                  <Grid item xs={6}>
                    <img className={classes.image}
                         src={ENVIRONMENT.UPLOADS + menu.image} />
                  </Grid>
                  <Grid container alignItems="center" justify="center" item xs={6}>
                    {menu.name}
                  </Grid>
                </Grid>
              </Link>
              <Grid container xs={4} item className={classes.controls}>
                <Button variant="contained" className={classes.control} onClick={() => {
                  handleOnDeleteMenu(menu);
                }}>Remove</Button>
                <Button variant="contained" className={classes.control} onClick={() => {
                  handleOnUpdateMenu(menu);
                }}>Edit</Button>
              </Grid>
            </Grid>
            <Grid item><Divider /></Grid>
          </Grid>
        ))}
      </Grid>}
      {showNoMenus && <div>No menus :/ </div>}
      {showLoading && <div>Loading.....</div>}
      <Grid item={true}>
        <Button variant="contained" color="primary" onClick={handleOnAddMenu}>Create Menu</Button>
      </Grid>
      <CreateEditMenuModal
        isOpen={isCreateMenuOpen}
        onClose={() => setIsCreateMenuOpen(false)}
        onSubmit={handleOnSubmit}
        menuToUpdate={menuToUpdate}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onAccept={handleOnAcceptDeleteMenu}
        onReject={() => setIsConfirmationModalOpen(false)}
        title={'Delete menu'}
        message={deleteMessage}
      />
    </Grid>
  );
};
