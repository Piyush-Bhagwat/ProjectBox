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
import {
    clearUser,
    getAllPostsByCategoryIDB,
    getAllProjectIDB,
    getUserIDB,
    saveProjectsToIDB,
    saveUserIDB,
} from "@/indexedDB/indexed.db";
import { checkOnlineStatus } from "@/utils/utilFuncitons";
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
    const [isOnline, setIsOnline] = useState(true);

    const updateOnlineStatus = async () => {
        const status = await checkOnlineStatus();
        setIsOnline(status);
    };

    const fetchAllProjects = async () => {
        const isOnline = await checkOnlineStatus();

        if (isOnline) {
            const data = await getAllPosts();
            console.log("Savig Projects to IDB");
            await saveProjectsToIDB(data);
        }
    };

    useEffect(() => {
        const interval = setInterval(
            async () => await updateOnlineStatus(),
            5000
        );

        return () => clearInterval(interval);
    }, []);

    const fetchFeed = async (category) => {
        const isOnline = await checkOnlineStatus();
        let data = [];

        if (category === "all") {
            data = await getAllProjectIDB();
        } else {
            data = await getAllPostsByCategoryIDB(category);
        }

        if (data.length == 0 && isOnline) {
            if (category === "all") {
                data = await getAllPosts();
            } else {
                data = await getAllPostsByCategory(category);
            }
        }

        setFeed(data);
    };

    async function fetchUser() {
        const isOnline = await checkOnlineStatus();
        console.log("getting login info...");
        let res = await getUserIDB();

        if (!res) return;

        if (isOnline) {
            res = await getUser(res?.email);
            await saveUserIDB(res);
        }

        if (res) {
            setUser(res);
            console.log("found user");
        }
    }

    useEffect(() => {
        async function fetchData() {
            await fetchAllProjects();
            await fetchUser();
        }
        fetchData();
    }, []);

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
        console.log("user Looged In with google", res);
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
        await saveUserIDB(dbUser);
    };

    const signUp = async (usr, pass) => {
        const data = {
            username: usr,
            password: pass,
            lowerUsername: usr.toLowerCase(),
            ...user,
        };
        console.log("Sighup Data", data);
        await createUser(data);
        const dbUser = await getUser(data.email);
        setUser(dbUser);
        setToSigUp(false);
        router.push("/feed");
    };

    const logout = async () => {
        await clearUser();
        router.push("/feed");
        setUser(null);
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
        isOnline,
        profileImage,
        setProfileImage,
        setUser,
        login,
        signUp,
        fetchFeed,
        updateUserFeild,
        logout,
    };

    return (
        <projectContext.Provider value={val}>
            {children}
        </projectContext.Provider>
    );
};

export default ProjectContext;
