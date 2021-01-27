export const RegisterInit = {
    isLoading: '',
    identify: {
        email: '',
        username: '',
        password: '',
        password_again: '',
    },
    error: '',
}

export const CHANGE_DATA = "CHANGE_DATA";

export const RegisterReduce = (state, action) => {
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