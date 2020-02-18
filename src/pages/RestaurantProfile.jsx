import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup, FormControl, TextField, Button, CircularProgress } from "@material-ui/core";

import * as Api from "../common/ApiRequests";
import { AuthContext } from "../common/AuthContext";

export const RestaurantProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const { displayName, domainName } = restaurant;
  const { user } = useContext(AuthContext);

  const fetchRestaurant = async () => {
    setIsLoading(true);
    try {
      const restaurant = await Api.fetchRestaurant(user.restaurant);
      setRestaurant(restaurant);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);

    }
  };

  useEffect(() => {
    if(user) {
      fetchRestaurant();
    }
  }, [user]);

  const submit = async ({ restaurantName }) => {
    setIsLoading(true);
    try {
      const updatedRestaurant = await Api.updateRestaurant(user.restaurant, { restaurantName });
      setRestaurant(updatedRestaurant);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);

    }
  };

  if(isLoading) {
    return (<CircularProgress/>);
  }

  return <>
    <form>
      <FormGroup>
        <FormControl>
          <TextField name="restaurantName"
                     label="Restaurant Name:"
                     fullWidth
                     error={!!errors.restaurantName}
                     helperText={errors.restaurantName?.message}
                     defaultValue={displayName}
                     inputRef={register({ required: 'Restaurant name field is required' })}
          />
        </FormControl>
        <br/>
        <FormControl>
          <TextField name="restaurantDomain"
                     label="Restaurant domain name"
                     disabled
                     fullWidth
                     defaultValue={domainName}
          />
        </FormControl>
      </FormGroup>
    </form>
    <br/>
    <br/>
    <br/>
    <Button color="primary"
            variant="contained"
            onClick={handleSubmit(submit)}
            fullWidth>
      Update Restaurant
    </Button>
  </>
};
