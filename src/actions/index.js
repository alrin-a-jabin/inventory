
// import {
//     AUTH_URL,
//     LOGIN_URL,
//     LOGOUT_URL,
//     AUTH_KEY
//   } from '../util/Constants';
//   import {
//     LOGIN,
//     LOGOUT,
//     VALIDATE,
//     SET_LOADING,
//     SET_TOAST_NOTIF,
//     SET_MODAL_POPUP,
//     SET_HEADER,
//     SAVE_STATE,
//     SET_BREAD_CRUMB,
//     ADD_TO_NOTIFICATION,
//     REMOVE_FROM_NOTIFICATION,
//     CLEAR_ALL_NOTIFICATION
//   } from '../util/ActionConstants'
//   import { setCredentials, encryptData, ajaxRequest } from '../components/ajax/index';
//   import { encrypt } from '../util/Util';
  
//   export function addToNotification(data) {
//       return {
//           type: ADD_TO_NOTIFICATION,
//           payload: data
//       };
//   };
  
//   export function removeFromNotification(id) {
//       return {
//           type: REMOVE_FROM_NOTIFICATION,
//           payload: id
//       };
//   };
  
//   export function clearAllNotification() {
//       return {
//           type: CLEAR_ALL_NOTIFICATION,
//           payload: []
//       };
//   };
//   export function logIn(payload) {
//     const data = {
//         "userId": payload.username,
//       //   "password": encryptData('md5', payload.password)
//         //"password": encrypt(payload.password)
//         "password":payload.password
        
//     };
//     const request = ajaxRequest(LOGIN_URL, data, { authKey : AUTH_KEY });
//     return {
//         type: LOGIN,
//         payload: request
//     };
//   }
  
//   export function validateLogin(showResonse = true) {
//     const request = '';
//     //const request = ajaxRequest(AUTH_URL, null, { authKey : AUTH_KEY });
//     return {
//         type: VALIDATE,
//         payload: request
//     };
//   }
  
//   export function logOut(msg) {
//       const request = ajaxRequest(LOGOUT_URL, null, { authKey : AUTH_KEY });
//       setCredentials('','');
//       return {
//           type: LOGOUT,
//           isLoggedIn:true,
//           payload: {msg}
//       };
//   }
  
//   export function setLogOut() {
//       return {
//           type: LOGOUT,
//           payload: {}
//       };
//   }
  
//   export function setLoading(isLoading, isFirstLoad, timestamp) {
//       return {
//           type: SET_LOADING,
//           payload: {isLoading, isFirstLoad, timestamp}
//       };
//   }
  
//   export function setToastNotif(options) {
//       if (options)
//         options.timestamp = new Date().getTime();
  
//       return {
//           type: SET_TOAST_NOTIF,
//           payload: options
//       };
//   }
  
//   export function setModalPopup(options) {
//       return {
//           type: SET_MODAL_POPUP,
//           payload: options
//       };
//   }
  
//   export function saveCurrentState(prevState) {
//       return {
//           type: SAVE_STATE,
//           payload:prevState
//       };
//   }
  
//   export function setHeader(options) {
//       return {
//           type: SET_HEADER,
//           payload: options
//       };
//   }
  
//   export function setBreadCrumb(options) {
//     return {
//         type: SET_BREAD_CRUMB,
//         payload: options
//     };
//   }























import {
  AUTH_URL,
  LOGIN_URL,
  LOGOUT_URL,
  AUTH_KEY
} from '../util/Constants';
import {
  LOGIN,
  LOGOUT,
  VALIDATE,
  SET_LOADING,
  SET_TOAST_NOTIF,
  SET_MODAL_POPUP,
  SET_HEADER,
  SAVE_STATE,
  SET_BREAD_CRUMB,
  ADD_TO_NOTIFICATION,
  REMOVE_FROM_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION
} from '../util/ActionConstants'
import { setCredentials, encryptData, ajaxRequest } from '../components/ajax/index';
import { encrypt } from '../util/Util';

export function addToNotification(data) {
    return {
        type: ADD_TO_NOTIFICATION,
        payload: data
    };
};

export function removeFromNotification(id) {
    return {
        type: REMOVE_FROM_NOTIFICATION,
        payload: id
    };
};

export function clearAllNotification() {
    return {
        type: CLEAR_ALL_NOTIFICATION,
        payload: []
    };
};
export function logIn(payload) {
  const data = {
      "userId": payload.username,
    //   "password": encryptData('md5', payload.password)
      //"password": encrypt(payload.password)
      "password":payload.password
      
  };
  const request = ajaxRequest(LOGIN_URL, data, { authKey : AUTH_KEY });
  return {
      type: LOGIN,
      payload: request
  };
}

export function validateLogin(showResonse = true) {
  const request = ajaxRequest(AUTH_URL, null, { authKey : AUTH_KEY });
  return {
      type: VALIDATE,
      payload: request
  };
}

export function logOut(msg) {
    const request = ajaxRequest(LOGOUT_URL, null, { authKey : AUTH_KEY });
    setCredentials('','');
    return {
        type: LOGOUT,
        isLoggedIn:true,
        payload: {msg}
    };
}

export function setLogOut() {
    return {
        type: LOGOUT,
        payload: {}
    };
}

export function setLoading(isLoading, isFirstLoad, timestamp) {
    return {
        type: SET_LOADING,
        payload: {isLoading, isFirstLoad, timestamp}
    };
}

export function setToastNotif(options) {
    if (options)
      options.timestamp = new Date().getTime();

    return {
        type: SET_TOAST_NOTIF,
        payload: options
    };
}

export function setModalPopup(options) {
    return {
        type: SET_MODAL_POPUP,
        payload: options
    };
}

export function saveCurrentState(prevState) {
    return {
        type: SAVE_STATE,
        payload:prevState
    };
}

export function setHeader(options) {
    return {
        type: SET_HEADER,
        payload: options
    };
}

export function setBreadCrumb(options) {
  return {
      type: SET_BREAD_CRUMB,
      payload: options
  };
}
