"use client";
import { loginWithGoogle } from "@/firebase/firbase.auth";
import { createUser, getbox, getUser, userExistEmail } from "@/firebase/firebase.db";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

export const projectContext = createContext(null);

const ProjectContext = ({ children }) => {

    const [project, setProject] = useState(null);

    const [user, setUser] = useState(null);
    const [toSignup, setToSigUp] = useState(false);
    const [box, getBox] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            let res = JSON.parse(localStorage.getItem("user"));
            res = await getUser(res.email);
            if (res) setUser(res);
        }

        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = await getbox(user?.username);
            getBox(data);
        }

        fetchData();
    }, [user]);

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

        const dbUser = await getUser(data.email);
        setUser(dbUser);
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
        const dbUser = await getUser(data.email);
        setUser(dbUser);
        setToSigUp(false);
        router.push("/feed");
    };

    const val = {
        user,
        toSignup,
        box,
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
