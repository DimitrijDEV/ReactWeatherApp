import { combineReducers } from 'redux'
import authentication from './authentication'
import citiesApi from './cities-api'
import citiesUser from './cities-user'


export default combineReducers({
  authentication,
  citiesApi,
  citiesUser
})