import React, {useEffect, useState} from 'react';
import {Grid, Card, Button, CircularProgress} from '@material-ui/core';

import * as Api from '../common/ApiRequests';

export const OrdersPageComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        setIsLoading(true);
        const orders = await Api.fetchOrders();
        setOrders(orders);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (isLoading) {
        return (<CircularProgress/>);
    }

    if (!isLoading && !orders.length) {
        return (<div>No orders yet</div>)
    }

    return (
        <Grid container={true} direction="column">
            {orders.length && orders.map(order => (
                <Grid item={true}>
                    <Card>
                        <Grid container={true} direction="row" justify="space-between">
                            <Grid item={true}>
                                <div>Items: 13</div>
                                <div>Total price: 270$</div>
                            </Grid>
                            <Grid item={true}>
                                <div>Lviv, Stusa 18</div>
                            </Grid>
                            <Grid item={true}>
                                <div>
                                    <Button variant="contained" color="primary"
                                            onClick={() => alert('TODO')}>Confirm</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
