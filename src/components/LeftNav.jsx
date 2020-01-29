import React from 'react';
import {Link} from 'react-router-dom';

export const LeftNavComponent = () => {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/menus">Menus</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};
