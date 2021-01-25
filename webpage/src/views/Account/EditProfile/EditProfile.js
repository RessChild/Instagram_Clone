import React from "react";
import axios from "axios";
import { Box, TextField } from "@material-ui/core";

import Logo from "../../../sources/instagram_logo.png";

const EditProfile = () => {

    // 프로필 사진 변경
    const onChangeFile = ({ currentTarget: { files }}) => {
        console.log(files);
    }

    return <Box width="100%" height="100%">
        <Box display="flex" marginBottom="1rem">
            <Box id="name-left" flex={1} paddingRight="2rem" display="flex" alignItems="center" justifyContent="flex-end">
                <img src={Logo} alt="프로필 사진"
                    style={{ width: "2rem", height: "2rem", overflow: "hidden", border: "1px solid #999999", borderRadius: "1rem" }}/>
            </Box>
            <Box id="name-right" flex={3} paddingRight="3rem">
                <Box fontWeight="600">유저 닉네임</Box>
                <Box fontSize="0.9rem" color="#6666ff" fontWeight="600">
                    <label htmlFor="profile-img-input" style={{ cursor: "pointer" }}>프로필 사진 바꾸기</label>
                    <input id="profile-img-input" type="file" accept="image/png, image/jpeg" 
                        onChange={onChangeFile} style={{ display: "none" }} />
                </Box>
            </Box>
        </Box>

        <Box display="flex" marginBottom="1rem">
            <Box id="name-left" flex={1} paddingRight="2rem" paddingTop="0.5rem"
                fontWeight="700" display="flex" justifyContent="flex-end">
                이름
            </Box>
            <Box id="name-right" flex={3} paddingRight="3rem">
                <TextField size="small" variant="outlined" fullWidth/>
                <Box marginTop="0.5rem" color="#aaaaaa" fontSize="0.7rem" fontWeight="600">
                    사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.
                    <br/><br />
                    이름은 14일 안에 두 번만 변경할 수 있습니다.
                </Box>
            </Box>
        </Box>
        
        <Box display="flex" marginBottom="1rem">
            <Box id="username-left" flex={1} paddingRight="2rem" paddingTop="0.5rem"
                fontWeight="700" display="flex" justifyContent="flex-end">
                사용자 이름
            </Box>
            <Box id="username-right" flex={3} paddingRight="3rem">
                <TextField size="small" variant="outlined" fullWidth/>
                <Box marginTop="0.5rem" color="#aaaaaa" fontSize="0.7rem" fontWeight="600">
                    대부분의 경우 14일 이내에 사용자 이름을 다시 {}(으)로 변경할 수 있습니다. 더 알아보기
                </Box>
            </Box>
        </Box>
    </Box>
}

export default EditProfile;