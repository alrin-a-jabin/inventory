import React, { useState, useEffect, useRef } from 'react';
import {
    Container,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import _ from "lodash";
import { FORGET_PSWD_GET_OTP, FORGET_PSWD_VALIDATE_OTP, COUNTRY_CODE,FORGET_PSWD_URL,SET_PSWD_URL} from '../../util/Constants';
import { ajaxUtil, setHeaderUtil, saveCurrentStateUtil, setNotification, setModalPopupUtil, setLoadingUtil, isComplexTab } from '../home/Utils';
import { setLoading, logOut } from '../../actions';
import { store } from '../../index';
import { Redirect, useParams } from 'react-router-dom';

export default function ForgetPwd(props) {

    const [msisdn, setMsisdn] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isOtpPage, setIsOtpPage] = useState(false);
    const [isresendOtp, setIsresendOtp] = useState(false);
    const [message, setMessage] = useState("");
    const [loadLoginPage, setLoadLoginPage] = useState(false);
    const { userName: USER_NAME,serviceId } = useParams();
    const [isShow, setIsShow] = useState({ password: false, newPass: false, confPass: false });
    const [confPassShow, setConfPassShow] = useState('');
    const [newPassShow, setNewPassShow] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordPage, setPaswordPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
    }, []);
    console.log("iid",serviceId);
    
    function showResendOtp() {
        setTimeout(function () {
            setIsresendOtp(true);
        }, 10000)
    };

    const height = useWindowHeight();
    const handleMsisdn = (msisdn) => {
            setMsisdn(msisdn);
    }
    const handleGetOtp = (e) => {
        e.preventDefault();
        var reg = /^[0-9]{8,8}$/;
        if (!USER_NAME) {
            setError("Please Enter User Name !");
            return false;
        }
        if (!msisdn) {
            setError("Please Enter Msisdn !");
            return false;
        }

        /* if (!reg.test(msisdn)) {
            setError("Please enter a valid Mobile Number of length 8 digits.");
            return false;
        } */
        resendOtp("getotp");
    };

    const handleSubmitOtp = (e) => {
        setMessage('');
        e.preventDefault();
        if (!USER_NAME) {
            setError("Please Enter User Name !");
            return false;
        }
        if (!otp) {
            setError("Please Enter OTP !");
            return false;
        }
        setError('');
        const req = {
                "otp": otp,
                serviceId ,
                "userId": USER_NAME
        };
        
        setIsLoading(true);
        ajaxUtil.sendRequest(FORGET_PSWD_VALIDATE_OTP, req, (response, hasError) => {
            setIsLoading(false);
            if (!hasError) {
                setPaswordPage(true);
                setToken(response.validationToken)
            } else if (response && response.message) {
                setError(response.message);
            } else {
                setError("Oops! Something went wrong Please try again ");
            }
        }, setLoadingUtil, { isShowSuccess: false });
    };

    const resendOtp = (fromresend = "resend") => {
        setError('');
        setIsresendOtp(false);
        const req = {
                "receiverUserId": USER_NAME,
                "senderMsisdn": msisdn,
                "senderUserId": USER_NAME,
                serviceId,
                "validatorUserId": USER_NAME,
              }

        setIsLoading(true);
        ajaxUtil.sendRequest(FORGET_PSWD_GET_OTP, req, (response, hasError) => {
            setIsLoading(false)
            if (!hasError) {
                setIsOtpPage(true);
                showResendOtp();
                if (fromresend === "getotp")
                    setMessage("OTP send to your msisdn:" + msisdn);
                else
                    setMessage("OTP has Resend to your msisdn:" + msisdn);
            } else if (response && response.message) {
                setError(response.message);
            } else {
                setError("Oops! Something went wrong Please try again ");
            }
        }, setLoadingUtil, { isShowSuccess: false });
    }
    const handlePassworChange = (name, val) => {
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
                setConfirmPassword(isShow.confPass?val:value);
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
                setNewPassword(isShow.newPass?val:value);
            } else {
                setNewPassShow('');
                setNewPassword('');
            }
        }
    }
    function setShow(name) {
        const isShowTmp = { ...isShow };
        if (name === "newPass") {
            isShowTmp.newPass = !isShowTmp.newPass;
        }
        if (name === "confPass") {
            isShowTmp.confPass = !isShowTmp.confPass;
        }
        setIsShow(isShowTmp);
    }

    const handleSavePass=(e)=>{
        e.preventDefault();
    if (!newPassword) {
      setError("Please enter your password !");
      return false;
    }
    if (!confirmPassword) {
      setError("Please enter confirm password !");
      return false;
    }
    if (confirmPassword != newPassword) {
      setError("Password and Confirm password must be same !");
      return false;
    }
    setError("");
    const req={
        password:newPassword ,
        userId:USER_NAME,
        otp,
        validationToken:token,

    }
    const URL=serviceId==102?SET_PSWD_URL:FORGET_PSWD_URL;
     setIsLoading(true);
        ajaxUtil.sendRequest(URL, req, (response, hasError) => {
            setIsLoading(false);
            if (!hasError) {
                store.dispatch(logOut("Password Reset Successfullly"));
                setLoadLoginPage(true);
            } else if (response && response.message) {
                setError(response.message);
            } else {
                setError("Oops! Something went wrong Please try again ");
            }
        }, setLoadingUtil, { isShowSuccess: false });
    }

    const formContainerRef = useRef(null);
    let formHeight = 414;
    useEffect(() => {
        formHeight = formContainerRef.current.offsetHeight;
    }, []);
    const getErrorMsg = () => {
        if (error || message) {
            return (
                <div className={_.isEmpty(error) ? 'successMsg_login' : 'errorMsg_login'}>
                    {error || message}
                </div>
            );
        }
    }

    if (loadLoginPage)
        return <Redirect to="/login" />
    else
        return (
            <Container fluid>
                <Row>
                    <Col xs={6} lg={8} style={{ height: `${height}px` }} className="bg-secondary login-container"></Col>
                    <Col xs={6} lg={4} className="primary-background">
                        <div>
                            <div>
                                <div className="logo-container position-relative" style={{ height: `${(height - formHeight) / 2}px` }}>
                                    <img src={`${process.env.PUBLIC_URL}/images/logo/logoWhite.png`} alt="Smartfren" />
                                </div>
                                <div id="sampleChar" style={{ display: 'none' }}>&#183;</div>
                                {/* login form starts here */}
                                <div className="login-form-container bg-white" ref={formContainerRef} style={{ marginLeft: '-232.5px' }}>
                                    <div className="login-form-header">
                                        <span className="fw-600">Distribution Management System</span>
                                    </div>
                                    <form className="login-form">
                                        {getErrorMsg()}
                                       {
                                       !passwordPage? 
                                       <>
                                            <div style={{ color: '#495057', cursor: 'pointer' }}>
                                                <InputGroup>
                                                    <Input
                                                        value={USER_NAME} autoComplete="new-username" disabled
                                                    />
                                                    <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }}></InputGroupAddon>
                                                    {/* <span className="floating-label">User Name</span> */}
                                                </InputGroup>
                                            </div>
                                            {isOtpPage ?
                                                <div className="pt-1" style={{ color: '#495057', cursor: 'pointer' }}>
                                                    <InputGroup>
                                                        <Input style={{ fontWeight: 600 }} onChange={(event) => setOtp(event.target.value)} value={otp} />
                                                        <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }} ></InputGroupAddon>
                                                        <span className="floating-label">OTP</span>
                                                    </InputGroup>
                                                </div>
                                                : <div className="pt-1" style={{ color: '#495057', cursor: 'pointer' }}>
                                                    <InputGroup>
                                                        <Input style={{ fontWeight: 600 }} onChange={(event) => handleMsisdn(event.target.value)} value={msisdn} />
                                                        <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }} ></InputGroupAddon>
                                                        <span className="floating-label">Msisdn</span>
                                                    </InputGroup>
                                                </div>
                                            }

                                            {
                                                isLoading
                                                    ? <Button className="w-100 login-button primary-background" disabled>
                                                        <i className="fa fa-spinner fa-spin"></i><span> authenticating...</span>
                                                    </Button>
                                                    : isOtpPage ?
                                                        <Button className="w-100 login-button c-pointer primary-background" onClick={handleSubmitOtp}>Submit</Button>
                                                        : <Button className="w-100 login-button c-pointer primary-background" onClick={handleGetOtp}>Get OTP</Button>

                                            }
                                        </>
                                        :<>
                                            <div style={{ color: '#495057', cursor: 'pointer' }}>
                                                <InputGroup>
                                                    <Input onChange={(event) => handlePassworChange("newPass", event.target.value)}
                                                        value={isShow.newPass ? newPassword : newPassShow}
                                                    />
                                                    <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }}><i className="fa fa-eye" style={{ width: '21px' }} onClick={() => setShow("newPass")}></i></InputGroupAddon>
                                                    <span className="floating-label">Password</span>
                                                </InputGroup>
                                            </div>
                                            <div style={{ color: '#495057', cursor: 'pointer' }}>
                                                <InputGroup>
                                                    <Input onChange={(event) => handlePassworChange("confPass", event.target.value)}
                                                        value={isShow.confPass ? confirmPassword : confPassShow}
                                                    />
                                                    <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }}><i className="fa fa-eye" style={{ width: '21px' }} onClick={() => setShow("confPass")}></i></InputGroupAddon>
                                                    <span className="floating-label">Confirm Password</span>
                                                </InputGroup>
                                            </div>
                                            {
                                                isLoading
                                                    ? <Button className="w-100 login-button primary-background" disabled>
                                                        <i className="fa fa-spinner fa-spin"></i><span> authenticating...</span>
                                                    </Button>
                                                    :
                                                    <Button className="w-100 login-button c-pointer primary-background" onClick={handleSavePass}>Save Password</Button>
                                            }
                                        </>
                                        }
                                        <div className="login-form-footer row">
                                        <div className="d-flex justify-content-left col">
                                                <a href="#" onClick={() => setLoadLoginPage(true)}>Login Page</a>
                                            </div>
                                            <div className="d-flex justify-content-end col">
                                                {!passwordPage&&isOtpPage && isresendOtp ? <span style={{ paddingLeft: '20px', textDecoration: 'underline', cursor: 'pointer', color: '#33495F' }}
                                                    onClick={resendOtp}>resend OTP</span> : ''}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="logo-container position-relative" style={{ height: `${(height - formHeight) / 2}px` }}>
                                    <span>Smartfren ©2020. All Rights Reserved</span>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        )
}


function useWindowHeight() {
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return height;
}
