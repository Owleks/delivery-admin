import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize',
  },
  order: {
    height: 100,
    '& div': {
      maxHeight: 100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  noOrders: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

const OrderCategory = (props) => {
  const { orders, category } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column" item>
      <Grid item>
        <Card className={classes.header}><b>{category} orders</b></Card>
      </Grid>
      {!orders.length && (
        <Grid container item className={classes.noOrders}>
          <b>No orders found</b>
        </Grid>
      )}
      {!!orders.length && orders.map(order => (
        <Grid item key={order._id}>
          <Grid container item className={classes.order} alignItems="center" justify="center">
            <Grid item xs={1}>{order.customerName}</Grid>
            <Grid item xs={1}>{order.phoneNumber}</Grid>
            <Grid item xs={1}>{order.address}</Grid>
            <Grid item xs={1}>{order.created}</Grid>
            <Grid item xs={1}>{order.updated}</Grid>
            <Grid item xs={1}>{order.deliveryTime}</Grid>
            <Grid item xs={1}>{order.description}</Grid>
            <Grid item xs={1}>{order.totalItemsCount}</Grid>
            <Grid item xs={1}>{order.totalPrice} UAH</Grid>
            <Grid item xs={1} className={classes.capitalize}>{order.status}</Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" component={Link} to={`/orders/${order._id}`}>Preview</Button>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderCategory;
