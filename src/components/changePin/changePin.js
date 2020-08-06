import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import md5 from "md5";
import { FIELD_TYPES } from "@6d-ui/fields";
import { FieldItem, validateForm } from '@6d-ui/fields';
import { ActionLoader } from '@6d-ui/ui-components';

import {
  CustomButton,
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_SIZE,
  COLOR
} from '@6d-ui/buttons';
import useFieldItem from '../../util/fieldItem'
import { FormElements } from "./utils/FormElements";
import { encrypt } from '../../util/Util';

function ChangePin(props) {

  useEffect(() => {
    props.setHeader("Change PIN");
  }, []);

  // const [values, fields, handleChange, validateValues, reset] = useFieldItem(FormElements, {pin:'Test'}, postValidate);
  const [values, fields, handleChange, validateValues, reset] = useFieldItem(FormElements, {}, postValidate);


  function postValidate(name, value, field) {
    
    if (name === 'confirmPin' && value !== values.newPin) {
      return { hasError: true, errorMsg: 'The new Pin and confirm Pin should be same !!' };
    }
  }

  const createCheck = (response, hasError) => {

   
    if (!hasError) {

      if (props.redirect) {
        props.history.push(props.redirect);
      }
      else {
     

     // setFields({});
      reset();
     
       }
    }
  }

 // props.loadingFunction({isLoading: true})
  const onSubmitClick = () => {
    Object.keys(fields).map(function (fieldName, keyIndex) {
      if (fields[fieldName].hasError) {
        props.setNotification({
          message: props.messagesUtil.EMPTY_FIELD_MSG,
          hasError: true
        });

        return;
      }

    })

    //api call
    
      props.ajaxUtil.sendRequest(props.urlConstants.CHANGE_PIN_URL,getRequest(), createCheck,
      props.loadingFunction, {method:"POST", isProceedOnError: false });
  
  }
  const getRequest = () => {

    return {
      //  pin: md5(values.oldPin),
      senderMsisdn:props.loggedInUser.msisdn,
      pin: values.pin,
      newPin: encrypt(values.newPin),
      confirmPin:encrypt(values.confirmPin)

    };
  }

  const onCancel = () => {
    props.history.goBack();
  }


  return (
    <div className="custom-container">
      <div className="form-Brick">
        <div className="form-Brick-Head" />
        <div className="form-Brick-body">
         
          <Row className="mx-0">
            <Col>
              <FieldItem
                {...FormElements.pin}
                value={values.pin}
                // onChange={this.handleChange.bind(this, "pin")}
                onChange={(...e) => handleChange('pin', ...e)}
                touched={fields.pin && fields.pin.hasError}
                error={fields.pin && fields.pin.errorMsg}
                inputType="password"
              />
            </Col>
          </Row>
          <Row className="mx-0">
            <Col>
              <FieldItem
                {...FormElements.newPin}
                value={values.newPin}
                //  onChange={this.handleChange.bind(this, "newPwd")}
                onChange={(...e) => handleChange('newPin', ...e)}
                touched={fields.newPin && fields.newPin.hasError}
                error={fields.newPin && fields.newPin.errorMsg}
                inputType="password"
              />
            </Col>
          </Row>
          <Row className="mx-0">
            <Col>
              <FieldItem
                {...FormElements.confirmPin}
                value={values.confirmPin}
                // onChange={this.handleChange.bind(this, "confirmPwd")}
                onChange={(...e) => handleChange('confirmPin', ...e)}
                touched={fields.confirmPin && fields.confirmPin.hasError}
                error={fields.confirmPin && fields.confirmPin.errorMsg}
                inputType="password"
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="container-fluid">
        <CustomButton
          style={BUTTON_STYLE.BRICK}
          type={BUTTON_TYPE.PRIMARY}
          size={BUTTON_SIZE.LARGE}
          align="right"
          label="Update"
          isButtonGroup={true}
          onClick={onSubmitClick}
        />
        <CustomButton
          style={BUTTON_STYLE.BRICK}
          type={BUTTON_TYPE.SECONDARY}
          size={BUTTON_SIZE.LARGE}
          align="right"
          label="Cancel"
          isButtonGroup={true}
          //onClick={this.onCancel.bind(this)}
          onClick={onCancel}
        />
      </div>
      
    </div>
  );

}

export default withRouter(ChangePin);



















