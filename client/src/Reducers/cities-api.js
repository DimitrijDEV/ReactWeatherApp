 
const citiesApi = (state = [], action) => {
    switch (action.type) {
        case 'WRITE_CITIES':
            return (
                action.cities
            )
        case 'REMOVE_CITIES':
            return (
                []
            )
        default:
            return state
    }
}

export default citiesApi