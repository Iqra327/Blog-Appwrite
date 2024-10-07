import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState('');

  const login = async(data) => {
    setError('');
    try {
      const session = await authService.login(data)
      if(session){
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(authLogin(userData))
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
        <h2>Sign in to your account</h2>
        {
          error && <p>{error}</p>
        }
        <form onSubmit={handleSubmit(login)}>
          <div>
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
              type = 'password'
              placeHolder = 'Enter your password' 
              {...register('password', {
                required: true
              })}
            />
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login