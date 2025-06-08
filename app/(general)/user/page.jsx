"use client";

import React, { useState, useEffect } from "react";
import { SlPencil, SlTrash } from "react-icons/sl";
import { useProjects } from "@/context/projectContext";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import EditBtn from "@/components/ui/EditBtn";
import { deleteProject } from "@/firebase/firebase.db";
import { ThreeCircles } from "react-loader-spinner";

const ProfilePage = () => {
    const { user, box, logout, refreshData } = useProjects();

    const [isEditing, setIsEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        document.title = `${user?.username} | Home`;
    }, [user]);

    async function handleDeleteProject(item) {

        if (!confirm("Are you sure you want to delete this project?")) return;

        if (deleting) return;
        if (item.auther !== user.username) {
            alert("You can only delete your own projects.");
            return;
        }
        setDeleting(true);
        await deleteProject(item.id, item.category, item.entryID);
        await refreshData();
        setDeleting(false);
    }

    const handleShareProfile = () => {
        const profileLink = `${window.location.origin}/box/${user.username}`;
        navigator.clipboard.writeText(profileLink).then(() => {
            alert("Profile link copied to clipboard!");
        });
    };

    const renderCards = () => {
        return (
            <>
                {box?.map((item) => (
                    <div key={item.id} className="relative">
                        <ProjectCard
                            project={item}
                            id={item.id}
                            key={item.id}
                        />
                        <button
                            className="p-2 bg-neutral-600 absolute bottom-2 right-2 rounded-full hover:bg-neutral-500 transition-all active:scale-95"
                            onClick={() => handleDeleteProject(item)
                            }
                        >
                            {deleting ? <ThreeCircles
                                visible={true}
                                height="15"
                                width="15"
                                color="#fff"
                                ariaLabel="three-circles-loading"
                            /> : <SlTrash className="text-neutral-200" />}
                        </button>
                    </div >
                ))}
            </>
        );
    };

    const renderSkills = () => {
        return (
            <div className="flex gap-2 max-w-lg flex-wrap">
                {user?.skills.split(",").map((t) => {
                    const text = t.trim();

                    return (
                        <div
                            key={text}
                            className="text-sm outline outline-2 shadow-md outline-neutral-300 px-2 py-1 rounded-full"
                        >
                            {text}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            {user ? (
                <div className="bg-neutral-900 overflow-x-hidden w-[100%] text-neutral-200 p-8 lg:p-16 ">
                    <div className="flex flex-col md:flex-row items-center space-x-4 justify-between">
                        <div className="w-1/3 bg-neutral-900 text-neutral-200 p-6 rounded-lg ">
                            <h4 className="md:text-xl mb-2">
                                {box?.length} Projects Uploaded
                            </h4>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-64 h-64 rounded-full flex items-center justify-center">
                                {user?.photoURL ? (
                                    <>
                                        <Image
                                            src={user.photoURL}
                                            width={400}
                                            height={400}
                                            alt="Profile"
                                            className="w-64 h-64 rounded-full object-cover"
                                        />
                                        <EditBtn
                                            title="Set new Profile"
                                            type="image"
                                        />
                                    </>
                                ) : (
                                    <span className="text-8xl">👤</span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl mt-4 font-semibold relative">
                                    {user?.name}{" "}
                                    <EditBtn
                                        width="5"
                                        value={user.name}
                                        InitialValue={user.name}
                                        title="New Name"
                                        feild="name"
                                        max={25}
                                    />
                                </h2>
                                <p>@{user?.username}</p>
                            </div>
                        </div>
                        <div className="w-1/3 flex flex-col items-end space-y-4">
                            <button
                                className="px-3 py-0.5 hidden md:inline border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                onClick={handleShareProfile}
                            >
                                Share Profile
                            </button>
                            <button
                                className="px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                onClick={logout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>

                    <div className="bg-neutral-900 text-neutral-200 p-6">
                        <h3 className="text-2xl mb-6 font-semibold relative w-fit">
                            Title:
                            <EditBtn
                                type="text"
                                InitialValue={user.title}
                                title="Your Title"
                                feild="title"
                                max={30}
                            />
                        </h3>
                        I am {user.title && <p>{user.title}</p>}
                    </div>

                    <div className="bg-neutral-900 text-neutral-200 p-6">
                        <h3 className="text-2xl mb-6 font-semibold relative w-fit">
                            Skills:
                            <EditBtn
                                type="text"
                                InitialValue={user.skills}
                                title="Your Skills. (comma seperate)"
                                feild="skills"
                                max={120}
                            />
                        </h3>
                        {user.skills && renderSkills()}
                    </div>

                    <div className="bg-neutral-900 text-neutral-200 p-6 rounded-lg">
                        <h3 className="text-2xl mb-6 font-semibold relative w-fit">
                            About Me:
                            <EditBtn
                                type="area"
                                InitialValue={user.about}
                                title="About You"
                                feild="about"
                                max={500}
                            />
                        </h3>
                        {user.about && (
                            <p className="whitespace-pre-line">{user.about}</p>
                        )}
                    </div>

                    <div className="p-5 min-h-[60vh]">
                        <h2 className="text-neutral-200 text-4xl font-bold">
                            Your Box
                        </h2>
                        {box ? (
                            <div className="mt-6 grid grid-col-1 md:grid-cols-4 gap-3 md:gap-5">
                                {renderCards()}
                            </div>
                        ) : (
                            <Skeleton />
                        )}
                    </div>
                </div>
            ) : (
                <Skeleton />
            )}
        </>
    );
};

export default ProfilePage;
