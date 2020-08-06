import { connect } from 'react-redux';
import EnsureLoggedInContainer from '../util/EnsureLoggedInContainer';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContextProvider from '../util/ContextProvider';
import Login from './login/Login';
import Home from './home/Home';
import { setBaseURL } from './ajax/index';
import { BASE_URL} from '../util/Constants';
import ForgetPwd from './forgetPwd/ForgetPwd';
import ChangePassword from './login/ForceChangePassword';
//css imports
import '@6d-ui/fields/build/styles/min/style.min.css';
import './data-table/styles/min/style.min.css';
import '@6d-ui/buttons/build/styles/min/style.min.css';
import '@6d-ui/popup/build/styles/min/style.min.css'
import '@6d-ui/ui-components/build/styles/min/style.min.css';
import '@6d-ui/form/build/styles/min/style.min.css';
import './styleSheet/common/form.css';
import './styleSheet/out/style.css';
import './styleSheet/out/skeleton.css';
import './styleSheet/out/inventory.css';
import './Login.css';
import 'react-sortable-tree/style.css';
import { MemoryRouter } from 'react-router'

class App extends Component {
  componentDidMount() {
    setBaseURL(BASE_URL);
  }
  render() {
    return (
      <ContextProvider.Provider value={{
      }}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/forgetPassword/:userName/:serviceId" component={ForgetPwd} />
            <Route path="/forceChangePassword" component={ChangePassword} />
            <EnsureLoggedInContainer>
                <Route  component={Home} />
            </EnsureLoggedInContainer>
          </Switch>
        </BrowserRouter>
      </ContextProvider.Provider>
    );
  }
}

function mapStateToProps(state) {
  return { login: state.login };
}

export default connect(mapStateToProps)(App);
