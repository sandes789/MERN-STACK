import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './type'
import axios from 'axios'
import { returnErrors } from './ErrorAction'

//Logout
export const logout =() => async dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

//Login
export const login = ({ email, password }) => async dispatch => {
    // Header
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
 
    // Request Body
    const body = JSON.stringify({email, password})
 
     const res = await axios.post('/api/auth', body, config)
     .then (
         res => dispatch({
             type:LOGIN_SUCCESS,
             payload:res.data
         })
      ) 
      .catch(err => {
         dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
 
         dispatch({
             type:'LOGIN_FAIL',
         })
     })
 }

//Register
export const register = ({ name, email, password }) => async dispatch => {
   // Header
   const config = {
       headers: {
           'Content-Type' : 'application/json'
       }
   }

   // Request Body
   const body = JSON.stringify({name, email, password})

    const res = await axios.post('/api/users', body, config)
    .then (
        res => dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
     ) 
     .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))

        dispatch({
            type:'REGISTER_FAIL',
        })
    })
}

// Check token & load user INCASE OF LOGIN
export const loadUser = () => async (dispatch, getState) => {
    // User loading
    dispatch({
        type: USER_LOADING
    })

    axios.get('api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type:AUTH_ERROR,
        })
    })
}

// Setup config.Header token
export const tokenConfig = getState => {
        //Get token from localStorage
        const token = getState().Auths.token;

        //Header
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
    
        //If token then add to header
        if(token){
            config.headers['x-auth-token'] = token
        }
        return config
}
