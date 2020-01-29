import React from 'react';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';


import './App.css';
import {LeftNavComponent} from './components/LeftNav';
import {OrdersPageComponent} from './pages/Orders';
import {MenusPageComponent} from './pages/Menus';
import {LoginPageComponent} from './pages/Login';
import {SignupPageComponent} from './pages/Signup';
import {HeaderComponent} from './components/Header';
import AuthContextComponent from './common/AuthContext';

const history = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <AuthContextComponent>
                    <HeaderComponent/>
                    <LeftNavComponent/>
                    <Route path="/menus">
                        <MenusPageComponent/>
                    </Route>
                    <Route path="/orders">
                        <OrdersPageComponent/>
                    </Route>
                    <Route path="/login">
                        <LoginPageComponent/>
                    </Route>
                    <Route path="/signup">
                        <SignupPageComponent/>
                    </Route>
                </AuthContextComponent>
            </Router>

        </div>
    );
}

export default App;
