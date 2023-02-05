
import { useContext } from "react";
import { Loading } from "../../pages/Loading/Loading";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <Login />;
    }

    return children;
}