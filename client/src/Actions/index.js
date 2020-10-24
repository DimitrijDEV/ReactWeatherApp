
export const login = (id, username) => ({
    type: 'LOGIN_REQUEST',
    id,
    username
})

export const logout = () => ({
    type: 'LOGOUT',
})