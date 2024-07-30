"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/projectContext";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import { getbox, getUserByUsername } from "@/firebase/firebase.db";
import Image from "next/image";

const ProfilePage = ({ params }) => {
    const { profileImage, setProfileImage, user, box } = useProjects();

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.title = `${params.username} | Home`;
    }, []);

    const handleShareProfile = () => {
        const profileLink = `${window.location.origin}/profile/${params.username}`;
        navigator.clipboard.writeText(profileLink).then(() => {
            alert("Profile link copied to clipboard!");
        });
    };

    const handleLogout = () => {
        router.push("/");
    };

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
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
                            <div className="text-lg">{box.length}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative w-64 h-64 rounded-full bg-gray-300 flex items-center justify-center">
                                {user?.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        width={600}
                                        height={600}
                                        alt="Profile"
                                        className="w-64 h-64 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-8xl">👤</span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl mt-4 font-semibold">
                                    {user?.name}
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
                            {user && user.username === params.username && (
                                <button
                                    className="px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                    onClick={handleEditProfile}
                                >
                                    {isEditing ? "Cancel" : "Edit Profile"}
                                </button>
                            )}
                            <button
                                className="px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>

                    {user.about && (
                        <div className="bg-neutral-900 text-neutral-200 p-6 rounded-lg">
                            <h3 className="text-2xl mb-6 font-semibold">
                                About Me
                            </h3>

                            <p>{user.about}</p>
                        </div>
                    )}

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
