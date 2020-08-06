import React from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import { ErrorPage, Loading as Loader } from "../../errorPage/ErrorPage";
import {
  ajaxUtil,
  setHeaderUtil,
  saveCurrentStateUtil,
  setNotification,
  setModalPopupUtil,
  setLoadingUtil,
  isComplexTab,
} from "../Utils";
import { MESSAGE_UTILS } from "../../../util/Messages";
import {
  CONSTANTS,
  GLOBAL_CONSTANTS,
  SERVICE_BASE_APPROVALS,
} from "../../../util/Constants";
import { PRIVILIAGES as MENU_PRIVILIAGES } from "../../../util/Privilages";

const Loading = (props) => {
  if (props.isLoading) {
    if (props.timedOut) {
      return <ErrorPage errorCode={404} />;
    } else {
      return <Loader />;
    }
  } else if (props.error) {
    return <ErrorPage errorCode={500} />;
  } else {
    return <ErrorPage errorCode={404} />;
  }
};

function createLoadable(loader) {
  return Loadable({
    loader,
    loading: Loading,
  });
}

const AsyncHome = createLoadable(() =>
  import("../../dashboard/DashBoard").catch((e) => console.error(e))
);

const AsyncChangePassword = Loadable({
  loader: () => import("../../changePswd/ChangePswd"),
  loading: Loading,
});
const AsyncChangePin = Loadable({
  loader: () => import("../../changePin/changePin"),
  loading: Loading,
});

const AsyncRoleCreate = Loadable({
  loader: () =>
    import("../../role-management").then((module) => module.CreateRole),
  loading: Loading,
});
const AsyncRoleEdit = Loadable({
  loader: () =>
    import("../../role-management").then((module) => module.EditRole),
  loading: Loading,
});
const AsyncRoleView = Loadable({
  loader: () => import("../../role-management").then((module) => module.View),
  loading: Loading,
});

const AsyncProductMaster = Loadable({
  loader: () =>
    import("../../inventory/product-master").then(
      (module) => module.ProductTab
    ),
  loading: Loading,
});

const AsyncAllocateFile = Loadable({
  loader: () =>
    import("../../inventory/allocate-file").then(
      (module) => module.AllocateTab
    ),
  loading: Loading,
});

const AsyncReturnFile = Loadable({
  loader: () =>
    import("../../inventory/return-file").then(
      (module) => module.ReturnFile
    ),
  loading: Loading,
});



const AsyncReturnFileLog = Loadable({
  loader: () =>
    import("../../inventory/allocation-return-log").then(
      (module) => module.AllocationAndReturnFile
    ),
  loading: Loading,
});

const AsyncBuybackConfig = Loadable({
  loader: () =>
    import("../../inventory/buyback-config").then(
      (module) => module.BuyBackConfig
    ),
  loading: Loading,
});


export const Routes = ({
  userid,
  privilages,
  previousState,
  userChannelType,
  userEntityType,
  designationId,
  designation,
  loggedInUser,
  areaId,
  exportResponseHandler,
}) => {
  const properties = {
    userId: userid,
    entityId: userEntityType,
    privilages: privilages,
    ajaxUtil: ajaxUtil,
    setHeader: setHeaderUtil,
    saveCurrentState: saveCurrentStateUtil,
    setNotification: setNotification,
    setModalPopup: setModalPopupUtil,
    loadingFunction: setLoadingUtil,
    messagesUtil: MESSAGE_UTILS,
    designationId: designationId,
    designation: designation,
    areaId: areaId,
    globalConstants: GLOBAL_CONSTANTS,
    loggedInUser,
    exportResponseHandler,
  };

  return (
    <div style={{ height: "100%" }}>

      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          exact
          path="/home"
          render={(props) => (
            <AsyncHome {...props} {...properties} URLS={CONSTANTS.DASHBOARD} />
          )}
        />

        <Route
          exact
          path="/changePswd"
          render={() => (
            <AsyncChangePassword
              {...properties}
              urlConstants={CONSTANTS.CHANGE_PSWD}
              redirect="home"
            />
          )}
        />

        <Route
          exact
          path="/changePin"
          render={() => (
            <AsyncChangePin
              {...properties}
              urlConstants={CONSTANTS.CHANGE_PIN}
              redirect="home"
            />
          )}
        />

        <Route
          exact
          path="/Roles/create"
          render={(props) =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.create) ? (
              <AsyncRoleCreate
                {...props}
                {...properties}
                url_Roles={CONSTANTS.ROLES}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />

        <Route
          exact
          path="/Roles/edit/:id"
          render={(props) =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.edit) ? (
              <AsyncRoleEdit
                {...props}
                {...properties}
                url_Roles={CONSTANTS.ROLES}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />

        <Route
          exact
          path="/Roles"
          to="/Roles"
          render={() =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.view) ? (
              <AsyncRoleView
                {...properties}
                url_Roles={CONSTANTS.ROLES}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
                previousState={previousState && previousState.obj.roles}
                previousStateKey="roles"
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />



        <Route
          path="/product-master"
          render={(props) =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.view) ? (
              <AsyncProductMaster
                {...props}
                {...properties}
                properties={properties}
                url_Inventory={CONSTANTS.INVENTORY}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
                previousState={previousState && previousState.obj.roles}
                previousStateKey="roles"
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />

        <Route

          path="/allocate-file"
          render={() =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.view) ? (
              <AsyncAllocateFile
                {...properties}
                properties={properties}
                url_Inventory={CONSTANTS.INVENTORY}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
                previousState={previousState && previousState.obj.roles}
                previousStateKey="roles"
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />
        <Route
          path="/return-file"
          render={() =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.view) ? (
              <AsyncReturnFile
                {...properties}
                properties={properties}
                url_Inventory={CONSTANTS.INVENTORY}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
                previousState={previousState && previousState.obj.roles}
                previousStateKey="roles"
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />

        <Route
          path="/allocation-return-log"
          render={() =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.view) ? (
              <AsyncReturnFileLog
                {...properties}
                properties={properties}
                url_Inventory={CONSTANTS.INVENTORY}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
                previousState={previousState && previousState.obj.roles}
                previousStateKey="roles"
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />

        <Route
          path="/buyback-config"
          render={() =>
            properties.privilages.includes(MENU_PRIVILIAGES.ROLES.view) ? (
              <AsyncBuybackConfig
                {...properties}
                properties={properties}
                url_Inventory={CONSTANTS.INVENTORY}
                menuPrivilages={MENU_PRIVILIAGES.ROLES}
                previousState={previousState && previousState.obj.roles}
                previousStateKey="roles"
              />
            ) : (
                <Route path="/" render={() => <ErrorPage errorCode={404} />} />
              )
          }
        />
        <Route
          path="/_refresh"
          render={() => (
            <div className="p-5 text-center text-muted">Refreshing.....</div>
          )}
        />


        <Route path="*" render={() => <ErrorPage errorCode={404} />} />
      </Switch>

    </div>
  );
};
