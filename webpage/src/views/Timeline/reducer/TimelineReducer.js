export const TimelineInit = {
    isLoading: true,
    login: '',
    user: {
        email: '',
        username: '',
        count: {
            post: 0, // 총 게시글
            follower: 0, // 팔로워
            following: 0, // 팔로우
        }
    },
    posts: [], // 포스터 리스트
}

export const CHANGE_DATA = "CHANGE_DATA";

export const TimelineReduce = (state, action) => {
    switch(action.type) {
        case CHANGE_DATA:
            return { ...state, ...action.data };
        default:
            throw new Error("Unhandled timeline action");
    }
}