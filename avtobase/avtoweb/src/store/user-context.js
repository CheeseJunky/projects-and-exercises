import { createContext, useState } from "react";

export const UserContext = createContext({
    user: {},
    setUser: (user) => { },
});

function UserContextProvider({ children }) {
    const [userData, setUserData] = useState({
        username: "guest",
        role: 0,
    });

    function setUser(newUser) {
        setUserData(newUser);
    }

    const value = {
        user: userData,
        setUser: setUser,
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;