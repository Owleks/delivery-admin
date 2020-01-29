import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress, Box, makeStyles,
} from "@material-ui/core";
import * as Api from '../common/ApiRequests';

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
    const {isCreate, isOpen, onClose, onSubmit} = props;
    const {menuId} = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [inProgress, setInProgress] = useState(false);

    const handleSubmit = async () => {
        setInProgress(true);
        if (!name || !price || !description) // TODO: show error
            return;
        await Api.createMenuItem({menuId, name, price, description});
        setInProgress(false);
        onSubmit();
    };

    const handleNameChange = ({target: {value: name}}) => {
        setName(name);
    };
    const handlePriceChange = ({target: {value: price}}) => {
        setPrice(price);
    };
    const handleDescriptionChange = ({target: {value: description}}) => {
        setDescription(description);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>{isCreate ? "Create" : "Edit"} menu item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Price"
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Description"
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        fullWidth
                    />
                    {inProgress && <Box className={classes.centered}><CircularProgress /></Box>}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        {isCreate ? "Create item" : "Edit item"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateEditMenuItemModal;
