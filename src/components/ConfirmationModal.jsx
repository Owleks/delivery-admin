import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';

const ConfirmationModal = (props) => {
  const { isOpen, onClose, onAccept, onReject, title, message } = props;
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={onReject}>Disagree</Button>
          <Button variant="contained" onClick={onAccept}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
