import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../contexts/auth'

const PrivetRouts = () => {
        const {user} = useAuth() // Replace with your authentication logic
        return user ? <Outlet /> : <Navigate to="/login" />
}


export default PrivetRouts
