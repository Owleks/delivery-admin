import React from 'react';
import {apiClient, setAuthToken} from './ApiClient';

export const AuthContext = React.createContext(undefined);

export default class AuthContextComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: undefined,
            accessToken: undefined,
        };
    }

    rehydrateFromLocalStorage = () => {
        const token = localStorage.getItem('accessToken');
        if(token){
            // TODO
        }
    };

    login = async (login, password) => {
        try {
            const response = await apiClient.post(
                '/user/authenticate',
                {
                    login,
                    password,
                });

            this.setState({
                accessToken: response.data.tokens.accessToken,
                isLoggedIn: true,
                user: response.data.user,
            });

            setAuthToken(response.data.tokens.accessToken);
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    signup = async (restaurant, login, password) => {
        try {
            const response = await apiClient.post(
                '/user',
                {
                    restaurantName: restaurant,
                    login,
                    password,
                });

            this.setState({
                accessToken: response.data.tokens.accessToken,
                isLoggedIn: true,
                user: response.data.user,
            });

            setAuthToken(response.data.tokens.accessToken);
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    render() {

        const contextDataAndActions = {
            ...this.state,
            login: this.login,
            signup: this.signup,
        };

        return (
            <AuthContext.Provider value={contextDataAndActions}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }

    componentDidMount() {
    }

}