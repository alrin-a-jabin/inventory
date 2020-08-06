import React, { Component, useState, useEffect } from "react";
import { Row, Col, InputGroup, InputGroupAddon, Input } from "reactstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import md5 from "md5";
import {
  CustomButton,
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_SIZE
} from '@6d-ui/buttons';

function ChangePswd(props) {
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passShow, setPassShow] = useState('');
  const [confPassShow, setConfPassShow] = useState('');
  const [newPassShow, setNewPassShow] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isShow, setIsShow] = useState({ password: false, newPass: false, confPass: false });
  useEffect(() => {
    props.setHeader('Change Password');
  }, [])
  const handlePassworChange = (name, val) => {
    if (name === "password") {
      if (val && val.length > 0) {
        let str = '';
        const elem = document.getElementById('sampleChar');
        let value = password;
        for (var i = 0; i < val.length; i++) {
          // str += '*';
          // str += String.fromCharCode(parseInt('U+000B7', 16));
          str += elem.textContent;
          if (val.length < password.length) {
            value = value.substring(0, val.length)
          } else if (i == val.length - 1) {
            value += val[i];
          }

        }
        setPassShow(str);
        setPassword(value);
      } else {
        setPassShow('');
        setPassword('');
      }
    }
    if (name === "confPass") {
      if (val && val.length > 0) {
        let str = '';
        const elem = document.getElementById('sampleChar');
        let value = confirmPassword;
        for (var i = 0; i < val.length; i++) {
          // str += '*';
          // str += String.fromCharCode(parseInt('U+000B7', 16));
          str += elem.textContent;
          if (val.length < confirmPassword.length) {
            value = value.substring(0, val.length)
          } else if (i == val.length - 1) {
            value += val[i];
          }

        }
        setConfPassShow(str);
        setConfirmPassword(value);
      } else {
        setConfPassShow('');
        setConfirmPassword('');
      }
    }
    if (name === "newPass") {
      if (val && val.length > 0) {
        let str = '';
        const elem = document.getElementById('sampleChar');
        let value = newPassword;
        for (var i = 0; i < val.length; i++) {
          // str += '*';
          // str += String.fromCharCode(parseInt('U+000B7', 16));
          str += elem.textContent;
          if (val.length < newPassword.length) {
            value = value.substring(0, val.length)
          } else if (i == val.length - 1) {
            value += val[i];
          }

        }
        setNewPassShow(str);
        setNewPassword(value);
      } else {
        setNewPassShow('');
        setNewPassword('');
      }
    }
  }

  function setShow(name) {
    const isShowTmp = { ...isShow };
    if (name === "password") {
      isShowTmp.password = !isShowTmp.password;
    }
    if (name === "newPass") {
      isShowTmp.newPass = !isShowTmp.newPass;
    }
    if (name === "confPass") {
      isShowTmp.confPass = !isShowTmp.confPass;
    }
    setIsShow(isShowTmp);
  }
  function onCancel() {
    props.history.goBack();
  }
  const getErrorMsg = () => {
    if (error || props.message) {
      return (
        <div className="errorMsg_login col-6">
          {error}
        </div>
      );
    }
  }

  const onSubmitClick = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your current password !");
      return false;
    }
    if (!newPassword) {
      setError("Please enter your new password !");
      return false;
    }
    if (!confirmPassword) {
      setError("Please confirm your new password !");
      return false;
    }
    if (confirmPassword != newPassword) {
      setError("New Password and Confirm password must be same !");
      return false;
    }
    setError("");
    const req = {
      userId: props.loggedInUser.userId,
      password: password,
      // newPassword: encrypt(this.state.newPwd),
      newPassword: newPassword,
      // confirmPassword: encrypt(this.state.confirmPwd)
      confirmPassword: confirmPassword
    }

    props.ajaxUtil.sendRequest(props.urlConstants.CHANGE_PSWD_URL, req, (response, hasError) => {
      if (!hasError) {
        if (props.redirect) {
          props.history.push(props.redirect);
        }
        else {
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setPassShow('');
          setConfPassShow('');
          setNewPassShow('');
          setIsShow({ password: false, newPass: false, confPass: false })
        }
      }
    }, props.loadingFunction, { isShowSuccess: true, isProceedOnError: true });
  }

  return (
    <div className="custom-container">
      <div className="form-Brick">
        <div className="form-Brick-Head" />
        <div id="sampleChar" style={{ display: 'none' }}>&#183;</div>
        <div className="form-Brick-body login-form">
          {getErrorMsg()}
          <Row className="mx-0">
            <Col className="col-6">
              <InputGroup>
                <Input onChange={(event) => handlePassworChange("password", event.target.value)}
                  value={isShow.password ? password : passShow}
                />
                <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }}><i className="fa fa-eye" style={{ width: '21px' }} onClick={() => setShow("password")}></i></InputGroupAddon>
                <span className="floating-label">Old password</span>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mx-0">
            <Col className="col-6">
              <InputGroup>
                <Input onChange={(event) => handlePassworChange("newPass", event.target.value)}
                  value={isShow.newPass ? newPassword : newPassShow}
                />
                <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }}><i className="fa fa-eye" style={{ width: '21px' }} onClick={() => setShow("newPass")}></i></InputGroupAddon>
                <span className="floating-label">New password</span>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mx-0">
            <Col className="col-6">
              <InputGroup>
                <Input onChange={(event) => handlePassworChange("confPass", event.target.value)}
                  value={isShow.confPass ? confirmPassword : confPassShow}
                />
                <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }}><i className="fa fa-eye" style={{ width: '21px' }} onClick={() => setShow("confPass")}></i></InputGroupAddon>
                <span className="floating-label">Confirm new password</span>
              </InputGroup>
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
          onClick={onCancel}
        />
      </div>
    </div>
  );
}
export default withRouter(ChangePswd);