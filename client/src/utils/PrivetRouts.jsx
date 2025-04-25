import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../contexts/auth'

const PrivetRouts = () => {
        const {user} = useAuth() 
        return user ? <Outlet /> : <Navigate to="/login" />
}


export default PrivetRouts
