import { useContext } from "react";
import AuthContext from "./authcontext";

export const useAuth = () => {
    return useContext(AuthContext);
};