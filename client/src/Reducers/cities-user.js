

const citiesUser = (state = [], action) => {
    switch (action.type) {

        case 'GET_USER_CITIES':
            return (
                action.cities
            )

        default:
            return state
    }
}

export default citiesUser