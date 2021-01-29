import { Box, Button, IconButton, Input, InputAdornment } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline, IoPaperPlaneOutline, IoPersonSharp } from "react-icons/io5";
import { BsBookmarkFill, BsBookmark, BsThreeDots} from "react-icons/bs";

import IMG from "../../sources/instagram_logo.png";

const borderColor = "#c7c7c7";

// 화면 구성용 카드
const TimeCard = ({ post }) => {
    const source = axios.CancelToken.source();

    // 현재 보여주는 사진 번호
    const [ page, setPage ] = useState(0);
    const onClickLeftPage = () => setPage(page - 1);
    const onClickRightPage = () => setPage(page + 1);

    // 페이지 리로딩
    const axiosPost = () => {

    }

    // 덧글입력 기능
    const [ newComment, setNewComment ] = useState('');
    const onChangeNewComment = ({ currentTarget: { value }}) => setNewComment(value);
    const onClickAddComment = () => {
        axios.post(`/api/timeline/add-comment/${post.pid}`, { jwt: localStorage.getItem('access_token'), content: newComment }, { cancelToken: source.token })
        .then(({ data }) => {
            console.log(data);
            // post.comments.push(data);
            if(data) setNewComment('');
            else alert("오류가 발생했습니다.");
        })
        .catch( e => {
            if(axios.isCancel(e)) return;
            alert(e);
        });
    };

    // 기능 활성화 여부 ( 좋아요, 북태그 )
    const [ actived, setActived ] = useState({
        like: false,
        bookmark: false,
    })

    // 하단 버튼 ( 좋아요, 북마크 )
    const onClickIcon = ({ currentTarget: { id }}) => {
        console.log(id);
        setActived({ ...actived, [id]: !actived[id] });
    }

    const { picture, writer, comments, content } = post;
    const { email, username, id, profile_image } = writer;

    // 프로필 메뉴 클릭
    const onClickProfileMenu = () => {
        alert("버튼 클릭");
    }

    useEffect( () => {
        // console.log(post);
        return () => {
            source.cancel();
        }
    }, []);

    return (
        <Box width="100%" bgcolor="#ffffff" marginBottom="3rem"
            display="flex" flexDirection="column" border={1} borderColor={borderColor}>
            <Box id="writer-email" height="3.5rem" borderBottom={1} borderColor={borderColor}
                display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Box width="4rem" display="flex" justifyContent="center">
                    {
                        profile_image
                        ? <img src={`/api/account/html-img/${profile_image}`} alt="user-profile"
                            style={{ width: "2rem", height: "2rem", borderRadius: "1rem", border: "2px red solid" }}/>
                        : <IoPersonSharp size="2rem" color="black" style={{ borderRadius: "2rem", border: "2px red solid" }}/>
                    }
                    </Box>
                    <Link to={`/timeline/${email}`}
                        // onMouseOver="this.style.textDecorationLine='underline'"
                        // onMouseOut="this.style.textDecorationLine='none'"
                        style={{ color:"#000000", fontWeight: "600", textDecoration: "none" }}>
                        { email }
                    </Link>
                </Box>
                <IconButton onClick={onClickProfileMenu}>
                    <BsThreeDots />
                </IconButton>
            </Box>
            <Box minHeight="10rem" position="relative"
                display="flex" alignItems="center" justifyContent="center">
                <img src={`/api/timeline/html-img/${picture[page]}`} 
                        style={{ minWidth: "30%", maxWidth: "100%", minHeight: "30%", maxHeight: "35rem" }}/>

                    { // 좌측에 추가 이미지가 있을 때만 활성화
                        picture.length && 0 < page &&
                        <IconButton id="img-btn-left" onClick={onClickLeftPage}
                            style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)" }}>
                            <MdKeyboardArrowLeft />
                        </IconButton>
                    }
                    { // 우측에 추가 이미지가 있을 때만 활성화
                        page < picture.length - 1 &&
                        <IconButton id="img-btn-right" onClick={onClickRightPage}
                            style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)" }}>
                            <MdKeyboardArrowRight />
                        </IconButton>
                    }
            </Box>
            <Box padding="0.8rem" borderBottom={1} borderColor={borderColor}>
                <Box display="flex" justifyContent="space-between" marginBottom="0.3rem">
                    <Box display="flex" width="25%" alignItems="center" justifyContent="space-between">
                        { actived.like 
                            ? <AiFillHeart id="like" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                            : <AiOutlineHeart id="like" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                        }
                        <IoChatbubbleOutline size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                        <IoPaperPlaneOutline size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }}  />
                    </Box>
                    <Box>
                        { actived.bookmark 
                            ? <BsBookmarkFill id="bookmark" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} /> 
                            : <BsBookmark id="bookmark" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                        }
                    </Box>
                </Box>
                <Box fontSize="0.9rem" whiteSpace="wrap" style={{ wordBreak: "break-all" }}>
                    <Link style={{ display: "inline", fontWeight: "600", marginRight: "0.5rem", textDecoration: "none" }}>{ email }</Link>
                    { content }
                </Box>
                <Box>
                { comments && comments.length > 0 && <Box fontSize="0.8rem" color="#aaaaaa" marginTop="0.2rem" marginBottom="0.2rem">댓글 {comments.length}개 모두보기</Box> }
                { comments.map( ({ content, writer }, idx) =>
                    <Box key={`comment-${idx}`} fontSize="0.9rem">
                        <Link style={{ display: "inline", fontWeight: "600", marginRight: "0.5rem", textDecoration: "none" }}>{ writer.email }</Link>
                        { content }
                    </Box>
                )}
                </Box>
            </Box>
            <Box height="3rem">
                <Input style={{ width: "100%", height: "100%", padding: "0 0.8rem" }}
                    name="newComment" value={newComment} onChange={onChangeNewComment}
                    disableUnderline={true} placeholder="댓글 달기..."
                    endAdornment={
                        <InputAdornment position="end">
                        <Button disabled={!newComment} onClick={onClickAddComment}
                            style={{ color: !newComment ? "#99ccff" : "blue", fontWeight: "600" }}>게시</Button>
                        </InputAdornment>
                    } />
            </Box>
        </Box>
    )
}

export default TimeCard;