"use client";
import CategorySelect from "@/components/CategorySelect";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import { projectContext } from "@/context/projectContext";
import React, { useContext, useEffect, useState } from "react";
import { Rings, RotatingSquare } from "react-loader-spinner";

const FeedPage = () => {
    const { user, feed, fetchFeed } = useContext(projectContext);
    const [loading, setLoading] = useState(true);
    const [catergory, setCategory] = useState("all");

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            await fetchFeed(catergory);
            setLoading(false);
        }

        fetch();
    }, [catergory]);

    const renderCards = () => {
        return (
            <>
                {feed?.map((item) => {
                    return <ProjectCard project={item} id={item.id} />;
                })}
            </>
        );
    };

    return (
        <div>
            <CategorySelect catergory={catergory} setCategory={setCategory}/>

            {!loading ? (
                feed.length == 0 ? (
                    <div className="h-[50vh] flex justify-center items-center w-full text-white text-3xl">
                        Nothing here 😔
                    </div>
                ) : (
                    <div className="p-3 md:p-6 grid grid-col-1 md:grid-cols-4 gap-3 md:gap-5">
                        {renderCards()}
                    </div>
                )
            ) : (
                <Skeleton />
            )}
        </div>
    );
};

export default FeedPage;
