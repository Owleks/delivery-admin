import React from 'react';
import { FormGroup, FormControl, TextField, Button } from "@material-ui/core";

export const ProfileSettings = () => {
  return <>
    <form>
      <FormGroup>
        <FormControl>
          <TextField name="customerName"
                     label="Name:"
                     fullWidth
          />
        </FormControl>
        <FormControl>
          <TextField name="phoneNumber"
                     label="Phone:"
                     fullWidth
          />
        </FormControl>
        <FormControl>
          <TextField label="Address:"
                     name="address"
                     fullWidth
          />
        </FormControl>
        <FormControl>
          <TextField name="deliveryTime"
                     label="Delivery Time:"
                     fullWidth
          />
        </FormControl>
        <FormControl>
          <TextField name="description"
                     label="Comment:"
                     fullWidth
                     rows={4}
                     multiline
          />
        </FormControl>
      </FormGroup>
    </form>
    <Button disabled={false} color="primary" variant="contained" onClick={()=>console.log('adfasdf')}
            fullWidth>
      Order now
    </Button>
  </>
};