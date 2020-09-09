import { combineReducers } from 'redux'
import Items from './ItemReducer' 
import Errors from './ErrorReducer' 
import Auths from './AuthReducer' 

export default combineReducers({
    Items,
    Errors,
    Auths
})