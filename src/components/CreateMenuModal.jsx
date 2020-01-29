import React, {memo, useEffect, useState} from 'react';
import {Dialog, DialogTitle, Grid, TextField, Button, CircularProgress} from '@material-ui/core';

import * as Api from '../common/ApiRequests';

export const CreateMenuModal = memo((props) => {
    const {isOpen, onClose, onMenuCreated} = props;
    const [isCreating, setIsCreating] = useState(false);
    const [menuName, setMenuName] = useState('');

    const createMenu = async () => {
        setIsCreating(true);
        await Api.createMenu({name: menuName});
        setIsCreating(false);
        onMenuCreated();
    };

    const onNameChange = (e) => {
        const name = e.target.value;
        setMenuName(name);
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Create Menu</DialogTitle>
            <Grid container={true}>
                <form noValidate autoComplete="off">
                    <TextField label="Menu Name" value={menuName} onChange={onNameChange}/>
                    <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createMenu}
                    >
                        {isCreating ? <CircularProgress/> : 'Create'}
                    </Button>
                </form>
            </Grid>
        </Dialog>
    );
});
