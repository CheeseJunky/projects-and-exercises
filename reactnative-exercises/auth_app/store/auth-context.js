import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    isAuth: false,
    authenticate: (token) => { },
    logout: () => { }
});

function AuthContextProvider({ children }) {
    const [token, setToken] = useState();

    function authenticate(token) {
        setToken(token);
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: token,
        isAuth: !!token,
        authenticate: authenticate,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;