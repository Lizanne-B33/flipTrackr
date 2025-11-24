// Code accreditation: https://medium.com/@ronakchitlangya1997/jwt-authentication-with-react-js-and-django-c034aae1e60

// src/components/Login.js
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../interceptor/axios'

export const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // ✅ Reset form fields whenever Login mounts
  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axiosInstance.post('/api/token/', {
        username,
        password,
      })

      localStorage.clear()
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.access}`

      setIsAuth(true)

      // Clear after successful login too
      setUsername('')
      setPassword('')

      navigate('/')
    } catch (err) {
      console.error('Login failed:', err)
      alert('Invalid credentials or server error')
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5 vh-100">
      <div
        className="card p-4"
        style={{ maxHeight: '400px', maxWidth: '400px', width: '100%' }}
      >
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Username"
                name="username"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
