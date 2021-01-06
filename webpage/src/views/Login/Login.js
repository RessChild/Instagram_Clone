import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Title from "../../sources/instagram_title.png"
import { Link } from 'react-router-dom';
import { LoginInit, LoginReduce } from './reducer/LoginReducer';
import { CHANGE_DATA } from '../Timeline/reducer/TimelineReducer';

const Login = ({ history }) => {

    const source = axios.CancelToken.source();

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
                return "알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.";
                // throw new Error("cant find error type");
        }
    }

    const onClickSubmit = () => {
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post('/api/identify/login', identify, { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);

                // 로그인 실패
                if( !data ) {
                    return dispatch({ type: CHANGE_DATA, data: {
                        isLoading: false,
                        error: 401,
                    }})
                }
                // 로컬저장소에 정보 저장 ( 실제론 jwt 정보가 저장되어야 함 )
                localStorage.setItem('access_token', email);
                return history.push(`/timeline/${email}`);
            })
            .catch( e => {
                if( axios.isCancel(e) ) return; // 취소인 경우 무시
                if( e.config && e.config.url ) { // 네트워크 오류 검사
                    dispatch({ type: CHANGE_DATA, data: {
                        isLoading: false,
                        error: 500,
                    }})
                }
                else {
                    dispatch({ type: CHANGE_DATA, data: {
                        isLoading: false,
                        error: e.response && e.response.status,
                    }})
                }
            })
    }

    useEffect(() => {
        // if(localStorage.getItem('jwt')) history.replace(`/timeline/${localStorage.getItem('jwt')}`);
        return () => {
            source.cancel();
        }
    }, [])

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
                            { !isLoading ? "로그인" : <CircularProgress size="1.3rem" color="inherit" /> }
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