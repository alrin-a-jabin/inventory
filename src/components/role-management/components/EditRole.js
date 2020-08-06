import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import Permissions from "./Permissions";
import {
  CustomButton,
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_SIZE,
  COLOR
} from '@6d-ui/buttons';
import { FieldItem, validateForm } from '@6d-ui/fields';
import { ROLES as FormElements } from './util/FormElements';

const modules = [];

export default class EditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: "",
      isSuccess: false,
      fields: {}
    };
    this.getRequest = this.getRequest.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.getPermissions = this.getPermissions.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.getAllPermissions = this.getAllPermissions.bind(this);
    this.props.setHeader("Roles");
  }

  componentDidMount() {
    this.getAllPermissions();
  }

  getAllPermissions() {
    this.props.ajaxUtil.sendRequest(
       this.props.url_Roles.GET_FEATURES,
   
      {},
      response => {
        if (!response) {
          this.onCancel();
          this.props.setNotification({
            message: "Failed to load modules",
            hasError: true,
            timestamp: new Date().getTime()
          });
        } else {
          _.pullAll(modules, modules);
          // response.modules.forEach((module, index) => {
            response&&response.response.forEach((module, index) => {
            modules.push(module);
          });

          // const roleId = this.props.match.params.id;
          this.props.ajaxUtil.sendRequest(

              `${this.props.url_Roles.SEARCH_URL}/${this.props.match.params.id}`,
       
            null,
            this.viewDataCallBack.bind(this),
            // this.viewDataCallBack(response),
            this.props.loadingFunction, { method: "GET", isShowSuccess: false }
          );

        }
      },
      this.props.loadingFunction, { method: "GET", isShowSuccess: false }
    );
  }

  viewDataCallBack(response) {
    if (!response) {
      this.props.setNotification({
        message: "Failed to load Role Details",
        hasError: true,
        timestamp: new Date().getTime()
      });
      this.onCancel();
    } else {
      const roleDetails = response;
      // const roleDetails = response.roleMaster;
      const roleFeatures = roleDetails.featureList;
      const currentFeatures = [];
      roleFeatures.forEach((features, index) => {
        currentFeatures.push(features.featureId);
      });
      const permissions = {};
      modules.forEach((module, index) => {
        permissions[module.id] = this.getCurrentPermissions(
          module.featureMaster,
          currentFeatures
        );
      });
      this.setState({
        roleName: roleDetails.roleName,
        createdUser: roleDetails.createdUser,
        createdDate: roleDetails.createdDate,
        permissions: permissions
      });
    }
  }

  getCurrentPermissions(permissions, currentFeatures) {
    const permissionList = [];
    _.forEach(permissions, function (feature) {
     
      if (_.indexOf(currentFeatures, (feature.featureId)) >= 0) {
        const temp = {
          value: feature.featureId,
          label: feature.featureName
        };
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
     this.props.ajaxUtil.sendRequest(`${this.props.url_Roles.UPDATE_URL}/${this.props.match.params.id}`, 
        request, this.createCheck.bind(this), this.props.loadingFunction, { method: "PUT", isProceedOnError: false });
  }

  getRequest() {
    const reqPermissions = this.state.permissions;
    const featureList = [];
    Object.keys(reqPermissions).forEach(function (key) {
      if (!_.isEmpty(reqPermissions[key]))
        reqPermissions[key].forEach((feature, index) => {
          featureList.push({ featureId: feature.value });
        });
    });
    return {
      roleName: this.state.roleName,
      featureList: featureList,
    };
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
            [name]: ""
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
          [data.moduleId]: null
        }
      });
    }
  }

  getDefaultPermissions(permissions) {
    const permissionList = [];
    _.forEach(permissions, function (feature) {
      // if (_.parseInt(feature.isDefault) === 1) {
      if ((feature.isDefault) === 1) {
        const temp = {
          value: feature.featureId,
          label: feature.featureName
        };
        permissionList.push(temp);
      }
    });
    return permissionList;
  }

  onCancel() {
    this.setState({ isSuccess: true });
  }

  getPermissions(permissions) {
    const permissionList = [];
    _.forEach(permissions, function (feature) {
      const temp = {
        value: feature.featureId,
        label: feature.featureName
      };
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
                {...FormElements.roleId}
                value={this.props.match.params.id}
                type="11"
              />
              <FieldItem
                {...FormElements.roleName}
                value={this.state.roleName}
                onChange={this.handleChange.bind(this, FormElements.roleName.name)}
                touched={this.state.fields.roleName && this.state.fields.roleName.hasError}
                error={this.state.fields.roleName && this.state.fields.roleName.errorMsg}
              />
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
                  <Col md="3" />
                  <Col md="6">Permissions</Col>
                </Row>
              </Container>
              <Permissions
                modules={modules}
                handleDropDownChange={this.handleDropDownChange}
                getPermissions={this.getPermissions}
                handleSwitch={this.handleSwitch}
                permissions={this.state.permissions}
              />
            </Row>
          </div>
        </div>
        <div className="container-fluid">
          <CustomButton
            style={BUTTON_STYLE.BRICK}
            type={BUTTON_TYPE.PRIMARY}
            size={BUTTON_SIZE.LARGE}
            align="right"
            label="Update"
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
        <div
          style={{
            height: "100px"
          }}
        />
      </div>
    );
  }
}
