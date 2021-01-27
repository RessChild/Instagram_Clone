import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Title from "../../sources/instagram_title.png"
import { Link } from 'react-router-dom';
import { RegisterInit, RegisterReduce } from './reducer/RegisterReducer';
import { CHANGE_DATA } from '../Timeline/reducer/TimelineReducer';

const Register = ({ history }) => {

    const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(RegisterReduce, RegisterInit);
    const { isLoading, identify, error } = state; // 각종 정보들
    const { email, username, password, password_again } = identify; // 입력정보

    // 입력함수
    const onChangeInput = ({ currentTarget: { id, value }}) => {
        const [ target, name ] = id.split('-');
        dispatch({ type: CHANGE_DATA, 
            data: {
                [target]: {
                    ...state[target],
                    [name]: value.trim()
                }
            }
        });
    }

    // 에러 타입 확인
    const errorType = () => {
        switch (error) {
            case 200:
                return "부적절한 형식의 입력입니다. 다시 확인해주세요";
            case 201:
                return "비밀번호가 일치하지 않습니다.";
            case 401:
                return "이미 존재하는 계정 정보입니다.";
            case 500:
                return "Instagram에 연결할 수 없습니다. 인터넷에 연결되어 있는지 확인한 후 다시 시도해보세요.";
            default:
                throw new Error("cant find error type");
        }
    }

    const onClickSubmit = () => {
        if (!email || !username || !password) return dispatch({ type: CHANGE_DATA, data: { error: 200 }});
        if( password !== password_again ) return dispatch({ type: CHANGE_DATA, data: { error: 201 }});
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        // alert("로그인 구현 필요");
        axios.post('/api/identify/register', { email, username, password }, { cancelToken: source.token })
            .then(({ data }) => {
                // 회원가입 실패
                if( !data ) {
                    return dispatch({ type: CHANGE_DATA, data: {
                        isLoading: false,
                        error: 401,
                    }})
                }
                alert("회원가입에 성공하였습니다.")
                history.push('/');
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
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
                        <input placeholder="사용자 이름" value={username} id="identify-username" onChange={onChangeInput}
                            style={{ width: "98%", height: "2.1rem", background: "#eeeeee", borderColor: "#aaaaaa", borderRadius: "3px", marginBottom: "0.5rem" }}/>
                        <input placeholder="비밀번호" type="password" value={password} id="identify-password" onChange={onChangeInput}
                            style={{ width: "98%", height: "2.1rem", background: "#eeeeee", borderColor: "#aaaaaa", borderRadius: "3px", marginBottom: "0.5rem" }}/>
                        <input placeholder="비밀번호 확인" type="password" value={password_again} id="identify-password_again" onChange={onChangeInput}
                            style={{ width: "98%", height: "2.1rem", background: "#eeeeee", borderColor: "#aaaaaa", borderRadius: "3px", marginBottom: "1rem" }}/>
                        <Button onClick={onClickSubmit} fullWidth variant="contained" color="primary" style={{ height: "2.2rem" }}>
                            { !isLoading ? "가입" : <CircularProgress size="1.3rem" color="#ffffff" /> }
                        </Button>
                    </Box>
                    <Box width="100%" marginTop="1rem" textAlign="center" whiteSpace="wrap" color="red">{ error && errorType() }</Box>
                </Box>
                <Box bgcolor="#ffffff" width="100%" height="4%" 
                    display="flex" alignItems="center" justifyContent="center"
                    border={1} borderColor="#aaaaaa" padding="2rem">
                    <Box textAlign="center">
                        계정이 있으신가요? <Link style={{ color: "#3399ff", fontWeight: "700", textDecoration: "none" }} to="/login">로그인</Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Register;