import React, { useContext, useEffect, useState } from 'react';
import { Grid, CircularProgress, Divider, makeStyles } from '@material-ui/core';
import { AuthContext } from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import * as Helpers from '../common/Helpers';
import OrderCategory from './OrderCategory';

const useStyles = makeStyles({
  header: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  order: {
    height: 100,
    '& div': {
      maxHeight: 100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

export const OrdersPageComponent = () => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchAndPrepareOrders = async () => {
    setIsLoading(true);
    const orders = await Api.fetchOrders();
    const menuItems = await Api.fetchRestaurantMenuItems(user.restaurant);
    const transformedOrders = orders.map(order => Helpers.fillOrderData(order, menuItems));
    setOrders(transformedOrders);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchAndPrepareOrders();
    }
  }, [user]);

  if (isLoading) {
    return (<CircularProgress />);
  }

  if (!isLoading && !orders.length) {
    return (<div>No orders yet</div>);
  }

  const openOrders = orders.filter(order => order.status === 'open');
  const confirmedOrders = orders.filter(order => order.status === 'confirmed');
  const archivedOrders = orders.filter(order => order.status === 'archived');

  return (
    <Grid container={true} direction="column">
      <Grid container className={classes.order} alignItems="center" justify="center">
        <Grid item xs={1}>Customer name</Grid>
        <Grid item xs={1}>Phone number</Grid>
        <Grid item xs={2}>Address</Grid>
        <Grid item xs={1}>Created</Grid>
        <Grid item xs={1}>Updated</Grid>
        <Grid item xs={1}>Delivery time</Grid>
        <Grid item xs={1}>Description</Grid>
        <Grid item xs={1}>Items</Grid>
        <Grid item xs={1}>Total</Grid>
        <Grid item xs={2}> </Grid>
      </Grid>
      <Divider />
      <OrderCategory orders={openOrders} category='open' />
      <OrderCategory orders={confirmedOrders} category='confirmed' />
      <OrderCategory orders={archivedOrders} category='archived' />
    </Grid>
  );
};
