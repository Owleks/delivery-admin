import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, CircularProgress, Grid, Box, Button, Select, MenuItem } from '@material-ui/core';
import * as Api from '../common/ApiRequests';
import * as Helpers from '../common/Helpers';
import { AuthContext } from '../common/AuthContext';
import { OrderItemsListComponent } from '../components/OrderItemsList';

const useStyles = makeStyles(theme => ({
  header: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    height: 'auto',
    minHeight: 65,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:first-child': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    padding: theme.spacing(2),
    textAlign: 'start',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  controls: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
  },
  statusChangeControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

const ORDER_STATUSES = ['open', 'confirmed', 'preparing', 'picked', 'delivered'];

export const OrderPreviewComponent = () => {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(undefined);
  const [orderStatus, setOrderStatus] = useState('');
  const [isStatusChangeActive, setIsStatusChangeActive] = useState(false);

  const goBack = () => {
    history.push('/orders');
  };
  const handleStatusChange = async (e) => {
    setOrderStatus(e.target.value);
  };
  const changeOrderStatus = async (status) => {
    setIsLoading(true);
    const newOrder = await Api.changeOrderStatus(order._id, status);
    setOrderStatus(newOrder.status);
    setIsStatusChangeActive(false);
    setIsLoading(false);
  };
  const cancelStatusChange = () => {
    setOrderStatus(order.status);
    setIsStatusChangeActive(false);
  };
  const fetchOrderInformation = useCallback(async (orderId) => {
    setIsLoading(true);
    const order = await Api.fetchOrder(orderId);
    const menuItems = await Api.fetchRestaurantMenuItems(user.restaurant);
    const transformedOrder = Helpers.fillOrderData(order, menuItems);
    transformedOrder.items = Helpers.fillOrderItemsData(transformedOrder.items, menuItems);
    setOrder(transformedOrder);
    setOrderStatus(transformedOrder.status);
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrderInformation(orderId);
    }
  }, [user, orderId, fetchOrderInformation]);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (!isLoading && !order) {
    return <>Order not found</>;
  }

  const statusValueBlock = (<>
    {!isStatusChangeActive && (<>
      <Grid item xs={7} className={classes.value}>
        <Box className={classes.capitalize}><b>{orderStatus}</b></Box>
      </Grid>
      <Grid item xs={3} className={classes.statusChangeControls}>
        <Button variant="contained" color="primary" onClick={() => setIsStatusChangeActive(true)}>Change</Button>
      </Grid>
    </>)}
    {isStatusChangeActive && (<>
      <Grid item xs={7} className={classes.value}>
        <Select value={orderStatus} onChange={handleStatusChange} className={classes.capitalize}>
          {ORDER_STATUSES.map(status => (
            <MenuItem key={status} value={status} disabled={orderStatus === status} className={classes.capitalize}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={3} className={classes.statusChangeControls}>
        <Button variant="contained" onClick={cancelStatusChange}>Cancel</Button>
        <Button variant="contained" onClick={() => changeOrderStatus(orderStatus)} color="primary">Save</Button>
      </Grid>
    </>)}
  </>);

  return (
    <>
      <Box className={classes.header}><b>Order preview</b></Box>
      <Grid container direction="column">
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Order ID:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order._id}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Order status:</b></Grid>
          {statusValueBlock}
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Customer name:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.customerName}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Phone:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.phoneNumber}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Address:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.address}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Created:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.created}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Updated:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.updated}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Delivery time:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.deliveryTime}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Description:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.description}</Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Items:</b></Grid>
          <Grid item xs={10}><OrderItemsListComponent items={order.items} /></Grid>
        </Grid>
        <Grid container item className={classes.info}>
          <Grid item xs={2} className={classes.title}><b>Total:</b></Grid>
          <Grid item xs={10} className={classes.value}>{order.totalPrice} UAH</Grid>
        </Grid>
      </Grid>
      <Box className={classes.controls}>
        <Button variant="contained" onClick={() => goBack()}>Back</Button>
      </Box>
    </>
  );
};
