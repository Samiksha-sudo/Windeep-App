const initialUser = {
    isUserLoggedIn: false,
    isAdmin : false
}

const loggedInUserReducer = (state = initialUser, action) => {
    // debugger
    switch (action.type) {
        case "USER_LOGIN":
            return {...initialUser,isUserLoggedIn:true,...action.payload};
        case "USER_LOGOUT":
            return initialUser;     
        default: return state;
    }
};

export default loggedInUserReducer;