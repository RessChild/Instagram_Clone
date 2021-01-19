export const homeInit = {
    isLoading: true, // 로딩 여부
    user: {
        email: '', // 유저 정보
        posts: [], // 팔로우 게시글 정보 (시간순)
    },
};

export const CHANGE_DATA = "CHANGE_DATA";

export const homeReduce = (state, action) => {
    switch(action.type) {
        case CHANGE_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            throw new Error("unhandled home action");
    }
};