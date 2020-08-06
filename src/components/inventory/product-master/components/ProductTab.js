import React from "react";
import ViewProductMaster from './View'
import { NavLink, Switch, useRouteMatch, Route, Redirect } from "react-router-dom";
function ProductMasterTab(props) {
  const { url_Inventory, ajaxUtil, setNotification, loadingFunction, setHeader } = props;
  let { path, url } = useRouteMatch();
  return (
    <div className="container-fluid pd-3">
      <div className="card__bg">
        <div className="product__master__wrap">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink to={`${url}/finished-goods`} activeClassName="active" className="nav-link">Finished Goods</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to={`${url}/raw-material`} activeClassName="active" className="nav-link">Raw Materials</NavLink>
            </li> */}
          </ul>
          <div className="scroll_-_wraper">
            <div className="tab-content" id="">
              <Switch>
                <Route exact path={path}>
                  <Redirect to={`${path}/finished-goods`} />
                </Route>
                <Route exact path={`${path}/finished-goods`}>
                  <ViewProductMaster
                    url_Inventory={url_Inventory}
                    loadingFunction={loadingFunction}
                    setNotification={setNotification}
                    setHeader={setHeader}
                    ajaxUtil={ajaxUtil}
                  />
                </Route>
                {/* <Route exact path={`${path}/raw-material`}>
                  <div>
                    Raw Materials
                  </div>
                </Route> */}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMasterTab;
