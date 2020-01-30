import React, { memo, useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, Grid, TextField, Button, CircularProgress, Box, DialogContent, DialogActions,
} from '@material-ui/core';

import * as Api from '../common/ApiRequests';

export const CreateEditMenuModal = memo((props) => {
  const { isOpen, onClose, onSubmit, menuToUpdate } = props;
  const [inProgress, setInProgress] = useState(false);
  const [menuName, setMenuName] = useState('');

  const handleOnSubmit = async () => {
    setInProgress(true);
    if (!menuToUpdate) {
      await Api.createMenu({ name: menuName });
    } else {
      await Api.updateMenu({
        ...menuToUpdate,
        name: menuName,
      });
    }
    setInProgress(false);
    onSubmit();
  };

  const onNameChange = (e) => {
    const name = e.target.value;
    setMenuName(name);
  };

  useEffect(() => {
    if (menuToUpdate) {
      setMenuName(menuToUpdate.name);
    } else {
      setMenuName('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{menuToUpdate ? 'Update' : 'Create'} Menu</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <Grid item>
            <TextField label="Menu Name" value={menuName} onChange={onNameChange} autoFocus />
          </Grid>
          <Box mt={3} />
        </form>
        {inProgress && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnSubmit}
        >
          {menuToUpdate ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
