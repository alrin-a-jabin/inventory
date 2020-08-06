import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCredentials } from '../ajax/index';
import LoginContainer from './LoginContainer';

class Login extends Component {

    render() {
        const { login } = this.props;
        if (login && login.isLoggedIn) {
            setCredentials(login.userDetails.token, login.userDetails.userId);
        }
        if (login && login.userDetails && login.userDetails.forceChangePassword) {
          return <Redirect to="forceChangePassword" />
        }
        else if (login && login.isLoggedIn) {
          return <Redirect to="home" />
        }
        else {
            setCredentials('', '');
            return (
               
                <div>
                    <LoginContainer 
                    login = {this.props.login}
                    message={this.props.login.respMsg}/>
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    return { login: state.login };
}

export default connect(mapStateToProps)(Login);
