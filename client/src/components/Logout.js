import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/actions/AuthAction'
import { clearErrors } from '../Redux/actions/ErrorAction'


const Logout = () => {
    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        dispatch(logout())
        dispatch(clearErrors())
    }
    return (
        <div className="logout">
            <p onClick={logoutHandler}>Logout</p>
        </div>
    )
}

export default Logout
