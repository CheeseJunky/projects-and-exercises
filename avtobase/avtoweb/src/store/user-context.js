import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { fetchCurrentUser, logoutUser, setAuthToken } from "../util/http";

// role -> normal = 0, admin = 1
export const GUEST_USER = { username: 'guest', role: 0 };

const TOKEN_KEY = 'avtoweb.token';

// sessionStorage throws in some privacy modes, so every access is guarded.
function readStoredToken() {
    try {
        return sessionStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

function writeStoredToken(token) {
    try {
        if (token) {
            sessionStorage.setItem(TOKEN_KEY, token);
        } else {
            sessionStorage.removeItem(TOKEN_KEY);
        }
    } catch {
        /* not fatal - the session just will not survive a reload */
    }
}

export const UserContext = createContext({
    user: GUEST_USER,
    isLoggedIn: false,
    isAdmin: false,
    isRestoring: false,
    setUser: (user) => { },
    logout: () => { },
});

function UserContextProvider({ children }) {
    const [userData, setUserData] = useState(GUEST_USER);
    const [isRestoring, setIsRestoring] = useState(Boolean(readStoredToken()));

    // The token authorises every admin request, so it is handed to the http
    // layer as soon as it is known - including on a page reload.
    const setUser = useCallback((newUser) => {
        if (!newUser) {
            setAuthToken(null);
            writeStoredToken(null);
            setUserData(GUEST_USER);
            return;
        }
        if (newUser.token) {
            setAuthToken(newUser.token);
            writeStoredToken(newUser.token);
        }
        setUserData(newUser);
    }, []);

    const logout = useCallback(() => {
        logoutUser();
        setAuthToken(null);
        writeStoredToken(null);
        setUserData(GUEST_USER);
    }, []);

    // Restore a session after a refresh; the server decides if it is still valid.
    useEffect(() => {
        const token = readStoredToken();
        if (!token) {
            return;
        }

        let cancelled = false;
        setAuthToken(token);

        (async () => {
            const user = await fetchCurrentUser();
            if (cancelled) {
                return;
            }
            if (user) {
                setUserData({ ...user, token });
            } else {
                setAuthToken(null);
                writeStoredToken(null);
            }
            setIsRestoring(false);
        })();

        return () => { cancelled = true; };
    }, []);

    const value = useMemo(() => ({
        user: userData,
        isLoggedIn: userData.username !== GUEST_USER.username,
        isAdmin: userData.role === 1,
        isRestoring,
        setUser,
        logout,
    }), [userData, isRestoring, setUser, logout]);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;
