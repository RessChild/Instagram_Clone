import React from "react";

const TopBar = () => {
    const source = axios.CancelToken.source();

    const { email } = match.params; // 주소로 넘어오는 정보 ( /:email )
    const [ state, dispatch ] = useReducer(TimelineReduce, TimelineInit);
    const { login, user, posts, isLoading } = state;
    // const { email, username, count } = user;

    const axiosTimeline = () => {
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post(`/api/timeline/profile/${email}`, { jwt: localStorage.getItem('access_token') }, { cancelToken: source.token })
            .then( ({ data: { login, timeline } }) => {
                if( !timeline ) return console.log(`can't find user`);
        
                // console.log(login, timeline );
                const { posts, ...others } = timeline;
                // 데이터 세팅
                dispatch({ type: CHANGE_DATA,
                    data: {
                        isLoading: false,
                        login: login || '',
                        user: others,
                        posts: posts || [],
                    }
                })
            })
            .catch( e => { if( !axios.isCancel(e) ) console.log(e); });
    }

    useEffect(() => {
        axiosTimeline();
        return () => {
            source.cancel();
        }
    }, [])

    // 다이얼로그 창
    const [ dialog, setDialog ] = useState('');
    const onCloseDialog = () => setDialog(''); // 창 닫기
    const onCloseDialogWithReload = () => {
        axiosTimeline(); // 리스트 갱신
        setDialog(''); // 창 닫기
    }

    // 포스트 상세보기
    const onClickPost = ({ currentTarget: { id }}) => {
        setDialog(id);
    }

    // 새 포스트 등록 기능
    const onClickWritePost = ({ currentTarget: { id }}) => {
        setDialog(id);
    };

    // 팔로우 옵션
    const onClickFollow = () => {
        axios.post('/api/follow', { jwt: localStorage.getItem('access_token'), following: email, type: !user.onFollow }, { cancelToken: source.token })
            .then(({data}) => {
                // console.log(data);
                dispatch({ type: CHANGE_DATA_STRUCT, target: "user", data: { onFollow: !user.onFollow }})
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                alert(e);
            })
    }

    return (
        isLoading
        ? <Loading /> 
        :
        <Box bgcolor="#f7f7f7" height="100vh" overflow="auto">
        <Box id="timeline-header" bgcolor="#ffffff"
            position="fixed" top="0" height="4rem" width="100vw" 
            borderBottom={1} borderColor={borderColor}>
            <Box display="flex" width="100vw" maxWidth={maxWidth} margin="auto" height="4rem"
                alignItems="center" justifyContent="space-between">
                <Box id="timeline-header-logo">
                    <img title="instagram-logo" src={Logo} style={{ height: "8rem", width: "auto" }} />
                </Box>
                <Box id="timeline-header-user">{ login }</Box>
            </Box>
        </Box>
        <Box id="timeline-profile" marginTop="4rem">
        </Box>
        </Box>
    );
}

export default TopBar;