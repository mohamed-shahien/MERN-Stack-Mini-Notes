import { createContext ,useState, useContext, useEffect } from 'react'

const AuthContext = createContext()
const Authprovider = ({children}) => {

        const [user, setUser] = useState(null);

        const loginUser = async (userform) => {}
        const registerUser = async (userform) => {}
        const logoutUser = async () => {}
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
