import axios from 'axios';
import { getToken, setToken, encrypt, getuuid } from '../util/Utils';

export function ajax(url, request, makeCallBack, callback, loadingFunction, options) {
  var loadingId = 0;
  const { method = 'POST', isShowGenericMessage = true,
    isShowSuccess = true, isShowFailure = true, firstLoad,
    isProceedOnError = true, isGetFile, authKey, channel, returnFullResponse = false, responseType ,isLogout=true,isEncrpt,encrptKey } = options || {};
  const headers = getToken(authKey, channel,isEncrpt,encrptKey);
  if (isGetFile)
    headers['content-type'] = 'multipart/form-data';

  const authOptions = {
    method,
    url: url,
    data: request,
    headers,
    json: true
  };

  if (method && method.trim().toUpperCase() == 'GET') {
    authOptions.params = request;
  }

  if (responseType) authOptions.responseType = responseType;

  if (loadingFunction)
    loadingId = loadingFunction({ isLoading: true, firstLoad });

  axios(authOptions).then((response) => {
    if (makeCallBack)
      makeCallBack(response, callback, isShowGenericMessage, isShowSuccess, isShowFailure, isProceedOnError, returnFullResponse,isLogout);
    else if (callback)
      callback(response);

    if (loadingFunction)
      loadingFunction({ isLoading: false, firstLoad, timestamp: loadingId });

  }).catch((err) => {
    if (makeCallBack)
      makeCallBack(err.response, callback, isShowGenericMessage, isShowSuccess, isShowFailure, isProceedOnError, returnFullResponse,isLogout);
    else if (callback)
      callback(err.response);

    if (loadingFunction)
      loadingFunction({ isLoading: false, firstLoad, timestamp: loadingId });
  })
}
export function ajaxRequest(url, requestData, options) {
  const { method = 'POST', authKey, channel,isEncrpt,encrptKey} = options || {};
  const headers = getToken(authKey, channel,isEncrpt,encrptKey);
  const authOptions = {
    method,
    url: url,
    data: requestData,
    headers,
    json: true
  };
  const request = axios(authOptions);
  return request;
}
export function setCredentials(token, userId, msisdn,entity) {
  setToken(token, userId, msisdn,entity);
}
export function getHeaders(auth) {
  return getToken(auth);
}
export function encryptData(type, value) {
  return encrypt(type, value);
}
export function setBaseURL(baseURL) {
  axios.defaults.baseURL = baseURL;
}
export function getUuid() {
  return getuuid();
}