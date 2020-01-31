import React, { useContext, useEffect, useState } from 'react';
import { Grid, CircularProgress, Divider, makeStyles } from '@material-ui/core';

import * as Api from '../common/ApiRequests';
import { AuthContext } from '../common/AuthContext';
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
  const [activeOrders, setActiveOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [deletedOrders, setDeletedOrders] = useState([]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.toLocaleDateString()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  };
  const transformOrders = (orders, menuItems) => (
    orders.map(order => {
      order.totalPrice = 0;
      order.items.forEach(item => {
        order.totalPrice += menuItems[item.menuItemId].price;
      });
      order.created = formatDate(order.dateCreated);
      return order;
    })
  );
  const fetchAndPrepareOrdersData = async () => {
    setIsLoading(true);
    const orders = await Api.fetchOrders();
    const menuItems = await Api.fetchRestaurantMenuItems(user.restaurant);
    const menuItemsAsObject = menuItems.reduce((prev, current) => {
      return {
        ...prev,
        [current._id]: current,
      };
    }, {});
    const transformedOrders = transformOrders(orders, menuItemsAsObject);
    const active = transformedOrders.filter(order => !order.isConfirmed);
    const confirmed = transformedOrders.filter(order => order.isConfirmed && !order.removed);
    const deleted = transformedOrders.filter(order => order.removed);
    setActiveOrders(active);
    setConfirmedOrders(confirmed);
    setDeletedOrders(deleted);
    setIsLoading(false);
  };
  const confirmOrder = async (orderToConfirm) => {
    // TODO: add confirmation modal
    await Api.confirmOrder(orderToConfirm._id);
    const newActiveOrders = activeOrders.filter(order => order._id !== orderToConfirm._id);
    setActiveOrders(newActiveOrders);
    setConfirmedOrders([
      ...confirmedOrders,
      orderToConfirm
    ]);
  };
  const deleteOrder = async (orderToDelete) => {
    // TODO: add confirmation modal
    await Api.deleteOrder(orderToDelete._id);
    const newConfirmedOrders = confirmedOrders.filter(order => order._id !== orderToDelete._id);
    setConfirmedOrders(newConfirmedOrders);
    setDeletedOrders([
      ...deletedOrders,
      orderToDelete
    ]);
  };

  useEffect(() => {
    if (user) {
      fetchAndPrepareOrdersData();
    }
  }, [user]);

  if (isLoading) {
    return (<CircularProgress />);
  }

  if (!isLoading && !activeOrders.length && !confirmedOrders.length && !deletedOrders.length) {
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
      <OrderCategory orders={activeOrders} category='active' onConfirm={confirmOrder} onDelete={deleteOrder} />
      <OrderCategory orders={confirmedOrders} category='confirmed' onConfirm={confirmOrder} onDelete={deleteOrder} />
      <OrderCategory orders={deletedOrders} category='deleted' onConfirm={confirmOrder} onDelete={deleteOrder} />
    </Grid>
  );
};
