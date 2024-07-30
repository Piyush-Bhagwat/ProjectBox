import React from "react";
import ProjectCard from "../ProjectCard";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa6";

const BoxPageCompo = ({ user, pageUser, box }) => {
    const renderCards = () => {
        return (
            <>
                {box?.map((item) => {
                    return <ProjectCard project={item} id={item.id} />;
                })}
            </>
        );
    };

    return (
        <div className="p-5 min-h-[60vh] w-full flex flex-col items-center">
            <div className="mt-3 flex flex-col items-center w-full">
                <div className="flex items-center relative">
                    <p className="text-neutral-200 absolute -left-1/3 -translate-x-full">{box.length} projects made</p>
                    <Image
                        src={pageUser.photoURL}
                        width={264}
                        height={264}
                        className="rounded-full border-[12px] border-dashed border-neutral-800"
                    />
                    <p className="text-neutral-200 absolute -right-1/3 translate-x-full">{pageUser.title && pageUser.title} hi</p>
                </div>
                <div className="mt-5">
                    <h1 className="text-5xl text-neutral-200">
                        {pageUser.name}
                    </h1>

                    <div className="text-neutral-400 flex items-center gap-2">
                        <p className="mt-2">@{pageUser.username}</p>
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(pageUser.username)
                            }
                            className="mt-1"
                        >
                            <FaRegCopy />
                        </button>
                    </div>
                </div>
            </div>

            {box && (
                <div className="mt-6 grid grid-col-1 md:grid-cols-4 gap-3 md:gap-5">
                    {renderCards()}
                </div>
            )}
        </div>
    );
};

export default BoxPageCompo;
