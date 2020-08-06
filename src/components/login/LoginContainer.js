import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { logIn, setLoading } from '../../actions';

function LoginContainer(props) {
    const onLoginClick = (userName, password) => {
        props.setLoading({ isLoading: true });
        props.logIn({ username: userName, password });
    }

    return <LoginForm
        isLoading={props.isLoading}
        onSubmit={onLoginClick}
        message={props.message}
        login={props.login}
    />
}

function mapStateToProps({ loader }) {
    return { isLoading: loader.isLoading };
}
export default connect(mapStateToProps, { logIn, setLoading })(LoginContainer);
