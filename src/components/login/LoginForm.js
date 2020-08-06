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
import { Link, Redirect } from 'react-router-dom';
import { ajaxUtil, setHeaderUtil, saveCurrentStateUtil, setNotification, setModalPopupUtil, setLoadingUtil, isComplexTab } from '../home/Utils';
import { LOGIN_URL, FIRST_LOGIN_URL } from '../../util/Constants';

export default function LoginForm(props) {
    const [userName, setUserName] = useState(2000);
    const [password, setPassword] = useState('Admin12#');
    const [show, setShow] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [otpRedirect, setOtpRedirect] = useState(false);
    const [serviceId,setServiceId]=useState();

    const handlePassworChange = val => {
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
            setShow(str);
            setPassword(isShow?val:value);
        } else {
            setShow('');
            setPassword('');
        }
    };

    const height = useWindowHeight();
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!userName) {
            setError("Please Enter User Name !");
            return false;
        }
        if (!password) {
            setError("Please Enter Password !");
            return false;
        }
        setError('');
        props.onSubmit(userName, password);
    };
    const formContainerRef = useRef(null);
    let formHeight = 414;
    useEffect(() => {
        formHeight = formContainerRef.current.offsetHeight;
    }, []);
    const getErrorMsg = () => {
        if (error || props.message) {
            return (
                <div className={_.isEmpty(error) && _.isEmpty(props.login.error) ? 'successMsg_login' : 'errorMsg_login'}>
                    {error || props.message}
                </div>
            );
        }
    }
    const validateUser = (e) => {
        e.preventDefault();
        setError("");
        if (!userName) {
            setError("Please Enter User Name !");
            return false;
        }
        const req={
            userID:userName
        }
        ajaxUtil.sendRequest(FIRST_LOGIN_URL, req, (response, hasError) => {
            if (!hasError && response) {
                if (response.firstTime){
                    setServiceId(102);
                    setOtpRedirect(true)
                }else
                    setShowPass(true)
            } else if (response && response.message) {
                setError(response.message);
            } else {
                setError("Oops! Something went wrong Please try again ");
            }        

        }, setLoadingUtil, {method:'GET',isShowSuccess: false, isLogout: false });
    }
    if (otpRedirect)
        return <Redirect to={`/forgetPassword/${userName}/${serviceId}`} push />

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
                                <form onSubmit={showPass ? handleLoginSubmit : validateUser} className="login-form">
                                    {getErrorMsg()}
                                    <div style={{ color: '#495057', cursor: 'pointer' }}>
                                        <InputGroup>
                                            <Input onChange={!showPass ? (event) => setUserName(event.target.value) : ''}
                                                value={userName} autoComplete="new-username"
                                            />
                                            {<InputGroupAddon addonType="append" style={{ lineHeight: '38px' }}><i className="fa fa-user-o" style={{ width: '21px' }} ></i></InputGroupAddon>}
                                            <span className="floating-label">User Name</span>
                                        </InputGroup>
                                    </div>
                                    <div className="pt-1" style={{ color: '#495057', cursor: 'pointer' }}>
                                        {showPass && <InputGroup>
                                            <Input style={{ fontWeight: 600 }} onChange={(event) => handlePassworChange(event.target.value)} value={isShow ? password : show} />
                                            <InputGroupAddon addonType="append" style={{ lineHeight: '38px' }} onClick={() => setIsShow(!isShow)}><i className="fa fa-eye" style={{ width: '21px' }} ></i></InputGroupAddon>
                                            <span className="floating-label">Password</span>
                                        </InputGroup>}
                                    </div>
                                    {
                                        props.isLoading
                                            ? <Button className="w-100 login-button primary-background" disabled>
                                                <i className="fa fa-spinner fa-spin"></i><span> authenticating...</span>
                                            </Button>
                                            : showPass ?
                                                <Button className="w-100 login-button c-pointer primary-background">Login</Button>
                                                :
                                                <Button className="w-100 login-button c-pointer primary-background">Next</Button>}
                                    <div className="login-form-footer row">
                                        {showPass &&<> 
                                            <div className="d-flex justify-content-left col">
                                                <a href="#" onClick={() => setShowPass(false)}>Login Page</a>
                                            </div>
                                            <div className="d-flex justify-content-end col">
                                                <a href="#" onClick={() =>{ 
                                                    setServiceId(103)
                                                    setOtpRedirect(true)}}>Forgot Password</a>
                                            </div>
                                        </>
                                        }
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