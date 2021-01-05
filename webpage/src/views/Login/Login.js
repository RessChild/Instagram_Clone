import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Title from "../../sources/instagram_title.png"
import { Link } from 'react-router-dom';
import { LoginInit, LoginReduce } from './reducer/LoginReducer';
import { CHANGE_DATA } from '../Timeline/reducer/TimelineReducer';

const Login = ({ history }) => {

    const [ state, dispatch ] = useReducer(LoginReduce, LoginInit);
    const { isLoading, identify, error } = state; // 각종 정보들
    const { email, password } = identify; // 입력정보

    // 입력함수
    const onChangeInput = ({ currentTarget: { id, value }}) => {
        const [ target, name ] = id.split('-');
        dispatch({ type: CHANGE_DATA, 
            data: {
                [target]: {
                    ...state[target],
                    [name]: value
                }
            }
        });
    }

    // 에러 타입 확인
    const errorType = () => {
        switch (error) {
            case 401:
                return "잘못된 비밀번호입니다. 다시 확인하세요.";        
            case 500:
                return "Instagram에 연결할 수 없습니다. 인터넷에 연결되어 있는지 확인한 후 다시 시도해보세요.";
            default:
                throw new Error("cant find error type");
        }
    }

    const onClickSubmit = () => {
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        alert("로그인 구현 필요");
        // axios.post('/api/')
    }

    return (
        <Box id="login-page" width="100vw" height="100vh" bgcolor="#eeeeee" display="flex" alignItems="center" justifyContent="center">
            <Box id="input-space" width="19rem" height="35rem"
                display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                <Box bgcolor="#ffffff" width="100%" height="70%"
                    border={1} borderColor="#aaaaaa" padding="2rem">
                    <Box width="100%" height="5rem" overflow="hidden" marginBottom="1rem"
                        display="flex" alignItems="center" justifyContent="center">
                        <img src={Title} alt="instagram_logo" style={{ width: "70%" }}/>
                    </Box>
                    <Box width="100%">
                        <input placeholder="전화번호, 사용자 이름 또는 이메일" value={email} id="identify-email" onChange={onChangeInput}
                            style={{ width: "98%", height: "2.1rem", background: "#eeeeee", borderColor: "#aaaaaa", borderRadius: "3px", marginBottom: "0.5rem" }}/>
                        <input placeholder="비밀번호" type="password" value={password} id="identify-password" onChange={onChangeInput}
                            style={{ width: "98%", height: "2.1rem", background: "#eeeeee", borderColor: "#aaaaaa", borderRadius: "3px", marginBottom: "1rem" }}/>
                        <Button onClick={onClickSubmit} fullWidth variant="contained" color="primary" style={{ height: "2.2rem" }}>
                            { !isLoading ? "로그인" : <CircularProgress size="1.3rem" color="#ffffff" /> }
                        </Button>
                    </Box>
                    <Box width="100%" marginTop="1rem" textAlign="center" whiteSpace="wrap" color="red">{ error && errorType() }</Box>
                </Box>
                <Box bgcolor="#ffffff" width="100%" height="4%" 
                    display="flex" alignItems="center" justifyContent="center"
                    border={1} borderColor="#aaaaaa" padding="2rem">
                    <Box textAlign="center">
                        계정이 없으신가요? <Link style={{ color: "#3399ff", fontWeight: "700", textDecoration: "none" }} to="/register">가입하기</Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;