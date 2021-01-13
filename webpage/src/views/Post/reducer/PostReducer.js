export const PostInit = {
    isLoading: true,
    page: 0,
    post : {
        writedAt: '',
        pinture: [],
        content: '',
        comments: [],
        writer: {},
    }
}

export const CHANGE_DATA = "CHANGE_DATA";

export const PostReduce = (state, action) => {
    switch (action.type) {
        case CHANGE_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            break;
    }
}
