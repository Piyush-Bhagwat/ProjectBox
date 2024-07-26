"use client";
import { loginWithGoogle } from "@/firebase/firbase.auth";
import {
    createUser,
    getAllPosts,
    getbox,
    getUser,
    userExistEmail,
} from "@/firebase/firebase.db";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

export const projectContext = createContext(null);

const ProjectContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [feed, setFeed] = useState(null);
    const [toSignup, setToSigUp] = useState(false);
    const [box, setBox] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            console.log("getting login info...");
            let res = JSON.parse(localStorage.getItem("user"));
            res = await getUser(res.email);
            if (res) {
                setUser(res);
                console.log("found user");
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllPosts();
            console.log("feed", data);
            setFeed(data);
        }

        fetchData();
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
        feed,
        setUser,
        login,
        signUp,
    };

    return (
        <projectContext.Provider value={val}>
            {children}
        </projectContext.Provider>
    );
};

export default ProjectContext;
