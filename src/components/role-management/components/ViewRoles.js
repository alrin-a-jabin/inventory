import React, { Component, Fragment } from "react";
import { Switch, Redirect } from "react-router-dom";
import _ from "lodash";
import { Popup, POPUP_ALIGN } from '@6d-ui/popup';
import SearchFilter from "./SearchFilter";
import RoleDetails from "./RoleDetails";
import { ROLES as DataTableHeader } from './util/DataTableHeader';
import { DataTableContainer } from "../../data-table";

const modules = [];

export default class View extends Component {
  constructor(props) {
    super(props);
    this.FORM_MODAL = props.globalConstants.FORM_MODAL;

    if (!props.previousState) {
      this.state = {
        filterParams: {}
      };
    } else {
      this.state = {
        roleId: "",
        roleName: "",
        permissions: "",
        ajaxUtil: props.previousState.ajaxUtil,
        filterParams: props.previousState.filterParams,
      };
    }

    this.toggleAction = this.toggleAction.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    props.setHeader("Roles");
  }

  deleteRow(obj, message, callback) {
    this.props.setModalPopup({
      'rowId': obj,
      'isOpen': true,
      'onConfirmCallBack': this.onConfirmCallBack.bind(this, callback),
      'title': "Confirm Delete",
      'content': message,
      'CancelBtnLabel': "Cancel",
      'confirmBtnLabel': "Delete"
    });
  }

  onConfirmCallBack(callback, rowId) {
    this.props.ajaxUtil.sendRequest(this.props.url_Roles.DELETE_URL+rowId, {}, callback, this.props.loadingFunction,
      { method: 'GET', isShowSuccess: true });
  }

  toggleAction(type, id) {

    if (type === this.FORM_MODAL.View) {
      this.props.ajaxUtil.sendRequest(this.props.url_Roles.GET_FEATURES,
        {},
        response => {

          if (!response) {
            this.props.setNotification({
              message: "Failed to load modules",
              hasError: true,
              timestamp: new Date().getTime()
            });
          } else {
            _.pullAll(modules, modules);
            response&&response.response.forEach((module, index) => {
              modules.push(module);
            });

            this.props.ajaxUtil.sendRequest(`${this.props.url_Roles.SEARCH_URL}/${id}`, {},
              response => {

                this.viewDataCallBack(response)

              },
              this.props.loadingFunction,
              { method: 'GET', isShowSuccess: false });
          }


        },
        this.props.loadingFunction,
        { method: "GET", isShowSuccess: false });
      return false;
    } else {
      this.setState({ modal: type, actionParamId: id });
    }
  }

  viewDataCallBack(response) {
    if (!response) {
      this.props.setNotification({
        message: "Failed to load Role Details",
        hasError: true,
        timestamp: new Date().getTime()
      });
    } else {
      // const roleDetails = response.roleMaster;
      const roleDetails = response;
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
        isLoading: false,
        roleId: roleDetails.roleId,
        roleName: roleDetails.roleName,
        // roleDesc: roleDetails.roleDesc,
        // createdUser: roleDetails.createdUser,
        createdDate: roleDetails.createdDate,
        permissions: permissions,
        modules: modules,
        modal: 4
      });
    }
  }
  getCurrentPermissions(permissions, currentFeatures) {
    const permissionList = [];
    _.forEach(permissions, function (feature) {
      if (_.indexOf(currentFeatures, feature.featureId) >= 0) {
        const temp = {
          value: feature.featureId,
          label: feature.featureName
        };

        permissionList.push(temp);
      }
    });

    return permissionList;
  }

  handleSearchFilterSubmit = onSearchFn => data => {

    this.setState({ filterParams: data || {} });
    onSearchFn(data);
  }

  renderSearchFilter = searchFilterProps => <SearchFilter
    {...this.state}
    ajaxUtil={this.props.ajaxUtil}
    // onCancel={() => searchFilterProps.toggleAction(0, null)}
    onCancel={() => searchFilterProps.togglePopup(0, null)}
    onSubmitClick={this.handleSearchFilterSubmit(searchFilterProps.onSearch)}
    {...this.state.filterParams}
  />



  render() {

    const propsForDataTable = {
      privilages: this.props.privilages,
      menuPrivilages: this.props.menuPrivilages,
      ajaxUtil: this.props.ajaxUtil,
      listUrl: this.props.url_Roles.SEARCH_URL,
      previousState: this.props.previousState,
      apiVersion: 3,
      defaultRowCount: this.props.globalConstants.INITIAL_ROW_COUNT,
      rowIdParam: 'roleId',
      tableHeaderLabels: DataTableHeader.LABEL_LIST,
      loadingFunction: this.props.loadingFunction,
      header: "Roles",
      togglePopup: this.toggleAction,
      deleteRow: this.deleteRow,
      deleteMessage: 'Are you sure to Delete role',
      deleteMessageParam: ['roleName'],
      saveState: state => this.props.saveCurrentState({ [this.props.previousStateKey]: state }),
      orderByCol: "roleId",
      tabPriv: { info: true,delete:true },
      renderSearchFilter: this.renderSearchFilter,
      filterLabelList: DataTableHeader.SEARCH_FIELDS,
      tableSearchFilters: DataTableHeader.SEARCH_FILTERS,

    }

    if (this.state.modal === 2) {
      return (
        <Switch>
          <Redirect to="/Roles/create" push />
        </Switch>
      );
    }
    if (this.state.modal === 3) {
      const editUrl = `/Roles/edit/${this.state.actionParamId}`;
      return (
        <Switch>
          <Redirect to={editUrl} />
        </Switch>
      );
    }

    return (
      <div className="custom-container">
        <DataTableContainer
          {...propsForDataTable}
        >
        </DataTableContainer>

        <Popup
          type={POPUP_ALIGN.RIGHT}
          title="View"
          isOpen={this.state.modal === 4}
          close={this.toggleAction}
          minWidth="85%"
          component={
            <RoleDetails
              {...this.state}
              ajaxUtil={this.props.ajaxUtil}
              onCancel={() => this.toggleAction(0, null)}
            />
          }
        />
      </div>
    );
  }
}


