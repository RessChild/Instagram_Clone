export const homeInit = {
    isLoading: false, // 로딩 여부
    identify: {
        email: '',
        password: '',
    },
    error: '',
    user: {
        email: '', // 유저 정보
        posts: [], // 팔로우 게시글 정보 (시간순)
    },
};

export const CHANGE_DATA = "CHANGE_DATA";
export const CHANGE_DATA_STRUCT = "CHANGE_DATA_STRUCT";

export const homeReduce = (state, action) => {
    switch(action.type) {
        case CHANGE_DATA:
            return {
                ...state,
                ...action.data,
            };
        case CHANGE_DATA_STRUCT: 
            return {
                ...state,
                [action.target]: {
                    ...state[action.target],
                    ...action.data,
                }
            };
        default:
            throw new Error("unhandled home action");
    }
};