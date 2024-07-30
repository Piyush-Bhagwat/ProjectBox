"use client";
import BoxPageCompo from "@/components/Pages/BoxPageCompo";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import { projectContext } from "@/context/projectContext";
import { getbox, getUserByUsername } from "@/firebase/firebase.db";
import React, { useContext, useEffect, useState } from "react";

const page = ({ params }) => {
    const { user } = useContext(projectContext);

    const [box, setBox] = useState(null);
    const [pageUser, setPageUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const boxData = await getbox(params.username);
        const userData = await getUserByUsername(params.username);

        setBox(boxData.slice(0, 4));
        setPageUser(userData);
        setLoading(false);
    };

    //load the data
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    {pageUser ? (
                        <BoxPageCompo box={box} pageUser={pageUser} user={user}/>
                    ) : (
                        <h1>No User Found 💀</h1>
                    )}
                </>
            )}
        </>
    );
};

export default page;
