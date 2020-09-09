import {
    GET_ITEMS,
    POST_ITEMS,
    DEL_ITEMS,
    ITEMS_LOADING
} from './type'
import axios from 'axios'
import { tokenConfig } from './AuthAction'
import { returnErrors } from './ErrorAction'

export const getAPI = () => async dispatch => {
    dispatch(itemLoading())
    const url = `/api/items`
    const res = await axios.get(url)
    .then( res =>
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    )
    .catch( err => 
        dispatch(
            returnErrors(err.response.data, err.response.status)
        )
    )
}

export const itemLoading = () => async dispatch => {
    dispatch({
        type:ITEMS_LOADING
    })
}

export const postItem = (name) => async (dispatch, getState) => {
    axios.post(`/api/items`, name, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: POST_ITEMS,
                payload: res.data
            })
        )
        .catch( err => 
            dispatch(
                returnErrors(err.response.data, err.response.status)
            )
        )
}

export const delItem = (id) => async (dispatch, getState) => {
    axios.delete(`/api/items/${id}` , tokenConfig(getState))
    .then(res =>
        dispatch({
            type: DEL_ITEMS,
            payload: id
        })
    )
    .catch( err => 
        dispatch(
            returnErrors(err.response.data, err.response.status)
        )
    )
}