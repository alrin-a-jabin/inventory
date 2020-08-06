import _ from "lodash";

export const PRIVILIAGES = {
  USER_MGMNT: {
    view: 1100,
    create: 1101,
    edit: 1102,
    delete: 1103,
    changeStatus:1108,
    suspendActivate:1108,
  },
  ROLES: {
    view: 1200,
    create: 1201,
    edit: 1202,
    delete:1203
  },
}

export const MENU_DETAILS = [
  {
    id: 0,
    label: "Dashboard",
    linkTo: "/home",
    icon: "fa fa-area-chart",
    privilages: []
  },
  {
    id: 1,
    label: "User Management",
    icon: "fa fa-user",
    submenus: [
      {
        id: 2,
        label: "Roles",
        linkTo: "/Roles",
        icon: "fa fa-users",
        privilages: []//_.values(PRIVILIAGES.ROLES)
      } 
    ]
  },
  {
    id: 3,
    label: "Inventory",
    icon: "fa fa-shopping-cart",
    submenus: [
      {
        id: 4,
        label: "Product Master",
        linkTo: "/product-master",
        icon: "fa fa-users",
        privilages: []//_.values(PRIVILIAGES.ROLES)
      } ,
      {
        id: 5,
        label: "Allocation File",
        linkTo: "/allocate-file",
        icon: "fa fa-users",
        privilages: []//_.values(PRIVILIAGES.ROLES)
      } ,
      {
        id: 6,
        label: "Return File",
        linkTo: "/return-file",
        icon: "fa fa-users",
        privilages: []//_.values(PRIVILIAGES.ROLES)
      } ,
      {
        id: 7,
        label: "Allocation & Return file log",
        linkTo: "/allocation-return-log",
        icon: "fa fa-users",
        privilages:[]// _.values(PRIVILIAGES.ROLES)
      } ,
      {
        id: 8,
        label: "Buyback Configuration",
        linkTo: "/buyback-config",
        icon: "fa fa-users",
        privilages: []//_.values(PRIVILIAGES.ROLES)
      } 
    ]
  },
  
];