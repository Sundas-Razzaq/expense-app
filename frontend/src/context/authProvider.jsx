import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";

import { getCurrentUser } from "../api/authAPI";
import {
    clearAuthSession,
    getStoredToken,
    resolveErrorMessage,
} from "../utils/helpers";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            if (!getStoredToken()) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await getCurrentUser();
                setUser(data.user);
            } catch (error) {
                clearAuthSession();
                setError(resolveErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;