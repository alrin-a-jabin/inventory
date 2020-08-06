import React from 'react';
import { validateForm } from '@6d-ui/fields';
import _ from 'lodash';
export function getGroupArray(groups = [], nonEditableFields = [], assignedFields = [],hasParent) {
    return groups.reduce((acc, group) => {
        const getFields = getFieldsArray(group.fields, nonEditableFields, assignedFields,hasParent);
        const getGroups = getGroupArray(group.subGroups, nonEditableFields, assignedFields,hasParent);
        if ((getFields && getFields.length > 0) || (getGroups && getGroups.length > 0)) {
            acc = [...acc, {
                ...group,
                fields: getFields,
                subGroups: getGroups
            }]
        }
        return acc;
    }, [])
}

function getFieldsArray(fields = [], nonEditableFields = [], assignedFields = [],hasParent) {
    let isSeparateEdit;
    const allFields = Object.keys(fields).map(key => {
        if (nonEditableFields.find(f => fields[key].name == f)) {
            isSeparateEdit = true;
        } else {
            isSeparateEdit = false;
        }
        return { fieldId: key, ...fields[key], isSeparateEdit }
    })
    return _.intersectionWith(allFields, assignedFields, (f1, f2) => {
        //add is Mandatory tag to field list fronm API call response
        if(f1.fieldId == f2.id){
            if(f1.name==="parent"&&hasParent){
                f1.ismandatory=true;    
            }else
            f1.ismandatory = f2.isMandatory == 1 ? true : false
            f1.fieldOrder=f2.fieldOrder;
        }
        return f1.fieldId == f2.id;
    });
}

export function getAllFields(groups = []) {
    return groups.reduce((allFields, group) => {
        const f = getAllFields(group.subGroups);
        group.fields.reduce((acc, f) => {
            if (f.regex)
                f.regex = new RegExp(f.regex);
            else
                f.regex = undefined;
            acc[f.name] = f;
            return acc
        }, allFields)
        return { ...allFields, ...f };
    }, []);
}

export function validateTabFields(group, values, setNotification, messagesUtil) {
    const fields = getAllFields([group]);
    return Object.keys(fields).some(key => {
        const field = fields[key];
        const validate = validateForm(field.name, values[field.name], field);
        if (validate && validate.hasError) {
            setNotification({
                message: messagesUtil.EMPTY_FIELD_MSG,
                hasError: true
            })
        }
        return validate.hasError;
    });
}