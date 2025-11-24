// src/App.js
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/login'
import { Home } from './components/home'
import { Navigation } from './components/navigation'
import { Logout } from './components/logout'

function App() {
  const [msg, setMsg] = useState('')
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('access_token') !== null,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          // Protected endpoint with token
          const res = await axios.get('http://127.0.0.1:8000/api/home/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          })
          setMsg(res.data.message)
        } else {
          // Public endpoint
          const res = await axios.get('http://127.0.0.1:8000/api/hello/')
          setMsg(res.data.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [isAuth])

  return (
    <BrowserRouter>
      <Navigation isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home msg={msg} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
