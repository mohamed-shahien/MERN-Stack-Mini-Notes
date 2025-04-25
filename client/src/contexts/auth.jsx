import { createContext, useState, useContext, useEffect } from 'react'
import {toast } from 'react-toastify';

const AuthContext = createContext()
const Authprovider = ({ children }) => {

        const [user, setUser] = useState(localStorage.getItem("token") || null);
        useEffect(() => {
                const token = localStorage.getItem("token");
                if (token) {
                        setUser(token);
                }
        }, [])

        const loginUser = async (userData) => { 
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                });
                const data = await response.json();
                console.log(data);
                if (data.success) {
                        setUser(data.token);
                        toast.success("user login successfully!");
                        localStorage.setItem("token", data.token);

                } else if (!data.success) {
                        toast.error(data.message);
                }
        }
        const registerUser = async (userData) => {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`, {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                });
                const data = await response.json();
                if (data.success) {
                        setUser(data.token);
                        toast.success("welcome to the app!");
                        localStorage.setItem("token", data.token);


                } else if (!data.success) {
                        toast.error(data.message);
                }



        }
        const logoutUser = async () => { 
                setUser(null);
                localStorage.removeItem("token");
                toast.success("user logout successfully!");
        }
        const contextData = {
                user,
                loginUser,
                registerUser,
                logoutUser
        }
        return (
                <AuthContext.Provider value={contextData}>
                        {children}
                </AuthContext.Provider>
        )

}
export const useAuth = () => useContext(AuthContext);


export default Authprovider
