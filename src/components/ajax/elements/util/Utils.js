import uuidv1 from 'uuid/v1';
import md5 from 'md5';
import moment from 'moment';
import CryptoJS from 'crypto-js';

export function getToken(auth, channel,isEncrpt=false,encrptKey="key") {
    let autVal=auth;
    if(isEncrpt&&getCookie("X-Auth-Token"))
        autVal=encryptAuth(moment(new Date()).format("DDMMYYYYhhmmssSSS")+'||'+getCookie("X-Auth-Token"),encrptKey);
    
    const entity=getCookie("X-Entity")?{"X-Entity": getCookie("X-Entity")}:{};
    return {
        "X-Auth-Token": getCookie("X-Auth-Token"),
        "X-UserId": getCookie("X-UserId"),
        "X-Msisdn": getCookie("X-Msisdn"),
        "orderId": getuuid(),
        "Authorization" : getCookie("X-Auth-Token")?autVal+' '+getCookie("X-Auth-Token"):autVal,
        "X-Channel": channel,
        "Access-Control-Allow-Origin": "*",
        ...entity
    }
}
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function setToken(token, userId ,msisdn="") {
    if (!token && !userId) {
        document.cookie = `X-Auth-Token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
        document.cookie = `X-UserId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
        document.cookie = `X-Msisdn=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    } else {
        const date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        document.cookie = `X-Auth-Token=${token};expires=${date.toUTCString()};path=/`;
        document.cookie = `X-UserId=${userId};expires=${date.toUTCString()};path=/`;
        document.cookie = `X-Msisdn=${msisdn};expires=${date.toUTCString()};path=/`;
    }
}
export function getuuid() {
    return uuidv1();
}
export function encrypt(type, value) {
  switch (type) {
    case 'md5':
      return md5(value);
    default:
      return value;
  }
}

export function encryptAuth(data,key) {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString()
}