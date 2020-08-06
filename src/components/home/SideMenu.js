import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { saveCurrentState } from '../../actions/index';
import { store } from '../../index';
import { FULLSCRREN_PATHS } from '../../util/Constants';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { openedMenu: null };
    this.state = { navigatedMenu: null };
    this.toggle = this.toggle.bind(this);
    this.renderMenus = this.renderMenus.bind(this);
    this.checkPrivilages = this.checkPrivilages.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.clearState = this.clearState.bind(this);
    this.onMenuMouseOver = this.onMenuMouseOver.bind(this);
    this.onMenuMouseLeave = this.onMenuMouseLeave.bind(this);
    this.state = { "windowHeight": 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ "windowHeight": window.innerHeight });
  }
  componentDidUpdate(prevProps) {
    if (this.props.isNavMouseOver && prevProps.isNavMouseOver != this.props.isNavMouseOver && this.state.openedMenu) {
      this.setState({ openedMenu: null })
    }
  }


  toggle(id) {
    const openedMenu = this.state.openedMenu === id ? null : id;
    this.setState({ openedMenu });
  }

  checkPrivilages(menuPrivilages) {
    if (menuPrivilages && menuPrivilages.length > 0) {
      const diff = _.difference(menuPrivilages, this.props.privilages, _.isEqual);
      if (_.isEqual(diff.sort(), menuPrivilages.sort())) {
        //No Privilages available for this menu
        return false;
      }
    }
    return true;
  }
  onMenuMouseOver() {
    this.props.onNavMouseOver();
  }
  onMenuMouseLeave() {
    this.setState({ navigatedMenu: this.state.openedMenu });
    this.setState({ openedMenu: null });
    this.props.onNavMouseRemove();
  }
  clearState(linkTo) {
    store.dispatch(saveCurrentState(
      null
    ));
    if (FULLSCRREN_PATHS.includes(linkTo) && !this.props.isNavMouseOver)
      this.props.toggleSideNav();
  }

  renderMenus(menus, isSubmenu, isNavShown) {
    return menus && Array.isArray(menus) ? (
      menus.map(
        menu => {
          if (menu.privilages && menu.privilages.length > 0) {
            if (this.checkPrivilages(menu.privilages) === false)
              return false;
          }
          let isSelectParent = false;
          if (menu.submenus && menu.submenus.length > 0) {
            let subMenuPrivilages = [];
            menu.submenus.forEach(
              submenu => {
                if (submenu.privilages) {
                  subMenuPrivilages.push(...submenu.privilages);
                }
                if (`${submenu.linkTo}` === window.location.pathname) {
                  isSelectParent = true;
                }
              }
            );
            if (this.checkPrivilages(subMenuPrivilages) === false)
              return false;
          }
          // console.log("==log==",isSelectParent);
          return (

            <ListGroupItem key={menu.id} className={(isNavShown ? "" : "listgroupshown")} >
              {

                menu.submenus && Array.isArray(menu.submenus) ?
                  [

                    <a className={(isNavShown ? "" : "menutext " + (this.state.navigatedMenu === menu.id ? "opened" : "")) + (isSelectParent ? "selected" : (this.state.openedMenu === menu.id ? "opened" : ""))}
                     onClick={() => this.toggle(menu.id)} key={`anchor-${menu.id}`}>
                      <span>
                        <i className={`fa ${menu.icon} menu-icon ` + (isNavShown ? "" : "iconshown")} />
                        {menu.label}
                      </span>
                      <i className="fa fa-angle-right submenu-icon"
                        {...(this.state.openedMenu === menu.id ? { style: { transform: 'rotate(90deg)' } } : {})}
                      ></i>
                    </a>,
                    <Collapse isOpen={this.state.openedMenu === menu.id} key={`submenu-${menu.id}`}>
                      <ListGroup className="side-submenu-item">
                        {this.renderMenus(menu.submenus, true, isNavShown)}
                      </ListGroup>
                    </Collapse>
                  ] :
                  <NavLink to={menu.linkTo} onClick={() => this.clearState(menu.linkTo)}
                    isActive={(match, location) => { return location.pathname.substring(0, menu.linkTo.length) === menu.linkTo }}
                    activeClassName="opened" className={(isNavShown ? "" : "menutext " + (this.state.navigatedMenu === menu.id ? "opened" : ""))}>
                    {(!isSubmenu ? <i className={`fa ${menu.icon} menu-icon ` + (isNavShown ? "" : "iconshown")} /> : "")}
                    {menu.label}
                  </NavLink>
              }
            </ListGroupItem>
          )
        }
      )
    ) : (false)
  }

  render() {
    const sideNavSubStyle = {
      height: this.state.windowHeight - 118
    };
    return (
      <div>
        <div className={"logo-div primary-color text-center " + (this.props.isNavShown ? '' : 'toogleIconDiv')}>
          <span className={"head-toggle-menu " + (this.props.isNavShown ? '' : 'toogleIconSpan')} onClick={this.props.toggleSideNav}><i className={"fa fa-bars " + (this.props.isNavShown ? '' : 'toogleIconMenu')}></i></span>
          <img src={this.props.logo} alt="6d Technlogies" className={"head-logo-img " + (this.props.isNavShown ? '' : 'minSideBar')} />
        </div>
        <div style={sideNavSubStyle} className={"side-nav-menu-in scrollbar " + (this.props.isNavShown ? '' : 'side-nav-shown')}
          onMouseOver={this.props.isNavMouseOver ? this.onMenuMouseOver : ''} onMouseLeave={this.props.isNavMouseOver ? this.onMenuMouseLeave : ''} >
          <ListGroup className="side-menu-item">
            {this.renderMenus(this.props.menus, false, this.props.isNavShown)}
          </ListGroup>
        </div>
        <div style={{ height: '10px' }}>
        </div>
        {this.props.isFooterDiv ?
          <div className={"menu_footer text-center " + (this.props.isNavShown ? '' : 'minSideBar')}>
            {this.props.footerText}
          </div> : <div className="menu_footer text-center" style={{ display: 'none' }}>
          </div>
        }
      </div>
    );
  }
}

export default SideMenu;
