const {REACT_APP_BASE_URL,REACT_APP_DEALER_ID,REACT_APP_DISTRIBUTOR_ID,REACT_APP_GOOGLE_API_KEY} = process.env;

export const {BASE_URL,DEALER_ID,DISTRIBUTOR_ID,GOOGLE_API_KEY} = { 
    BASE_URL:REACT_APP_BASE_URL,
    DEALER_ID:REACT_APP_DEALER_ID,
    DISTRIBUTOR_ID:REACT_APP_DISTRIBUTOR_ID,
    GOOGLE_API_KEY:REACT_APP_GOOGLE_API_KEY
};

export const LOGIN = "login"; 
export const LOGOUT = "logout";
export const CHANGE_PSWD = "changePswd";
export const SET_LOADING = "set_loading";
export const SET_TOAST_NOTIF = "set_toast_notif";
export const SET_MODAL_POPUP = "set_modal_popup";
export const SET_HEADER = "set_header";
export const SET_BREAD_CRUMB = "set_breadcrumb";
export const EloadBaseUrl = 'http://10.0.0.36:9089/SmartFrenEload/';

export const GLOBAL_CONSTANTS = {
    INITIAL_ROW_COUNT: 5,
    DATE_FORMAT: "YYYY-MM-DD",
    DMS_DATE_FORMAT:"DD/MM/YYYY",
    GET_ROLES_URL: `hierarchy/role`,
    FORM_MODAL: {
        SearchFilter: 1,
        Create: 2,
        Edit: 3,
        View: 4,
        Delete: 5
    },
    BL_RESULT_CODES: {
        SUCCESS: "0"
    },
    ENTITY_IDS: {
        CHANNEL_PARTNER: 3,
        OPERATOR: 1
    },
    LEVEL_ID: {
        OPERATOR: 1
    },
    USER_STATUS: {
        ACTIVE: {
            id:1,
            name:'Active'
        },
        SUSPEND: {
            id:2,
            name:'Suspended'
        }
    }
}


export const AUTH_KEY = 'Bearer';
export const CHANNEL = 'WEB';

export const LOGIN_URL = `auth/login`;
export const FIRST_LOGIN_URL = `auth/isFirstLogin`;
//export const LOGIN_URL = "/v1/api/auth/signin";
export const LOGOUT_URL = "/v1/api/auth/logout";
export const AUTH_URL = `${BASE_URL}v1/api/auth/authorize`;
export const CHANGE_PSWD_URL = "/ChangePassword/v1/changePwd";
export const SET_PSWD_URL = "auth/setPassword";
export const FORGET_PSWD_URL = "auth/resetPassword";
export const FORGET_PSWD_GET_OTP='auth/otp/generate';
export const FORGET_PSWD_VALIDATE_OTP='auth/otp/validate';
export const PRODUCT_BASE_URL='http://smartfrennusantara.6dtech.co.in:38080/'
export const ENCYPT_KEY = "sdsd34545sdfasd232sds334";

export const COUNTRY_CODE = '+968';

export const FULLSCRREN_PATHS=[
    "/distributor",
  ];

export const CONSTANTS = {
    CHANGE_PSWD: {
        // CHANGE_PSWD_URL: "/ChangePassword/v1/changePwd"
        CHANGE_PSWD_URL:"/v1/password/change"
    },
    CHANGE_PIN: {
        CHANGE_PIN_URL: "/v1/pin/change"
    },
    ROLES: {
        CREATE_URL: `hierarchy/role`,
        UPDATE_URL: `hierarchy/role`,
        DELETE_URL: `hierarchy/role/delete/`,
        SEARCH_URL: `hierarchy/role`,
        GET_FEATURES: `hierarchy/module`
    },
    INVENTORY: {
        PRODUCT_MASTER: `${PRODUCT_BASE_URL}dst/product/list?isPageable=true`,
        PRODUCT_MASTER_SEARCH_URL: `${PRODUCT_BASE_URL}dst/product/filter?isPageable=true`,
        ALLOCATION_FILE_LIST_URL:`${PRODUCT_BASE_URL}dst/packingListDetails/list?isPageable=true`,
        ALLOCATION_FILE_SEARCH_URL:`${PRODUCT_BASE_URL}dst/packingListDetails/search?isPageable=true`,
        RETURN_FILE_LIST_URL:`${PRODUCT_BASE_URL}dst/returnFile/list?isPageable=true`,
        RETURN_FILE_SEARCH_URL:`${PRODUCT_BASE_URL}dst/returnFile/search?isPageable=true`,
        ALLOCATION_RETURN_LOG_URL:`${PRODUCT_BASE_URL}dst/allocationReturnLog/list?isPageable=true`,
        ALLOCATION_RETURN_LOG_SEARCH_URL:`${PRODUCT_BASE_URL}dst/allocationReturnLog/search?isPageable=true`,
        ALLOCATION_RETURN_LOG_RETRY_URL:`${PRODUCT_BASE_URL}dst/allocationReturnLog/retryProcess`,
        BUYBACK_CONFIG_LIST_URL:`${PRODUCT_BASE_URL}byk/buyBack/configuration/list?isPageable=true`,
        BUYBACK_CONFIG_SEARCH_URL:`${PRODUCT_BASE_URL}byk/buyBack/configuration/filter?isPageable=true`,
        BUYBACK_VIEW_DETAIL_ID:`${PRODUCT_BASE_URL}byk/buyBack/configuration/edit`,
        BUYBACK_TYPE: `${PRODUCT_BASE_URL}byk/buybackType/list`,
        BUYBACK_CHANNEL: `${BASE_URL}hierarchy/channel`,
        BUYBACK_REGION:`${BASE_URL}hierarchy/salesLocation/getRegionsOrClusters`,
        BUYBACK_CLUSTER:`${BASE_URL}hierarchy/salesLocation/getLocationsFromParent`,
        BUYBACK_DISTRIBUTION: `${BASE_URL}channelPartner/entity`,
        BUYBACK_OUTLET: `${BASE_URL}channelPartner/cpartner`,
        BUYBACK_FGCODE: `${PRODUCT_BASE_URL}dst/product/list`,
        BUYBACK_SAVE: `${PRODUCT_BASE_URL}byk/buyBack/configuration/save`,
        
    },
    DASHBOARD:{
    },  
}
