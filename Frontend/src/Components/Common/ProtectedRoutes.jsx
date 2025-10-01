import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
    const isLoggedin = localStorage.getItem('isLoggedin')
    return isLoggedin == 'true' ? <Outlet /> : <Navigate to={'/signIn'} replace />
}

export default ProtectedRoutes