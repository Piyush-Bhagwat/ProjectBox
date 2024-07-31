"use client";
import { loginWithGoogle } from "@/firebase/firbase.auth";
import {
    createUser,
    getAllPosts,
    getbox,
    getUser,
    userExistEmail,
    getUserProjects,
    getAllPostsByCategory,
} from "@/firebase/firebase.db";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState, useContext } from "react";

export const projectContext = createContext(null);

export const useProjects = () => useContext(projectContext);

const ProjectContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [feed, setFeed] = useState(null);
    const [toSignup, setToSigUp] = useState(false);
    const [box, setBox] = useState(null);
    const [projects, setProjects] = useState([]);
    const [profileImage, setProfileImage] = useState(null);

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

    const fetchFeed = async (category) => {
        let data = [];
        if (category === "all") {
            data = await getAllPosts();
        } else {
            data = await getAllPostsByCategory(category);
        }
        setFeed(data);
    };

    useEffect(() => {
        async function fetchData() {
            if (!user) return;
            const boxData = await getbox(user.username);
            if (boxData) {
                setBox(boxData);
            }

            const userProjects = await getUserProjects(user.email); // replace with your function to get projects
            setProjects(userProjects);
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
            lowerUsername: usr.toLowerCase(),
            ...user,
        };
        console.log("data", data);
        await createUser(data);
        const dbUser = await getUser(data.email);
        setUser(dbUser);
        setToSigUp(false);
        router.push("/feed");
    };

    const updateUserFeild = (feild, value) => {
        setUser((p) => {
            return { ...p, [feild]: value };
        });
    };

    const val = {
        user,
        toSignup,
        box,
        feed,
        projects,
        profileImage,
        setProfileImage,
        setUser,
        login,
        signUp,
        fetchFeed,
        updateUserFeild,
    };

    return (
        <projectContext.Provider value={val}>
            {children}
        </projectContext.Provider>
    );
};

export default ProjectContext;
