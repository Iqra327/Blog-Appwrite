import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const {register, handleSubmit} = useForm();

  const create = async (data) => {
    setError('')
    try {
      const userData = await authService.createAccount(data)
      if(userData){
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(login(userData))
          navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  } 
  return (
    <div>
      <div>
        <div>
          <Logo />
        </div>
        {error && <p>{error}</p> }
        <form onSubmit={handleSubmit(create)}>
          <div>
            <Input
              label = 'Full Name:'
              placeHolder = 'Enter your full name'
              {...register('name', {
                required: true,
              })}
            />
             <Input
               label= 'Email: '
               placeHolder = 'Enter your email'
               type = 'email'
               {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Enter valid email address.'
                }
               })}
            />
            <Input
              label = 'Password'
              placeHolder = 'Enter your password'
              type = 'password'
              {...register('password'), {
                required: true
              }} 
            />
            <Button type='onSubmit'>Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup