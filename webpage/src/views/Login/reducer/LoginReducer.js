export const LoginInit = {
    isLoading: '',
    identify: {
        email: '',
        password: '',
    },
    error: '',
}

export const CHANGE_DATA = "CHANGE_DATA";

export const LoginReduce = (state, action) => {
    switch (action.type) {
        case CHANGE_DATA:            
            return {
                ...state,
                ...action.data,
            };
        default:
            throw new Error('unhandled login action');
    }
}