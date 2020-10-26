let initialState = {
    id: "",
    username: "",
    password: "",
    logged: false
}

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return (
                {
                    id: action.id,
                    username: action.username,
                    password: action.password,
                    logged: true
                }
            )


        case 'LOGOUT':
            return(
                {
                    id: "",
                    username: "",
                    password: "",
                    logged: false
                }
            )
        default:
            return state
    }
}

export default authentication