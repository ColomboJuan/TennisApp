import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

class GuardRoute extends React.Component {
    render() {
        const {
            type,
            history,
            ...rest
        } = this.props;
        const {
            isLoggedIn,
        } = this.context;

        if (type === 'private' && !isLoggedIn) {
            return <Redirect to="/" />;
        } else if (type === 'public' && isLoggedIn) {
            return <Redirect to="/App" />;
        }

        return <Route {...rest} />;
    };
}

GuardRoute.contextType = AuthContext;

export default GuardRoute;