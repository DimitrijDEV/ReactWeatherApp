
export const login = (id, username, password) => ({
    type: 'LOGIN_REQUEST',
    id,
    username,
    password
})

export const logout = () => ({
    type: 'LOGOUT',
})

export const writeCities = (cities) => ({
    type: 'WRITE_CITIES',
    cities
})

export const removeCities = () => ({
    type: 'REMOVE_CITIES'
})

export const getUserCities = (cities) => ({
    type: 'GET_USER_CITIES',
    cities
})


