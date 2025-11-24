// Code accreditation: https://medium.com/@ronakchitlangya1997/jwt-authentication-with-react-js-and-django-c034aae1e60d
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../interceptor/axios'

export const Logout = ({ setIsAuth }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const doLogout = async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          await axiosInstance.post('/api/logout/', {
            refresh_token: refreshToken,
          })
        }
      } catch (err) {
        console.error('Logout error:', err)
      }

      // Clear tokens locally
      localStorage.clear()
      axiosInstance.defaults.headers['Authorization'] = null
      setIsAuth(false)

      // Redirect to login
      navigate('/login')
    }

    doLogout()
  }, [navigate, setIsAuth])

  return <div>Logging out...</div>
}
