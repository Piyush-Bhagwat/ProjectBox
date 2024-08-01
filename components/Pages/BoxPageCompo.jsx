import React from "react";
import ProjectCard from "../ProjectCard";
import Image from "next/image";
import { FaGithub, FaRegCopy, FaTwitter, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const BoxPageCompo = ({ user, pageUser, box }) => {
    const renderCards = () => {
        return (
            <>
                {box?.map((item) => {
                    return (
                        <ProjectCard
                            key={item.id}
                            project={item}
                            id={item.id}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <div className="p-5 min-h-[60vh] w-full flex flex-col items-center">
            <div className="mt-3 flex flex-col items-center w-full">
                <div className="flex flex-col md:flex-row items-center relative">
                    <p className="text-neutral-200 hidden md:block md:absolute md:-left-1/3 -translate-x-full">
                        {box.length} projects made
                    </p>
                    <Image
                        src={pageUser.photoURL}
                        width={264}
                        height={264}
                        className="rounded-full w-[264px] aspect-square object-cover border-[12px] border-dashed border-neutral-800"
                    />
                    <p className="text-neutral-200 mt-3 md:mt-0 md:absolute md:-right-1/3 md:translate-x-full">
                        {pageUser.title && `I am a ${pageUser.title}`}
                    </p>
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

            <div className="text-neutral-200 flex gap-3 justify-center mt-5">
                {pageUser.github && (
                    <a
                        className="bg-neutral-700 p-3 block rounded-full text-4xl shadow-md hover:bg-neutral-800 hover:text-neutral-300"
                        href={pageUser.github}
                    >
                        <FaGithub />
                    </a>
                )}
                {pageUser.linkedIn && (
                    <a
                        className="bg-neutral-700 p-3 block rounded-full text-4xl shadow-md hover:bg-neutral-800 hover:text-neutral-300"
                        href={pageUser.linkedIn}
                    >
                        <FaLinkedin />
                    </a>
                )}
                {pageUser.twitter && (
                    <a
                        className="bg-neutral-700 p-3 block rounded-full text-4xl shadow-md hover:bg-neutral-800 hover:text-neutral-300"
                        href={pageUser.twitter}
                    >
                        <FaXTwitter />
                    </a>
                )}
            </div>

            <div className="mt-5 w-full md:w-3/4">
                <p className="text-neutral-200">{pageUser.about}</p>
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
