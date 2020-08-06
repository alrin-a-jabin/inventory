import React from 'react';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import _ from 'lodash';

import { GLOBAL_CONSTANTS, ENCYPT_KEY } from './Constants';

export function getDropDownValues(values, name) {
    return (values[name] && values[name].label) ? values[name].label : values[name];
}
// to get value form selected dropdown values
export function getValueOfDropDown(values, name) {
    return (values[name] && values[name].value) ? values[name].value : values[name];
}

export function dateToStringFormatter(date) {
    if (date)
        return moment(date).format(GLOBAL_CONSTANTS.DATE_FORMAT);
}


export function stringToDateFormatter(inputString) {
    if (inputString)
        return moment(inputString, GLOBAL_CONSTANTS.DATE_FORMAT);
}

export function formatStringToDate(inputString) {
    if (inputString)
        return moment(inputString,GLOBAL_CONSTANTS.DMS_DATE_FORMAT);
}

export function getValuesForDropDown(options, label) {
    return options.find(option => option.label === label);
}

export function encrypt(data) {

    const keyHex = CryptoJS.enc.Utf8.parse(ENCYPT_KEY);
    const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString()
}

export const getCurrentPrivilages = (privilages, menuPrivilages) => {

    const priv = {
        create: false,
        edit: false,
        delete: false,
        download: false,
        info: false
    };
    let privConst = {};
    if (privilages && menuPrivilages) {
        privConst = {
            create: _.includes(privilages, menuPrivilages.create),
            edit: _.includes(privilages, menuPrivilages.edit),
            delete: _.includes(privilages, menuPrivilages.delete),
            download: _.includes(privilages, menuPrivilages.download),
            info: _.includes(privilages, menuPrivilages.info)
        }
    }

    return Object.assign(priv, privConst);
};

export function getDropDownValue(value, attribute = 'value') {
    const valueType = typeof value;

    if (valueType == 'string'
        || valueType == 'number'
        || valueType == 'boolean'
        || valueType == 'undefined'
        || value == null) {
        return value
    };
    if (Array.isArray(value))
        return value.map(v => getDropDownValue(v, attribute));

    return value[attribute];
}