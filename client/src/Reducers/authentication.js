let initialState = {
    id: "",
    username: "",
    logged: false
}

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return (
                {
                    id: action.id,
                    username: action.username,
                    logged: true
                }
            )


        case 'LOGOUT':
            return(
                {
                    id: "",
                    username: "",
                    logged: false
                }
            )
        default:
            return state
    }
}

export default authentication