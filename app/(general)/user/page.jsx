"use client";

import React, { useState, useEffect } from "react";
import { SlPencil } from "react-icons/sl";
import { useProjects } from "@/context/projectContext";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import EditBtn from "@/components/ui/EditBtn";

const ProfilePage = () => {
    const { user, box } = useProjects();

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        document.title = `${user?.username} | Home`;
    }, [user]);

    const handleShareProfile = () => {
        const profileLink = `${window.location.origin}/box/${user.username}`;
        navigator.clipboard.writeText(profileLink).then(() => {
            alert("Profile link copied to clipboard!");
        });
    };

    const handleLogout = () => {
        null;
    };

    const renderCards = () => {
        return (
            <>
                {box?.map((item) => (
                    <ProjectCard project={item} id={item.id} key={item.id} />
                ))}
            </>
        );
    };

    return (
        <>
            {user ? (
                <div className="bg-neutral-900 text-neutral-200 p-8 lg:p-16 space-y-8">
                    <div className="flex flex-row items-center space-x-4 justify-between">
                        <div className="w-1/3 bg-neutral-900 text-neutral-200 p-6 rounded-lg ">
                            <h4 className="text-xl mb-2">
                                Total Projects Uploaded
                            </h4>
                            <div className="text-lg">{box?.length}</div>
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
                                className="px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                onClick={handleShareProfile}
                            >
                                Share Profile
                            </button>
                            <button
                                className="px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                onClick={handleLogout}
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
                        {user.about && <p>{user.about}</p>}
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
