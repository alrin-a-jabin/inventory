import { FIELD_TYPES } from '@6d-ui/fields';


export const ROLES = {
    "roleId": {
        name        : "roleId",
        placeholder : "Role Id",
        label       : "Role Id",
        width       : "sm",
        type        : FIELD_TYPES.TEXT
    },
    "roleName": {
        name        : "roleName",
        placeholder : "Role Name",
        label       : "Role Name",
        width       : "sm",
        ismandatory : true,
        maxLength   : 40,
        regex       : /^[a-zA-Z0-9'.&_/#@, -]*$/,
        type        : FIELD_TYPES.TEXT
    }
};