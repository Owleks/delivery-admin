import React from 'react';
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
  noOrders: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  }
});

const OrderCategory = (props) => {
  const {orders, category, onConfirm, onDelete} = props;
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
            <Grid item xs={2}>{order.customerName}</Grid>
            <Grid item xs={1}>{order.phoneNumber}</Grid>
            <Grid item xs={2}>{order.address}</Grid>
            <Grid item xs={1}>{order.dateToDisplay}</Grid>
            <Grid item xs={1}>{order.deliveryTime}</Grid>
            <Grid item xs={1}>{order.description}</Grid>
            <Grid item xs={1}>{order.items.length}</Grid>
            <Grid item xs={1}>{order.totalPrice}$</Grid>
            <Grid item xs={2}>
              {category === 'active' && (
                <Button variant="contained" color="primary" onClick={() => onConfirm(order)}>Confirm</Button>
              )}
              {category === 'confirmed' && (
                <Button variant="contained" color="primary" onClick={() => onDelete(order)}>Remove</Button>
              )}
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderCategory;
