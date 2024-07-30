"use client";
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
            <div className="text-neutral-200 text-sm flex justify-center gap-4">
                <button
                    className={`px-3 py-0.5 mt-3 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                        catergory == "all" &&
                        "shadow-sm bg-neutral-700 border-neutral-400"
                    } `}
                    onClick={() => setCategory("all")}
                >
                    All
                </button>
                <button
                    className={`px-3 py-0.5 mt-3 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                        catergory == "web" &&
                        "shadow-sm bg-neutral-700 border-neutral-400"
                    } `}
                    onClick={() => setCategory("web")}
                >
                    Web Dev
                </button>
                <button
                    className={`px-3 py-0.5 mt-3 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                        catergory == "app" &&
                        "shadow-sm bg-neutral-700 border-neutral-400"
                    } `}
                    onClick={() => setCategory("app")}
                >
                    App Dev
                </button>
                <button
                    className={`px-3 py-0.5 mt-3 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                        catergory == "ai" &&
                        "shadow-sm bg-neutral-700 border-neutral-400"
                    } `}
                    onClick={() => setCategory("ai")}
                >
                    AI
                </button>
                <button
                    className={`px-3 py-0.5 mt-3 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                        catergory == "ds" &&
                        "shadow-sm bg-neutral-700 border-neutral-400"
                    } `}
                    onClick={() => setCategory("ds")}
                >
                    Data Science
                </button>
                <button
                    className={`px-3 py-0.5 mt-3 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                        catergory == "vr" &&
                        "shadow-sm bg-neutral-700 border-neutral-400"
                    } `}
                    onClick={() => setCategory("vr")}
                >
                    VR
                </button>
                <button
                    className={`px-3 py-0.5 mt-3 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                        catergory == "other" &&
                        "shadow-sm bg-neutral-700 border-neutral-400"
                    } `}
                    onClick={() => setCategory("other")}
                >
                    Others
                </button>
            </div>

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
