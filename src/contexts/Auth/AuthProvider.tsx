import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    var [user, setUser] = useState<User | null>(null);
    var api = useApi();

    useEffect(() => {
        validateToken();
    }, []); // ERA [api] MAS PASSAR A API NESTE CAMPO ESTAVA GERANDO LOOPING

    const validateToken = async () => {
        const storageData = localStorage.getItem('authToken');
        if (storageData) {
            const data = await api.validateToken(storageData);
            if (data.user) {
                setUser(data.user);
            }
        }
        
    }

    const signin = async (email: string, password: string) => {
        var data = await api.signin(email, password);
        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('authToken', data.token);

            return true;
        }
        return false;
    }

    const signout = async () => {
        setUser(null);
        setToken('');
        localStorage.setItem('authToken', '');
        await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}