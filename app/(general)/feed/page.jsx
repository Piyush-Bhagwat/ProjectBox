"use client";
import { IMAGES } from "@/assets/assets";
import CategorySelect from "@/components/CategorySelect";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import { projectContext } from "@/context/projectContext";
import Image from "next/image";
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
                    return <ProjectCard key={item.id} project={item} id={item.id} />;
                })}
            </>
        );
    };

    return (
        <div>
            <CategorySelect catergory={catergory} setCategory={setCategory} />

            {!loading ? (
                feed.length == 0 ? (
                    <div className=" mt-3 h-[60vh] gap-10 flex flex-col justify-center items-center w-full ">
                        <h1 className="text-white text-3xl">Nothing here 😔</h1>
                        <Image src={IMAGES.notFound} />
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
