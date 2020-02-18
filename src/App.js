import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline, makeStyles } from '@material-ui/core';

import './App.css';
import { LeftNavComponent, NAVBARWIDTH } from './components/LeftNav';
import { OrdersPageComponent } from './pages/Orders';
import { RestaurantProfile } from './pages/RestaurantProfile';
import { MenusPageComponent } from './pages/Menus';
import { LoginPageComponent } from './pages/Login';
import { SignupPageComponent } from './pages/Signup';
import { HeaderComponent } from './components/Header';
import AuthContextComponent from './common/AuthContext';
import { MenuItemsPageComponent } from './pages/MenuItems';
import { OrderPreviewComponent } from './pages/OrderPreview';

const history = createBrowserHistory();
const useStyles = makeStyles({
  leftNavOffset: {
    marginLeft: NAVBARWIDTH,
  },
  contentPadding: {
    padding: 25,
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <CssBaseline/>
      <Router history={history}>
        <AuthContextComponent>
          <LeftNavComponent/>
          <div className={classes.leftNavOffset}>
            <HeaderComponent/>
            <div className={classes.contentPadding}>
              <Route exact path="/menus">
                <MenusPageComponent/>
              </Route>
              <Route exact path="/orders">
                <OrdersPageComponent/>
              </Route>
              <Route exact path="/orders/:orderId">
                <OrderPreviewComponent/>
              </Route>
              <Route path="/login">
                <LoginPageComponent/>
              </Route>
              <Route path="/signup">
                <SignupPageComponent/>
              </Route>
              <Route path="/menus/:menuId">
                <MenuItemsPageComponent/>
              </Route>
              <Route path="/restaurant-profile">
                <RestaurantProfile/>
              </Route>
            </div>
          </div>
        </AuthContextComponent>
      </Router>
    </div>
  );
}

export default App;
