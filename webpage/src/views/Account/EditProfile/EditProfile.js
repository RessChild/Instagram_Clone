import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@material-ui/core";

import Logo from "../../../sources/instagram_logo.png";

const left_flex = 2;
const right_flex = 5;

const EditProfile = () => {
    const source = axios.CancelToken.source();

    const [ profile, setProfile ] = useState({ name: '', email: '', image: '' });
    const { name, email, image } = profile;

    // 프로필 사진 변경
    const onChangeFile = ({ currentTarget: { files }}) => {
        // console.log(files);
        if( !files.length ) return; // 0 이하면 종료
        const file = files[0];

        // 타입 필터링
        const nameArr = file.name.split('.');
        if( !['png', 'jpg', 'jpeg'].includes(nameArr[nameArr.length - 1]) ) alert("적합한 파일타입이 아닙니다.")
        
        const formData = new FormData();
        formData.append('image', file);
        formData.append('jwt', localStorage.getItem('access_token'));

        axios.post('/api/account/set-profile-image', formData, { cancelToken: source.token })
            .then( ({ data }) => {
                // 프로필 변경
                console.log(data);
                if( !data || !data.affected ) return; // 영향없음
                setProfile({ ...profile, image: data.filename });
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                alert(e);
            })
    }

    const onChangeInput = ({ currentTarget: { id, value }}) => {
        const [ tag, target ] = id.split('-');
        setProfile({ ...profile, [target]: value.trim() });
    }

    // 프로필 정보 axios 함수
    const axiosProfile = () => {
        axios.post(`/api/account`, { jwt: localStorage.getItem('access_token') }, { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);
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

    const onClickEditSubmit = () => {
        axios.post('/api/account/set-profile', { jwt: localStorage.getItem('access_token'), name, email }, { cancelToken: source.token })
            .then(({ data }) => {
                console.log(data);
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                alert(e);
            })
    }

    return <Box width="100%" height="100%" position="relative">
        <Box display="flex" marginBottom="1rem">
            <Box id="name-left" flex={left_flex} paddingRight="2rem" display="flex" alignItems="center" justifyContent="flex-end">
                <img alt="프로필 사진" src={ image ? `/api/account/html-img/${image}` : Logo }
                    style={{ width: "2rem", height: "2rem", overflow: "hidden", border: "1px solid #999999", borderRadius: "1rem" }}/>
            </Box>
            <Box id="name-right" flex={right_flex} paddingRight="3rem">
                <Box fontWeight="600">{ email }</Box>
                <Box fontSize="0.9rem" color="#6666ff" fontWeight="600">
                    <label htmlFor="profile-img-input" style={{ cursor: "pointer" }}>프로필 사진 바꾸기</label>
                    <input id="profile-img-input" type="file" accept="image/png, image/jpeg" 
                        onChange={onChangeFile} style={{ display: "none" }} />
                </Box>
            </Box>
        </Box>

        <Box display="flex" marginBottom="1rem">
            <Box id="name-left" flex={left_flex} paddingRight="2rem" paddingTop="0.5rem"
                fontWeight="700" display="flex" justifyContent="flex-end">
                이름
            </Box>
            <Box id="name-right" flex={right_flex} paddingRight="3rem">
                <TextField size="small" variant="outlined" fullWidth id="input-name" value={name} onChange={onChangeInput}/>
                <Box marginTop="0.5rem" color="#aaaaaa" fontSize="0.7rem" fontWeight="600">
                    사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.
                    <br/><br/>
                    이름은 14일 안에 두 번만 변경할 수 있습니다.
                </Box>
            </Box>
        </Box>
        
        <Box display="flex" marginBottom="1rem">
            <Box id="email-left" flex={left_flex} paddingRight="2rem" paddingTop="0.5rem"
                fontWeight="700" display="flex" justifyContent="flex-end">
                사용자 이름
            </Box>
            <Box id="email-right" flex={right_flex} paddingRight="3rem">
                <TextField size="small" variant="outlined" fullWidth id="input-email" value={email} onChange={onChangeInput}/>
                <Box marginTop="0.5rem" color="#aaaaaa" fontSize="0.7rem" fontWeight="600">
                    대부분의 경우 14일 이내에 사용자 이름을 다시 {email}(으)로 변경할 수 있습니다. 더 알아보기
                </Box>
            </Box>
        </Box>

        <Box position="absolute" width="100%" bottom="0" display="flex" marginBottom="1rem">
            <Box id="email-left" flex={left_flex} paddingRight="2rem" paddingTop="0.5rem"></Box>
            <Box id="email-right" flex={right_flex} paddingRight="3rem">
                <Button variant="contained" color="primary" onClick={onClickEditSubmit}>제출</Button>
            </Box>
        </Box>
    </Box>
}

export default EditProfile;