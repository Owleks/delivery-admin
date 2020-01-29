import React from 'react';
import {apiClient, setAuthToken} from './ApiClient';
import {getUserWithToken} from './ApiRequests';

export const AuthContext = React.createContext(undefined);

export default class AuthContextComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            user: undefined,
            accessToken: undefined,
        };

        this.rehydrateFromLocalStorage();
    }

    rehydrateFromLocalStorage = async () => {
        const token = localStorage.getItem('accessToken');
        if(token){
            setAuthToken(token);
            const {user, tokens} = await getUserWithToken();

            this.setState({
                accessToken: tokens.accessToken,
                isLoggedIn: true,
                user: user,
            });
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
            localStorage.setItem('accessToken', response.data.tokens.accessToken);
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
            localStorage.setItem('accessToken', response.data.tokens.accessToken);
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