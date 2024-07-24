"use client";
import { loginWithGoogle } from "@/firebase/firbase.auth";
import React, { createContext, useEffect, useState } from "react";

export const projectContext = createContext(null);

const ProjectContext = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem("user"));
        if (res) setUser(res);
    }, []);

    const login = async () => {
        const res = await loginWithGoogle();
        console.log(res);
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
    };

    const val = {
        user,
        setUser,
        login,
    };
    return (
        <projectContext.Provider value={val}>
            {children}
        </projectContext.Provider>
    );
};

export default ProjectContext;
