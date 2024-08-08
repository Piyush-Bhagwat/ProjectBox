"use client";
import Image from "next/image";
import PageSkeleton from "./ui/PageSkeleton";
import { useEffect, useState } from "react";
import {
    FaCrown,
    FaGithub,
    FaLinkedin,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import { getUserPhoto } from "@/firebase/firebase.db";

const ProjectDisplay = ({ project }) => {
    const [photoIDX, setPhotoIDX] = useState(0);
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        if (!project) return;
        if (project?.photos) {
            setPhotoURL(project.photos[photoIDX]);
        } else {
            setPhotoURL("https://via.placeholder.com/480");
        }
    }, [photoIDX, project]);

    if (!project) {
        return (
            <div className="px-32 py-16">
                <PageSkeleton />
            </div>
        );
    }

    const changeIDX = (val) => {
        if (!project) return;
        setPhotoIDX((p) => {
            let idx = (p + val) % project?.photos.length;
            if (idx == -1) idx = project?.photos.length - 1;
            console.log(idx);
            return idx;
        });
    };

    const renderTech = () => {
        const tags = project.tech?.split(",");
        return (
            <>
                {tags?.map((tag) => {
                    return (
                            
                            <div key={tag} className="md:px-2 cursor-default md:py-0.5 px-1 text-white border text-sm border-white rounded-full">
                            {tag}
                        </div>
                    );
                })}
            </>
        );
    };

    const haveAnyLinks =
        project.githubLink ||
        project.hostedLink ||
        project.twitterLink ||
        project.linkedLink;

    return (
        <div className="p-2 md:p-5 text-white">
            <h1 className="text-[2em] text-neutral-200  tracking-wider md:text-[3em] font-black mt-2">
                {project.projectName}
            </h1>

            <div className="flex flex-col md:flex-row w-full gap-10">
                <div className="w-full md:w-1/2">
                    <div className="relative mt-3 md:mt-6 flex md:gap-3 items-center justify-center ">
                        <button
                            className="absolute left-2 bg-black/60 md:bg-none text-2xl md:static block h-8  md:h-12 aspect-square md:border-2 rounded-full border-dashed border-neutral-600 hover:bg-neutral-600 md:transition-all"
                            onClick={() => changeIDX(-1)}
                        >
                            {"<-"}
                        </button>
                        <div className=" w-full md:w-[90%] aspect-video bg-neutral-800 rounded-lg">
                            <Image
                                src={photoURL}
                                alt={project.projectName}
                                width={600}
                                height={600}
                                className="w-full aspect-video object-cover hover:object-contain rounded-lg"
                            />
                        </div>
                        <button
                            className="absolute right-2 bg-black/60 md:bg-none text-2xl md:static block h-8  md:h-12 aspect-square md:border-2 rounded-full border-dashed border-neutral-600 hover:bg-neutral-600 md:transition-all"
                            onClick={() => changeIDX(1)}
                        >
                            {"->"}
                        </button>
                    </div>

                    <div className="flex mt-6 w-full gap-2 justify-evenly">
                        <div className=" flex flex-col gap-3 p-2 md:p-3 w-1/2 md:w-[35%] border-2 border-dashed border-neutral-600 rounded-lg">
                            <h3>{project.formalName}</h3>
                            <div className="flex items-center justify-between">
                                <p className="border w-fit text-sm border-neutral-700 rounded-full px-2 py-0.5">
                                    {project.category}
                                </p>

                                <p className="text-sm flex gap-1 items-center">
                                    {" "}
                                    <span
                                        className={`p-1.5 rounded-full animate-pulse ${
                                            project.status == "ongoing"
                                                ? "bg-blue-300"
                                                : "bg-green-300"
                                        } inline-block`}
                                    ></span>
                                    {project.status}
                                </p>
                            </div>

                            <div className="flex flex-wrap w-full gap-2">
                                {renderTech()}
                            </div>

                            <p>Started: {project.date}</p>
                        </div>

                        <div className=" flex flex-col gap-3 p-2 md:p-3 w-1/2 md:w-[35%] border-2 border-dashed border-neutral-600 rounded-lg">
                            <p className="text-base font-semibold leading-7 text-white">
                                Team Members
                            </p>
                            <div className="mt-2 flex gap-2 flex-wrap">
                                <Link href={`/box/${project.auther}`}>
                                    <button className="border flex gap-2 items-center cursor-pointer w-fit text-sm border-neutral-700 rounded-full px-2 py-0.5">
                                        <FaCrown /> {project.auther}
                                    </button>
                                </Link>
                                {project.members &&
                                    project.members.map((member, index) => (
                                        <>
                                            {member && (
                                                <button
                                                    className="border cursor-pointer w-fit text-sm border-neutral-700 rounded-full px-2 py-0.5"
                                                    key={index}
                                                >
                                                    {member}
                                                </button>
                                            )}
                                        </>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {haveAnyLinks && (
                        <div className="mt-6 w-full text-center">
                            <p className="text-base font-semibold leading-7 text-white">
                                Social Links
                            </p>
                            <ul className="mt-2 w-full flex justify-center gap-3 list-none">
                                {project.githubLink && (
                                    <li>
                                        <Link
                                            href={project.githubLink}
                                            target="_blank"
                                            className="flex items-center space-x-2 text-3xl"
                                        >
                                            <FaGithub />
                                        </Link>
                                    </li>
                                )}
                                {project.twitterLink && (
                                    <li>
                                        <a
                                            href={project.twitterLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-3xl"
                                        >
                                            <FaXTwitter />
                                        </a>
                                    </li>
                                )}
                                {project.linkedLink && (
                                    <li>
                                        <a
                                            href={project.linkedLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-3xl"
                                        >
                                            <FaLinkedin />
                                        </a>
                                    </li>
                                )}
                                {project.youtubeLink && (
                                    <li>
                                        <a
                                            href={project.youtubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-3xl"
                                        >
                                            <FaYoutube />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/2">
                    <div className="mt-6">
                        <h2 className="font-semibold mb-3 text-3xl leading-7 text-neutral-200">
                            Description
                        </h2>
                        <p className="mt-1 leading-6 text-gray-300">
                            {project.about}
                        </p>
                    </div>
                    <div className="mt-6">
                        <p className="font-semibold mb-3 text-3xl leading-7 text-neutral-200">
                            Journey
                        </p>
                        <div className="mt-1 ml-6 leading-6 text-gray-300">
                            <p className="mb-2">
                                <strong>Problems Faced:</strong>{" "}
                                {project.problems}
                            </p>
                            <p className="mb-2">
                                <strong>Solution:</strong> {project.solution}
                            </p>
                            <p className="mb-2">
                                <strong>Personal Notes:</strong> {project.notes}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDisplay;
