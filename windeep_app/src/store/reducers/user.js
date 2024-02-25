const initialUser = {
    isUserLoggedIn: false,
    isAdmin : false,
    member_id:0
}

const loggedInUserReducer = (state = initialUser, action) => {
    // debugger
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, ...action.payload, isUserLoggedIn: true };
        case "USER_LOGOUT":
            return initialUser;     
        default: return state;
    }
};

export default loggedInUserReducer;