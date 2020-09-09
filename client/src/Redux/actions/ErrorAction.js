import {
    GET_ERRORS,
    CLEAR_ERRORS
} from './type'

//Return errors 
export const returnErrors = (msg, status, id = null) => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload:{ msg, status, id }
    })
}

//Clear Errors
export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}