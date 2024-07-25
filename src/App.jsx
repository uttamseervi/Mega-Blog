import { React, useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components/index"
/*
important notes:
1. to declare the environment variables in react@vite we use the the prefix VITE_VARIABLE_NAME
1. to declare the environment variables in react@react-app we use the the prefix REACT_APP_VARIABLE_NAME
some thing applies to access the env variables also 
in vite@latest
console.log(import.meta.env.VITE_APPWRITE_URL)
in react-app
console.log(process.env.REACT_APP_APPWRITE_URL)
*/
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-rose-50'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
