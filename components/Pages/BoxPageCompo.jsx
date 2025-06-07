import React from "react";
import ProjectCard from "../ProjectCard";
import Image from "next/image";
import { FaGithub, FaRegCopy, FaTwitter, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Button from "../ui/Button";

const BoxPageCompo = ({ user, pageUser, box }) => {
    const renderCards = () => {
        return (
            <>
                {box?.slice(0, 4).map((item) => {
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
        <div className="p-5 min-h-[60vh] w-full flex flex-col items-center bg-gradient-to-b from-neutral-900 to-neutral-800">
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
                <h2 className="text-neutral-50 font-bold text-2xl my-4">
                    About
                </h2>
                <p className="text-neutral-200 whitespace-pre-line">
                    {pageUser.about}
                </p>
            </div>

            <div className="mt-5 w-full md:w-3/4 text-neutral-100">
                <h2 className="text-neutral-50 font-bold text-2xl my-4">
                    Skills
                </h2>

                <div className="flex gap-2 max-w-lg flex-wrap">
                    {pageUser?.skills?.split(",").map((s) => {
                        const text = s.trim();

                        return (
                            <div className="text-sm outline outline-2 shadow-md outline-neutral-300 px-2 py-1 rounded-full">
                                {text}
                            </div>
                        );
                    })}
                </div>
            </div>

            {box && (
                <div className="md:w-3/4 mt-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-neutral-50 font-bold text-2xl my-4">
                            My Top 3 Projects
                        </h2>

                        <Button rounded lable="View All =>" />
                    </div>
                    <div className="mt-6 grid grid-col-1 md:grid-cols-4 gap-3 md:gap-5 ">
                        {renderCards()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoxPageCompo;
