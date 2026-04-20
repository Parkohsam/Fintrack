import { useState } from "react";

const AUTH_KEY = "fintrack_user"

export function useAuth () {
    const [user, setUser] = useState<string | null> (() =>{
        return localStorage.getItem(AUTH_KEY);
        
    });

    function Login (name:string) {
        localStorage.setItem(AUTH_KEY,name);
        setUser(name)
    }

    function Logout() {
        localStorage.removeItem(AUTH_KEY);
        setUser(null)
    }

    return {user , Login , Logout }
}