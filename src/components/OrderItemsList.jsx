import React, { memo } from 'react';
import { Grid, Card, CardMedia, Typography, makeStyles } from '@material-ui/core';
import { ENVIRONMENT } from '../environments/environment';

const useStyles = makeStyles(theme => ({
  item: {
    width: 600,
    height: 200,
    margin: theme.spacing(1, 1, 0, 1),
    '&:last-child': {
      marginBottom: theme.spacing(1),
    },
  },
  removed: {
    filter: 'grayscale(1)',
  },
  content: {
    padding: theme.spacing(2),
  },
  image: {
    width: 200,
    height: 200,
  },
}));

export const OrderItemsListComponent = memo(({ items }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      {items.map(item => (
        <Card key={item._id} className={`${classes.item} ${item.removed && classes.removed}`}>
          <Grid container>
            <Grid item xs={4}>
              <CardMedia className={classes.image} image={ENVIRONMENT.UPLOADS + item.image} title={item.name} />
            </Grid>
            <Grid container item direction="column" className={classes.content} xs={8}>
              <Grid container item><Typography variant="h5">{item.name} ({item.count})</Typography></Grid>
              <Grid container item><Typography variant="body1">{item.description}</Typography></Grid>
              <Grid container item><Typography variant="body2">{item.price} UAH</Typography></Grid>
              {item.removed && <Grid container item><Typography variant="h6"><b>Removed from menu</b></Typography></Grid>}
            </Grid>
          </Grid>
        </Card>
      ))}
    </Grid>
  );
});
