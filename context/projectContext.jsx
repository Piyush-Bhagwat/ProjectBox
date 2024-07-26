"use client";
import { loginWithGoogle } from "@/firebase/firbase.auth";
import { createUser, userExistEmail } from "@/firebase/firebase.db";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

export const projectContext = createContext(null);

const ProjectContext = ({ children }) => {

    const [project, setProject] = useState(null);

    const [user, setUser] = useState(null);
    const [toSignup, setToSigUp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem("user"));
        if (res) setUser(res);
    }, []);

    const login = async () => {
        const res = await loginWithGoogle();
        console.log(res);
        const data = {
            email: res.email,
            photoURL: res.photoURL,
            uid: res.uid,
            name: res.displayName,
        };
        setUser(data);

        const doesExist = await userExistEmail(res.email);

        if (!doesExist) {
            setToSigUp(true);
        } else {
            router.push("/feed");
        }

        localStorage.setItem("user", JSON.stringify(res));
    };

    const signUp = async (usr, pass) => {
        const data = {
            username: usr,
            password: pass,
            ...user,
        };
        console.log("data", data);
        await createUser(data);
        setToSigUp(false);
        router.push("/feed");
    };

    const val = {
        user,
        toSignup,
        setUser,
        login,
        signUp,
    };
    return (
        <projectContext.Provider value={{val ,project, setProject} }>
            {children}
        </projectContext.Provider>
    );
};

export default ProjectContext;
