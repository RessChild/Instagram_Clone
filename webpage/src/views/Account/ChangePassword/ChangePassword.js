import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, Slide, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

import Logo from "../../../sources/instagram_logo.png";

const left_flex = 2;
const right_flex = 5;

const ChangePassword = () => {

    const source = axios.CancelToken.source();

    const [ profile, setProfile ] = useState({ name: '', email: '', image: '' });
    const { name, email, image } = profile;

    const [ pwError, setPwError ] = useState(0);
    const [ pwLoading, setPwLoading ] = useState(false);
    const [ pw, setPw ] = useState({ password: '', nPassword: '', nPasswordCheck: '' });
    const { password, nPassword, nPasswordCheck } = pw;

    const onChangeInput = ({ currentTarget: { id, value }}) => {
        const [ tag, target ] = id.split('-');
        setPw({ ...pw, [target]: value.trim() });
    }

    // 오류 리스트
    const errorType = () => {
        switch(pwError) {
            case 0: // 일반 상태
                return "";
            case 100: // 내부 에러
                return "두 비밀번호가 일치하는지 확인하세요.";
            case 404: // 비번이 틀림
                return "이전 비밀번호가 잘못 입력되었습니다. 다시 입력해주세요.";
            case 501: // 저장할때 오류
                return "비밀번호 수정에 실패하였습니다."
            default:
                throw new Error("unhandled pw error type");
        }
    }

    // 변경 제출
    const onClickPasswordSubmit = () => {
        if( nPassword !== nPasswordCheck ) {
            return setPwError(100) // 종료
        }
        setPwLoading(true);
        axios.post('/api/account/set-password',
                { jwt: localStorage.getItem('access_token'), password, nPassword },
                { cancelToken: source.token })
            .then(({ data }) => {
                // console.log(data);
                if( data === 200 ) alert("비밀번호 수정에 성공하였습니다.");
                else setPwError(data);
                setTimeout(() => setPwError(0), 5000);
                setPwLoading(false);
            })
            .catch( e => {
                setPwLoading(false);
                if(axios.isCancel(e)) return;
                alert(e);
                // 네트워크 에러 추가하기
            });
    }

    // 프로필 정보 axios 함수
    const axiosProfile = () => {
        axios.post(`/api/account`, { jwt: localStorage.getItem('access_token') }, { cancelToken: source.token })
            .then( ({ data }) => {
                // console.log(data);
                const { email, username, profile_image } = data;
                setProfile({
                    name: username,
                    email: email,
                    image: profile_image,
                });
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                alert(e);
            })
    }

    useEffect(() => {
        axiosProfile();
        return () => {
            source.cancel();
        }
    }, [])

    return <Box width="100%" height="100%" position="relative">
        <Box display="flex" marginBottom="1rem">
            <Box id="name-left" flex={left_flex} paddingRight="2rem" display="flex" alignItems="center" justifyContent="flex-end">
                <img alt="프로필 사진" src={ image ? `/api/account/html-img/${image}` : Logo }
                    style={{ width: "2rem", height: "2rem", overflow: "hidden", border: "1px solid #999999", borderRadius: "1rem" }}/>
            </Box>
            <Box id="name-right" flex={right_flex} paddingRight="3rem">
                <Box fontWeight="600">{ email }</Box>
            </Box>
        </Box>

        <Box display="flex" marginBottom="1rem">
            <Box id="password-left" flex={left_flex} paddingRight="2rem" paddingTop="0.5rem"
                fontWeight="700" display="flex" justifyContent="flex-end">
                이전 비밀번호
            </Box>
            <Box id="password-right" flex={right_flex} paddingRight="3rem">
                <TextField type="password" size="small" variant="outlined" fullWidth id="pw-password" value={password} onChange={onChangeInput}/>
            </Box>
        </Box>
        
        <Box display="flex" marginBottom="1rem">
            <Box id="nPassword-left" flex={left_flex} paddingRight="2rem" paddingTop="0.5rem"
                fontWeight="700" display="flex" justifyContent="flex-end">
                새 비밀번호
            </Box>
            <Box id="nPassword-right" flex={right_flex} paddingRight="3rem">
                <TextField type="password"  size="small" variant="outlined" fullWidth id="pw-nPassword" value={nPassword} onChange={onChangeInput}/>
            </Box>
        </Box>

        <Box display="flex" marginBottom="1rem">
            <Box id="nPasswordCheck-left" flex={left_flex} paddingRight="2rem" paddingTop="0.5rem"
                fontWeight="700" display="flex" justifyContent="flex-end">
                새 비밀번호 확인
            </Box>
            <Box id="nPasswordCheck-right" flex={right_flex} paddingRight="3rem">
                <TextField type="password" size="small" variant="outlined" fullWidth id="pw-nPasswordCheck" value={nPasswordCheck} onChange={onChangeInput}/>
            </Box>
        </Box>

        <Box marginTop="2rem" display="flex" marginBottom="1rem">
            <Box id="button-left" flex={left_flex} paddingRight="2rem" paddingTop="0.5rem"></Box>
            <Box id="button-right" flex={right_flex} paddingRight="3rem">
                <Button variant="contained" color="primary" onClick={onClickPasswordSubmit} 
                    style={{ width: "8rem", height: "2rem" }} 
                    disabled={( !password || !nPassword || !nPasswordCheck ) || pwLoading}>
                    { pwLoading ? <CircularProgress size="1.3rem" color="#ffffff" /> : "비밀번호 변경" }
                </Button>
                <Box marginTop="2rem" fontSize="0.8rem" fontWeight="600">
                    <Link to="/" style={{ textDecoration: "none", color: "#6666ff" }}>
                        비밀번호를 잊으셨나요?
                    </Link>
                </Box>
            </Box>
        </Box>

        <Slide direction="up" in={!!pwError}>
            <Box position="fixed" left="0" bottom="0" padding="0.3rem" paddingLeft="1rem"
                width="100vw" height="2rem" lineHeight="2rem" bgcolor="#222222" color="white">
                { errorType() }
            </Box>
        </Slide>
    </Box>

}

export default ChangePassword;