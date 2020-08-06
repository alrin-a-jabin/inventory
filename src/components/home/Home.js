import React, { Component } from "react";
import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
import { Header, Notification, Alert, Loader } from '@6d-ui/ui-components';
import { withRouter } from 'react-router'
import { MENU_DETAILS, PRIVILIAGES } from "../../util/Privilages";
import { connect } from "react-redux";
import { Routes } from './sub/Routes'
import { setModalPopup, logOut, addToNotification, removeFromNotification,clearAllNotification } from '../../actions';
import { store } from '../../index';
import SideMenu from './SideMenu';
import ResponsiveContainer from "../util/ResponsiveContainer";
import {FULLSCRREN_PATHS} from '../../util/Constants';
import _ from 'lodash';

const user_name = 'Development mode';
const ldap_User = true;
const privilages = [1200,1201,1202,1203];
const userId = 2000;
const userDetails = [];
const designationId = 1;
const channelType = 1;
const entityId = 1;
const areaId = 1;
class Home extends Component {
    constructor(props) {
        super(props);
        if(this.props.login.userDetails != null){
            user_name=this.props.login.userDetails.name;
            ldap_User=this.props.login.userDetails.ldapUser;
            privilages=this.props.login.userDetails.privilages;
            userId=this.props.login.userDetails.userId;
            userDetails=this.props.login.userDetails;
            designationId=this.props.login.userDetails.designationId;
            channelType=this.props.login.userDetails.channelType;
            entityId=this.props.login.userDetails.entityId;
            areaId=this.props.login.userDetails.areaId;
        }
        this.state = {
            isSideNavShown:FULLSCRREN_PATHS.includes(this.props.location.pathname)?false:true,
            isNavMouseOver:FULLSCRREN_PATHS.includes(this.props.location.pathname)?true:false,
            isLoggedIn: false,
            isFooterDiv:true,
            footerText:"Powered by Smartfren",
            MENU_DETAILS,
            HEADER_BUTTONS: [
                {
                    id: 1,
                    type: 1,
                    icon: 'fa-bell',
                    animatedIcon: 'fa-bell faa-ring animated faa-slow'
                },
                {
                    id: 2,
                    type: 2,
                    icon: 'fa-user-circle-o',
                    subIcon: 'fa-user-o',
                    subHeader: user_name,
                    subItems: ldap_User?[
                        {
                            id: 23,
                            name: 'Sign Out',
                            icon: 'fa-sign-out'
                        },
                    ]:[
                        {
                            id: 22,
                            name: 'Change Password',
                            icon: 'fa-key'
                        // },
                       
                        // {
                        //     id: 24,
                        //     name: 'Change Pin',
                        //     icon: 'fa-key'
                        },
                        {
                            id: 23,
                            name: 'Sign Out',
                            icon: 'fa-sign-out'
                        },
                    ]

                }
            ],
        };
        this.toggleSideNav = this.toggleSideNav.bind(this);
        this.route = this.route.bind(this);
        this.onNavMouseOver=this.onNavMouseOver.bind(this);
        this.onNavMouseRemove=this.onNavMouseRemove.bind(this);
    }

    componentWillMount(){
    }
    componentDidMount(){
        let that = this;
        const {login}=this.props;
        window.scrollTo(0, 0);
    }


    toggleSideNav() {
        this.setState({ isSideNavShown: this.state.isNavMouseOver,isNavMouseOver:!this.state.isNavMouseOver });
    }
    route(id, link) {
        if (this.props.location.pathname !== link)
            this.props.history.push(link);
        else{
            this.props.history.replace(`/_refresh`); // this is to rerender the route
            setTimeout(() => {
                this.props.history.replace(link);
            });
        }         
    }

    removeFromExportArray = id => {
        this.props.removeFromNotification(id);
    }

    onHeaderItemClick(menuId, SubMenuId) {
        if (menuId === 2 && SubMenuId === 22) {
            this.route(menuId, '/changePswd');
        }
        if (menuId === 2 && SubMenuId === 23) {
            store.dispatch(clearAllNotification());
            store.dispatch(logOut());
        }
        if(menuId ===2 && SubMenuId ===24){
            this.route(menuId, '/changePin');
        }
    }
    exportResponseHandler = (exportResponse, item, fileName) => {
        if(exportResponse) {
            const { headers } = exportResponse;
            const contentType = headers['content-type'];
            let fileType = 'xls';
            if(item && item.type) {
                fileType = item.type;
            }else {
                if(item.label) {
                    switch(item.label.toLowerCase()) {
                        case 'excel':
                            fileType = 'xls'; break;
                        case 'csv':
                            fileType = 'csv'; break;
                        default: break;
                    }
                }
            }
            if(fileName)
                fileName = fileName.endsWith("-") ? (fileName + Date.now()) : (fileName + "-" + Date.now());
            else 
                fileName = Date.now();

            fileName = fileName + "." + fileType;

            this.props.addToNotification({
                id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
                message: fileName,
                url: window.URL.createObjectURL(exportResponse.data),
                downloadable: true
            });
        }
    }
    onNavMouseOver(){
        this.setState({isSideNavShown:true})
    } 
    onNavMouseRemove(){
        this.setState({isSideNavShown:false})
    } 
    render() {
        const getBreadCrumb = () => {
            if (this.props.breadcrumb && this.props.breadCrumb.length > 0) {
                return (
                    <Container className="main_breadCrumb_container">
                        <Row>
                            <Col>
                                <Breadcrumb
                                    className="main_breadCrumb">
                                    <BreadcrumbItem>
                                        <i className="fa fa-home" />
                                    </BreadcrumbItem>
                                    <BreadcrumbItem active>Dash Board</BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </Container>
                );
            }
        };
        const sideNavStyle = {
            width: this.state.isSideNavShown ? '202px' : '60px'
        };
        return (
            <div>
                <div className="home-main-div">
                    <div className="side-nav-menu" style={sideNavStyle}>
                        <SideMenu
                            currentPath={this.props.location.pathname}
                            privilages={privilages}
                            route={this.route}
                            menus={this.state.MENU_DETAILS}
                            logo={`${process.env.PUBLIC_URL}/images/logo/6d-logo.png`}
                            toggleSideNav={this.toggleSideNav}
                            isFooterDiv={this.state.isFooterDiv}
                            footerText={this.state.footerText}
                            isNavShown={this.state.isSideNavShown}
                            isNavMouseOver={this.state.isNavMouseOver}
                            onNavMouseOver={this.onNavMouseOver}
                            onNavMouseRemove={this.onNavMouseRemove}
                            redirectPath="/home"
                        />
                    </div>
                    <div className="main-content-div">
                        <HeaderContainer
                            onHeaderItemClick={this.onHeaderItemClick.bind(this)}
                            items={this.state.HEADER_BUTTONS}
                             header={this.props.header}
                            toggleSideNav={this.toggleSideNav}
                            hideMenuToggle={true}
                            removeFromExport={this.removeFromExportArray.bind(this)}
                        />
                        <main style={{ minHeight: window.innerHeight - 70 }}>
                            <ResponsiveContainer style={{ overflowX: 'scroll', overflow: 'auto', position: 'relative', backgroundColor:'#ffffff' }} offset={70}>
                                {getBreadCrumb()}
                                <div className="main-container" style={{minHeight: '100%'}}>
                                    {/*Routes Comes HERE*/}
                                    <Routes
                                        userid={userId}
                                        loggedInUser={this.props.login.userDetails}
                                        privilages={privilages}
                                        designationId={designationId}
                                        userChannelType={channelType}
                                        userEntityType={entityId}
                                        areaId={areaId}
                                        exportResponseHandler={this.exportResponseHandler}
                                    />

                                </div>
                                <Notification
                                    toast={this.props.toast}
                                />
                                <AlertContainer
                                    setModalPopup={this.props.setModalPopup}
                                    modal={this.props.modal}
                                />
                                <Loader
                                        {...this.props.loader}
                                    />
                            </ResponsiveContainer>
                            
                        </main>
                    </div>
                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        login: state.login,
        breadcrumb: state.breadcrumb,
        toast: state.toast,
        loader: state.loader
    };
}

const AlertContainer = connect(({modal}) => ({modal}))(props => <Alert {...props}/>);
const HeaderContainer = connect(({header}) => ({header}))(props => <Header {...props}/>);

export default withRouter(connect(mapStateToProps, { setModalPopup, addToNotification, removeFromNotification })(Home));
























// import React, { Component } from "react";
// import { Container, Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
// import { Header, Notification, Alert, Loader } from '@6d-ui/ui-components';
// import { withRouter } from 'react-router'
// import { MENU_DETAILS, PRIVILIAGES } from "../../util/Privilages";
// import { connect } from "react-redux";
// import { Routes } from './sub/Routes'
// import { setModalPopup, logOut, addToNotification, removeFromNotification,clearAllNotification } from '../../actions';
// import { store } from '../../index';
// import SideMenu from './SideMenu';
// import ResponsiveContainer from "../util/ResponsiveContainer";
// import {FULLSCRREN_PATHS} from '../../util/Constants';
// import _ from 'lodash';

// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isSideNavShown:FULLSCRREN_PATHS.includes(this.props.location.pathname)?false:true,
//             isNavMouseOver:FULLSCRREN_PATHS.includes(this.props.location.pathname)?true:false,
//             isLoggedIn: false,
//             isFooterDiv:true,
//             footerText:"Powered by Smartfren",
//             MENU_DETAILS,
//             HEADER_BUTTONS: [
//                 {
//                     id: 1,
//                     type: 1,
//                     icon: 'fa-bell',
//                     animatedIcon: 'fa-bell faa-ring animated faa-slow'
//                 },
//                 {
//                     id: 2,
//                     type: 2,
//                     icon: 'fa-user-circle-o',
//                     subIcon: 'fa-user-o',
//                     subHeader: this.props.login.userDetails.name,
//                     subItems: this.props.login.userDetails.ldapUser?[
//                         {
//                             id: 23,
//                             name: 'Sign Out',
//                             icon: 'fa-sign-out'
//                         },
//                     ]:[
//                         {
//                             id: 22,
//                             name: 'Change Password',
//                             icon: 'fa-key'
//                         // },
                       
//                         // {
//                         //     id: 24,
//                         //     name: 'Change Pin',
//                         //     icon: 'fa-key'
//                         },
//                         {
//                             id: 23,
//                             name: 'Sign Out',
//                             icon: 'fa-sign-out'
//                         },
//                     ]

//                 }
//             ],
//         };
//         this.toggleSideNav = this.toggleSideNav.bind(this);
//         this.route = this.route.bind(this);
//         this.onNavMouseOver=this.onNavMouseOver.bind(this);
//         this.onNavMouseRemove=this.onNavMouseRemove.bind(this);
//     }

//     componentWillMount(){
//     }
//     componentDidMount(){
//         let that = this;
//         const {login}=this.props;
//         window.scrollTo(0, 0);
//     }


//     toggleSideNav() {
//         this.setState({ isSideNavShown: this.state.isNavMouseOver,isNavMouseOver:!this.state.isNavMouseOver });
//     }
//     route(id, link) {
//         if (this.props.location.pathname !== link)
//             this.props.history.push(link);
//         else{
//             this.props.history.replace(`/_refresh`); // this is to rerender the route
//             setTimeout(() => {
//                 this.props.history.replace(link);
//             });
//         }         
//     }

//     removeFromExportArray = id => {
//         this.props.removeFromNotification(id);
//     }

//     onHeaderItemClick(menuId, SubMenuId) {
//         if (menuId === 2 && SubMenuId === 22) {
//             this.route(menuId, '/changePswd');
//         }
//         if (menuId === 2 && SubMenuId === 23) {
//             store.dispatch(clearAllNotification());
//             store.dispatch(logOut());
//         }
//         if(menuId ===2 && SubMenuId ===24){
//             this.route(menuId, '/changePin');
//         }
//     }
//     exportResponseHandler = (exportResponse, item, fileName) => {
//         if(exportResponse) {
//             const { headers } = exportResponse;
//             const contentType = headers['content-type'];
//             let fileType = 'xls';
//             if(item && item.type) {
//                 fileType = item.type;
//             }else {
//                 if(item.label) {
//                     switch(item.label.toLowerCase()) {
//                         case 'excel':
//                             fileType = 'xls'; break;
//                         case 'csv':
//                             fileType = 'csv'; break;
//                         default: break;
//                     }
//                 }
//             }
//             if(fileName)
//                 fileName = fileName.endsWith("-") ? (fileName + Date.now()) : (fileName + "-" + Date.now());
//             else 
//                 fileName = Date.now();

//             fileName = fileName + "." + fileType;

//             this.props.addToNotification({
//                 id: (+ new Date() + Math.floor(Math.random() * 999999)).toString(36),
//                 message: fileName,
//                 url: window.URL.createObjectURL(exportResponse.data),
//                 downloadable: true
//             });
//         }
//     }
//     onNavMouseOver(){
//         this.setState({isSideNavShown:true})
//     } 
//     onNavMouseRemove(){
//         this.setState({isSideNavShown:false})
//     } 
//     render() {
//         const getBreadCrumb = () => {
//             if (this.props.breadcrumb && this.props.breadCrumb.length > 0) {
//                 return (
//                     <Container className="main_breadCrumb_container">
//                         <Row>
//                             <Col>
//                                 <Breadcrumb
//                                     className="main_breadCrumb">
//                                     <BreadcrumbItem>
//                                         <i className="fa fa-home" />
//                                     </BreadcrumbItem>
//                                     <BreadcrumbItem active>Dash Board</BreadcrumbItem>
//                                 </Breadcrumb>
//                             </Col>
//                         </Row>
//                     </Container>
//                 );
//             }
//         };
//         const sideNavStyle = {
//             width: this.state.isSideNavShown ? '202px' : '60px'
//         };
//         return (
//             <div>
//                 <div className="home-main-div">
//                     <div className="side-nav-menu" style={sideNavStyle}>
//                         <SideMenu
//                             currentPath={this.props.location.pathname}
//                             privilages={this.props.login.userDetails.privilages}
//                             route={this.route}
//                             menus={this.state.MENU_DETAILS}
//                             logo={`${process.env.PUBLIC_URL}/images/logo/6d-logo.png`}
//                             toggleSideNav={this.toggleSideNav}
//                             isFooterDiv={this.state.isFooterDiv}
//                             footerText={this.state.footerText}
//                             isNavShown={this.state.isSideNavShown}
//                             isNavMouseOver={this.state.isNavMouseOver}
//                             onNavMouseOver={this.onNavMouseOver}
//                             onNavMouseRemove={this.onNavMouseRemove}
//                             redirectPath="/home"
//                         />
//                     </div>
//                     <div className="main-content-div">
//                         <HeaderContainer
//                             onHeaderItemClick={this.onHeaderItemClick.bind(this)}
//                             items={this.state.HEADER_BUTTONS}
//                              header={this.props.header}
//                             toggleSideNav={this.toggleSideNav}
//                             hideMenuToggle={true}
//                             removeFromExport={this.removeFromExportArray.bind(this)}
//                         />
//                         <main style={{ minHeight: window.innerHeight - 70 }}>
//                             <ResponsiveContainer style={{ overflowX: 'scroll', overflow: 'auto', position: 'relative', backgroundColor:'#ffffff' }} offset={70}>
//                                 {getBreadCrumb()}
//                                 <div className="main-container" style={{minHeight: '100%'}}>
//                                     {/*Routes Comes HERE*/}
//                                     <Routes
//                                         userid={this.props.login.userDetails.userId}
//                                         loggedInUser={this.props.login.userDetails}
//                                         privilages={this.props.login.userDetails.privilages}
//                                         designationId={this.props.login.userDetails.designationId}
//                                         userChannelType={this.props.login.userDetails.channelType}
//                                         userEntityType={this.props.login.userDetails.entityId}
//                                         areaId={this.props.login.userDetails.areaId}
//                                         exportResponseHandler={this.exportResponseHandler}
//                                     />

//                                 </div>
//                                 <Notification
//                                     toast={this.props.toast}
//                                 />
//                                 <AlertContainer
//                                     setModalPopup={this.props.setModalPopup}
//                                     modal={this.props.modal}
//                                 />
//                                 <Loader
//                                         {...this.props.loader}
//                                     />
//                             </ResponsiveContainer>
                            
//                         </main>
//                     </div>
//                 </div>

//             </div>
//         );
//     }
// }
// function mapStateToProps(state) {
//     return {
//         login: state.login,
//         breadcrumb: state.breadcrumb,
//         toast: state.toast,
//         loader: state.loader
//     };
// }

// const AlertContainer = connect(({modal}) => ({modal}))(props => <Alert {...props}/>);
// const HeaderContainer = connect(({header}) => ({header}))(props => <Header {...props}/>);

// export default withRouter(connect(mapStateToProps, { setModalPopup, addToNotification, removeFromNotification })(Home));
