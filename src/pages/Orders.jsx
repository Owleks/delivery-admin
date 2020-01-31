import React, { useEffect, useState } from 'react';
import { Grid, Button, CircularProgress, Divider, makeStyles } from '@material-ui/core';

import * as Api from '../common/ApiRequests';

const useStyles = makeStyles(theme => ({
  order: {
    height: 100,
    '& div': {
      maxHeight: 100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}));

export const OrdersPageComponent = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setIsLoading(true);
    const orders = await Api.fetchOrders();
    setOrders(orders);
    setIsLoading(false);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.toLocaleDateString()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return (<CircularProgress />);
  }

  if (!isLoading && !orders.length) {
    return (<div>No orders yet</div>);
  }

  return (
    <Grid container={true} direction="column">
      <Grid container className={classes.order} alignItems="center" justify="center">
        <Grid item xs={2}>Customer name</Grid>
        <Grid item xs={1}>Phone number</Grid>
        <Grid item xs={2}>Address</Grid>
        <Grid item xs={1}>Created</Grid>
        <Grid item xs={1}>Delivery time</Grid>
        <Grid item xs={1}>Description</Grid>
        <Grid item xs={1}>Items</Grid>
        <Grid item xs={1}>Total</Grid>
        <Grid item xs={2}>Controls</Grid>
      </Grid>
      <Divider />
      {orders.length && orders.map(order => (
        <Grid item key={order._id}>
          <Grid container item className={classes.order} alignItems="center" justify="center">
            <Grid item xs={2}>{order.customerName}</Grid>
            <Grid item xs={1}>{order.phoneNumber}</Grid>
            <Grid item xs={2}>{order.address}</Grid>
            <Grid item xs={1}>{formatDate(order.dateCreated)}</Grid>
            <Grid item xs={1}>{order.deliveryTime}</Grid>
            <Grid item xs={1}>{order.description}</Grid>
            <Grid item xs={1}>{order.items.length}</Grid>
            <Grid item xs={1}>228$</Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={() => alert('TODO')}>Confirm</Button>
              <Button disabled={!order.isConfirmed} variant="contained" color="primary"
                      onClick={() => alert('TODO')}>Remove</Button>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
};
