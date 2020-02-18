import React, {memo, useState} from 'react';
import {
  Dialog, DialogTitle, Grid, TextField, Button, CircularProgress, Box, DialogContent, DialogActions,
} from '@material-ui/core';

import {useForm} from 'react-hook-form';

import * as Api from '../common/ApiRequests';

export const CreateEditMenuModal = memo((props) => {
  const { isOpen, onClose, onSubmit, menuToUpdate } = props;
  const [inProgress, setInProgress] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleOnSubmit = async (form) => {
    const { menuName, menuImg } = form;
    const menuForm = new FormData();
    menuForm.append('name', menuName);
    menuForm.append('img', menuImg[0]);
    setInProgress(true);
    if (!menuToUpdate) {
      //todo: OLO: api logic should be in services?
      await Api.createMenu(menuForm);
    } else {
      menuForm.append('_id', menuToUpdate._id);
      //todo: OLO: api logic should be in services?
      await Api.updateMenu(menuForm);
    }
    setInProgress(false);
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{menuToUpdate ? 'Update' : 'Create'} Menu</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <Grid item>
            <TextField name="menuName"
                       value={menuToUpdate?.name}
                       inputRef={register({
                         required: 'Menu name is required'
                       })}
                       helperText={errors.menuName?.message}
                       error={!!errors.menuName}
                       required
                       label="Menu name:"
                       autoFocus />
          </Grid>
          <Box mt={2} />
          <Grid item>
            <TextField type="file"
                       name="menuImg"
                       label="Menu image:"
                       InputLabelProps={{ shrink: true }}
                       required
                       helperText={errors.menuImg?.message}
                       error={!!errors.menuImg}
                       inputProps={{
                         accept: "image/*"
                       }}
                       inputRef={register({ required: 'Menu image is required' })}
            />
          </Grid>
          <Box mt={3} />
        </form>
        {inProgress && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleOnSubmit)}
        >
          {menuToUpdate ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
