import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../Redux/actions/AuthAction'
import { clearErrors } from '../Redux/actions/ErrorAction'
import { useEffect } from 'react';
import SelectInput from '@material-ui/core/Select/SelectInput';

const Register = () => {

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const errors = useSelector(state => state.Errors)
    const [message, setMessage] = useState('')
    useEffect(() => {
        if (errors.id === 'REGISTER_FAIL') {
            setMessage({
                message: errors.msg.msg
            })
        } else {
            setMessage({
                message: ''
            })
        }

    }, [errors])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(input))
        setInput({
            name:'',
            email:'',
            password:''
        })
    }

    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        //dispatch(clearErrors())
    }

    return (
        <div>
            {message ? (<p>{message.message}</p>) : (<p>Yes you are on the way to register</p>)}
            <Box mx="auto" m={2}>
                <form onSubmit={submitHandler}>
                    <input type="text" name="name" placeholder="Name" value={input.name} onChange={changeHandler} />
                    <input type="text" name="email" placeholder="Email" value={input.email} onChange={changeHandler} />
                    <input type="text" name="password" placeholder="Password" value={input.password} onChange={changeHandler} />
                    <input type="submit" value="Register" />
                </form>
            </Box>
        </div>
    )
}

export default Register
