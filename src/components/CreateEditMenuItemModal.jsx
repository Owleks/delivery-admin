import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress, Box, makeStyles, Grid,
} from "@material-ui/core";
import * as Api from '../common/ApiRequests';
import {useForm} from 'react-hook-form';

const useStyles = makeStyles({
  centered: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const CreateEditMenuItemModal = (props) => {
  const classes = useStyles();
  const {itemToUpdate, isOpen, onClose, onSubmit} = props;
  const {menuId} = useParams();
  const {register, handleSubmit, errors} = useForm();
  const [inProgress, setInProgress] = useState(false);

  const submit = async ({description, name, price, menuItemImg}) => {

    const menuItemForm = new FormData();
    menuItemForm.append('name', name);
    menuItemForm.append('description', description);
    menuItemForm.append('price', price);
    menuItemForm.append('img', menuItemImg[0]);
    menuItemForm.append('menuId', menuId);
    setInProgress(true);
    if (!itemToUpdate) {
      await Api.createMenuItem(menuItemForm);
    } else {
      menuItemForm.append('_id', itemToUpdate._id);
      await Api.updateMenuItem(menuItemForm);
    }

    setInProgress(false);
    onSubmit();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{!itemToUpdate ? "Create" : "Edit"} menu item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            autoComplete="off"
            margin="dense"
            label="Name"
            defaultValue={itemToUpdate?.name}
            inputRef={register({required: 'Name is required'})}
            helperText={errors.name?.message}
            error={!!errors.name}
            name="name"
            type="text"
            fullWidth
          />
          <TextField
            required
            autoComplete="off"
            margin="dense"
            label="Price"
            defaultValue={itemToUpdate?.price}
            helperText={errors.price?.message}
            error={!!errors.price}
            inputRef={register({required: 'Price is required'})}
            name="price"
            type="number"
            fullWidth
          />
          <TextField
            autoComplete="off"
            helperText={errors.descriptio?.message}
            error={!!errors.description}
            defaultValue={itemToUpdate?.description}
            inputRef={register({required: 'Description is required'})}
            name="description"
            required
            margin="dense"
            label="Description"
            type="text"
            fullWidth
          />
          <TextField type="file"
                     accept="image/*"
                     name="menuItemImg"
                     label="Menu item image:"
                     InputLabelProps={{shrink: true}}
                     fullWidth
                     helperText={errors.menuItemImg?.message}
                     error={!!errors.menuItemImg}
                     inputRef={register()}
          />
          <Box mt={3} />
          {inProgress && <Box className={classes.centered}><CircularProgress /></Box>}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(submit)}
          >
            {!itemToUpdate ? "Create item" : "Edit item"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateEditMenuItemModal;
