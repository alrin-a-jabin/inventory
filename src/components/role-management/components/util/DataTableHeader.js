export const ROLES = {
    LABEL_LIST: [
    {
        id: "roleId",
        paramId: "roleId",
        name: "Id",
        isSortable: true
    },
    {
        id: "roleName",
        paramId: "roleName",
        name: "Role Name",
        isSortable: false
    },
    {
        id: "createdDate",
        paramId: "createdDate",
        name: "Created Date",
        isSortable: true
    },
    {
        id: "createdBy",
        paramId: "createdBy",
        name: "Created By",
        isSortable: true
    },

    ],
    SEARCH_FIELDS: {
        roleId: "Id",
        roleName: "roleName",
        roleDesc: "Description"
    },
    // SEARCH_FILTERS: ['roleId', 'roleName', 'roleDesc']
    SEARCH_FILTERS: ['roleId','roleName']
  
  };