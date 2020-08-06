import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import Permissions from './Permissions';
import {
  CustomButton,
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_SIZE,
  COLOR
} from '@6d-ui/buttons';
import { FieldItem, validateForm } from '@6d-ui/fields';
import { ROLES as FormElements } from './util/FormElements';


export default class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: '',
      modules: [],
      isSuccess: false,
      fields: {}
    };
    this.getRequest = this.getRequest.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.getPermissions = this.getPermissions.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.props.setHeader("Roles");
  }

  componentDidMount() {
    this.props.ajaxUtil.sendRequest(this.props.url_Roles.GET_FEATURES,

      {}, (response) => {
        this.setState({
          modules: response&&response.response

        });
      }, this.props.loadingFunction, { method: 'GET', isShowSuccess: false });
  }

  getDefaultPermissions(permissions) {
    const permissionList = [];
    _.forEach(permissions, function (feature) {
      if (_.parseInt(feature.isDefault) === 1) {
        const temp = {
          'value': feature.featureId,
          'label': feature.featureName
        }
        permissionList.push(temp);
      }
    });
    return permissionList;
  }

  handleChange(name, value, obj) {
    const { isTouched } = obj || { isTouched: false };
    if (isTouched) {
      value = this.state[name];
    }
    const fields = this.state.fields;
    const validate = validateForm(name, value, FormElements[name], null, null);
    if (validate) {
      fields[name] = validate;
    } else {
      fields[name] = { hasError: false, errorMsg: '' };
    }
    this.setState({ [name]: value, fields });

  }

  createCheck(response, hasError) {
    if (!hasError) {
      this.setState({ isSuccess: true });
    }
  }

  onSubmitClick() {
    const preValidate = (name, value, field) => {
      if (name === 'roleId')
        return { hasError: false, errorMsg: '' };
    }
    let hasError = false;
    const fields = this.state.fields;
    const that = this;
    _.forEach(FormElements, function (value, name) {
      const validate = validateForm(name, that.state[name], FormElements[name], preValidate, null);
      if (validate) {
        if (hasError === false) hasError = validate.hasError;
        fields[name] = validate;
      } else {
        fields[name] = { hasError: false, errorMsg: '' };
      }
    });
    this.setState({ fields });
    if (hasError === true) {
      this.props.setNotification({
        message: this.props.messagesUtil.EMPTY_FIELD_MSG,
        hasError: true,
        timestamp: new Date().getTime()
      });
      return false;
    }
    const request = this.getRequest();
    this.props.ajaxUtil.sendRequest(this.props.url_Roles.CREATE_URL, request, this.createCheck.bind(this), this.props.loadingFunction, { isProceedOnError: false });

  }

  getRequest() {
    const featureList = []
    const reqPermissions = this.state.permissions;

    Object.keys(reqPermissions).forEach(function (key) {
      if (!_.isEmpty(reqPermissions[key]))
        reqPermissions[key].forEach((feature, index) => {
          featureList.push({ featureId: feature.value });
        });
    }
    );



    return {
      "roleName": this.state.roleName,
      "featureList": featureList
      // "roleName": this.state.roleName,
      // "createdUser": "1",
      // "featureIds": featureList
    }
  }

  handleDropDownChange(name, selectedOption, obj) {

    const { isTouched } = obj || { isTouched: false };
    if (!isTouched && selectedOption) {
      if (selectedOption.length > 0)
        this.setState({
          permissions: {
            ...this.state.permissions,
            [name]: selectedOption
          }
        });
      else
        this.setState({
          permissions: {
            ...this.state.permissions,
            [name]: ''
          }
        });
    }
  }

  handleSwitch(data, e) {
    const resetState = this.getDefaultPermissions(data.features);
    if (e.target.checked) {
      this.setState({
        permissions: {
          ...this.state.permissions,
          [data.moduleId]: resetState
        }
      });
    } else {
      this.setState({
        permissions: {
          ...this.state.permissions,
          [data.moduleId]: ''
        }
      });
    }
  }
  onCancel() {
    this.setState({ isSuccess: true });
  }
  getPermissions(permissions) {

    const permissionList = [];
    _.forEach(permissions, function (feature) {
      const temp = {
        'value': feature.featureId,
        'label': feature.featureName
      }
      permissionList.push(temp);
    });
    return permissionList;
  }

  render() {
    if (this.state.isSuccess) {
      return <Redirect to="/Roles" />;
    }

    return (
      <div className="custom-container">
        <div className="form-Brick">
          <div className="form-Brick-Head">
            <span>Role Details</span>
          </div>
          <div className="form-Brick-body">
            <Row className="mx-0">
              <FieldItem
                {...FormElements.roleName}
                value={this.state.roleName}
                onChange={this.handleChange.bind(this, FormElements.roleName.name)}
                touched={this.state.fields.roleName && this.state.fields.roleName.hasError}
                error={this.state.fields.roleName && this.state.fields.roleName.errorMsg} />
            </Row>
          </div>
        </div>

        <div className="form-Brick">
          <div className="form-Brick-Head">
            <span>Permissions</span>
          </div>
          <div className="form-Brick-body">
            <Row className="mx-0">
              <Container>
                <Row className="form-card-header">
                  <Col md="3">Modules</Col>
                  <Col md="3"></Col>
                  <Col md="6">Permissions</Col>
                </Row>
              </Container>
              <Permissions
                modules={this.state.modules}
                handleDropDownChange={this.handleDropDownChange}
                getPermissions={this.getPermissions}
                handleSwitch={this.handleSwitch}
                permissions={this.state.permissions} />
            </Row>
          </div>
        </div>
        <div className="container-fluid">
          <CustomButton
            style={BUTTON_STYLE.BRICK}
            type={BUTTON_TYPE.PRIMARY}
            size={BUTTON_SIZE.LARGE}
            align="right"
            label="Create"
            isButtonGroup={true}
            onClick={this.onSubmitClick.bind(this)}
          />
          <CustomButton
            style={BUTTON_STYLE.BRICK}
            type={BUTTON_TYPE.SECONDARY}
            size={BUTTON_SIZE.LARGE}
            color={COLOR.PRIMARY}
            align="right"
            label="Cancel"
            isButtonGroup={true}
            onClick={this.onCancel.bind(this)}
          />
        </div>
        <div style={{ height: "100px" }}></div>
      </div>
    );
  }

}
