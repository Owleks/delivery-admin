import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, CircularProgress, Grid, Box, Button } from '@material-ui/core';
import { AuthContext } from '../common/AuthContext';
import * as Api from '../common/ApiRequests';
import * as Helpers from '../common/Helpers';

const useStyles = makeStyles(theme => ({
  header: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfo: {
    height: 'auto',
    minHeight: 50,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:first-child': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    '& div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& div:nth-child(2)': {
      justifyContent: 'start',
      borderLeft: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2),
    },
  },
  description: {
    textAlign: 'start',
  },
  orderStatus: {
    textTransform: 'capitalize',
  },
  controls: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
    '& button': {
      margin: theme.spacing(0, 1),
    },
  },
}));

export const OrderPreviewComponent = () => {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(undefined);

  const goBack = () => {
    history.push('/orders');
  };

  const changeOrderStatus = async (status) => {
    // TODO: add confirmation
    // setIsLoading(true); // TODO: add isUpdating (isLoading will cause blink)
    const newOrder = await Api.changeOrderStatus(order._id, status);
    setOrder(newOrder);
    // setIsLoading(false);
  };

  const fetchOrderInformation = async (orderId) => {
    setIsLoading(true);
    const order = await Api.fetchOrder(orderId);
    const menuItems = await Api.fetchRestaurantMenuItems(user.restaurant);
    const transformedOrder = Helpers.fillOrderData(order, menuItems);
    transformedOrder.items = Helpers.fillOrderItemsData(transformedOrder.items, menuItems);
    setOrder(transformedOrder);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchOrderInformation(orderId);
    }
  }, [user]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isLoading && !order) {
    return <>Order not found</>;
  }

  const controls = (
    <>
      <Box className={classes.controls}>
        <Button variant="contained" onClick={() => goBack()}>Back</Button>
        {order.status === 'open' && <>
          <Button variant="contained" onClick={() => changeOrderStatus('removed')}>Remove order</Button>
          <Button variant="contained" onClick={() => changeOrderStatus('confirmed')} color="primary">Confirm order</Button>
        </>}
        {order.status === 'confirmed' && <>
          <Button variant="contained" onClick={() => changeOrderStatus('open')}>Re-open order</Button>
          <Button variant="contained" onClick={() => changeOrderStatus('removed')} color="primary">Remove order</Button>
        </>}
        {order.status === 'removed' && <>
          <Button variant="contained" onClick={() => changeOrderStatus('open')} color="primary">Re-open order</Button>
        </>}
      </Box>
    </>
  );

  return (
    <>
      <Box className={classes.header}><b>Order preview</b></Box>
      <Grid container direction="column">
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Order ID:</b></Grid>
          <Grid item xs={10}>{order._id}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Order status:</b></Grid>
          <Grid item xs={10} className={classes.orderStatus}><b>{order.status}</b></Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Customer name:</b></Grid>
          <Grid item xs={10}>{order.customerName}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Phone:</b></Grid>
          <Grid item xs={10}>{order.phoneNumber}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Address:</b></Grid>
          <Grid item xs={10}>{order.address}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Created:</b></Grid>
          <Grid item xs={10}>{order.created}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Updated:</b></Grid>
          <Grid item xs={10}>{order.updated}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Delivery time:</b></Grid>
          <Grid item xs={10}>{order.deliveryTime}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Description:</b></Grid>
          <Grid item xs={10} className={classes.description}>{order.description}</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Items:</b></Grid>
          <Grid item xs={10}>// TODO: add items component here</Grid>
        </Grid>
        <Grid container item className={classes.orderInfo}>
          <Grid item xs={2}><b>Total:</b></Grid>
          <Grid item xs={10}>{order.totalPrice} UAH</Grid>
        </Grid>
      </Grid>
      {controls}
    </>
  );
};
