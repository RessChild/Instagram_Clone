import React, { useState } from "react";
import axios from "axios";

import { Box } from "@material-ui/core";

import Logo from "../../sources/instagram_title.png";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./ChangePassword/ChangePassword";

const borderColor = "#aaaaaa";
const maxWidth = "50rem";

const Account = () => {
    // 메뉴 리스트 (상수)
    const menuList = [
        { title: "프로필 편집", component: <EditProfile />},
        { title: "비밀번호 변경", component: <ChangePassword /> },
    ]
    
    // 메뉴 선택 관련
    const [ hover, setHover ] = useState(-1);
    const [ select, setSelect ] = useState(0);

    const onClickMenu = ({ currentTarget: { id }}) => {
        const [ target, number ] = id.split('-');
        setSelect(parseInt(number));
    };
    const onMouseEnterMenu = ({ currentTarget: { id }}) => {
        const [ target, number ] = id.split('-');
        setHover(parseInt(number));
    };
    const onMouseLeaveMenu = () => setHover(-1);

    return <Box bgcolor="#f7f7f7" height="100vh" overflow="auto">
        <Box id="timeline-header" bgcolor="#ffffff"
            position="fixed" top="0" height="4rem" width="100vw" 
            borderBottom={1} borderColor="#aaaaaa">
            <Box display="flex" width="100vw" maxWidth={maxWidth} margin="auto" height="4rem"
                alignItems="center" justifyContent="space-between">
                <Box id="timeline-header-logo">
                    <img title="instagram-logo" src={Logo} style={{ height: "8rem", width: "auto" }} />
                </Box>
                <Box id="timeline-header-user">애옹애옹</Box>
            </Box>
        </Box>
        <Box id="timeline-profile" marginTop="6rem">
            <Box display="flex" justifyContent="space-between" border={1} borderColor="#aaaaaa"
                width="100vw" maxWidth={maxWidth} margin="auto" minHeight="80vh" bgcolor="white">
                <Box display="flex" flexDirection="column">
                    { // 메뉴 출력
                        menuList.map( ({ title }, idx) => 
                            <Box id={`menu-${idx}`} key={`menu-${idx}`} width="12rem" display="flex" alignItems="center"
                                onClick={onClickMenu} onMouseEnter={onMouseEnterMenu} onMouseLeave={onMouseLeaveMenu}
                                paddingLeft="1.6rem" paddingTop="1rem" paddingBottom="1rem"
                                bgcolor={ idx !== select && idx === hover ? "#f5f5f5" : "white" } fontWeight={ idx === select ? "700" : "500" }
                                borderLeft={2} borderColor={ idx === select ? "black" : ( idx === hover ? "#aaaaaa" : "white")}>
                                { title }
                            </Box>
                        )
                    }
                </Box>
                <Box flex="1" minHeight="100%" borderLeft={1} borderColor="#aaaaaa" padding="2rem">
                    { menuList[select].component }
                </Box>
            </Box>
        </Box>
    </Box>
}

export default Account;