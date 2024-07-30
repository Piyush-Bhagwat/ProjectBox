"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/projectContext";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";
import { getbox, getUserByUsername } from "@/firebase/firebase.db";
import Image from "next/image";

const ProfilePage = ({ params }) => {
    const { profileImage, setProfileImage, user } = useProjects();

    const [box, setBox] = useState([]);
    const [pageUser, setPageUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(params.username);
    const [socialLinks, setSocialLinks] = useState({
        twitter: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        github: "",
        youtube: "",
    });
    const [savedSocialLinks, setSavedSocialLinks] = useState({});
    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        const username = params.username;
        const boxData = await getbox(username);
        const userData = await getUserByUsername(username);
        setPageUser(userData);
        setBox(boxData);
        setLoading(false);
    };

    useEffect(() => {
        document.title = `${params.username} | Home`;

        fetchData();
    }, []);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setProfileImage(imageUrl);
        }
    };

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

    const handleSaveChanges = () => {
        console.log("New Username:", newUsername);
        console.log("Social Links:", socialLinks);
        setSavedSocialLinks(socialLinks);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in socialLinks) {
            setSocialLinks({ ...socialLinks, [name]: value });
        } else if (name === "aboutMe") {
            setAboutMe(value);
        } else {
            setNewUsername(value);
        }
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
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    {pageUser ? (
                        <div className="bg-neutral-900 text-neutral-200 p-8 lg:p-16 space-y-8">
                            <div className="flex flex-row items-center space-x-4 justify-between">
                                <div className="w-1/3 bg-neutral-900 text-neutral-200 p-6 rounded-lg shadow-lg">
                                    <h4 className="text-xl mb-2">
                                        Total Projects Uploaded
                                    </h4>
                                    <div className="text-lg">{box.length}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="relative w-64 h-64 rounded-full bg-gray-300 flex items-center justify-center">
                                        {pageUser?.photoURL ? (
                                            <Image
                                                src={pageUser.photoURL}
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
                                            {pageUser?.name}
                                        </h2>
                                        <p>@{pageUser?.username}</p>
                                    </div>
                                </div>
                                <div className="w-1/3 flex flex-col items-end space-y-4">
                                    <button
                                        className="px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                        onClick={handleShareProfile}
                                    >
                                        Share Profile
                                    </button>
                                    {user &&
                                        user.username === params.username && (
                                            <button
                                                className="px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                                onClick={handleEditProfile}
                                            >
                                                {isEditing
                                                    ? "Cancel"
                                                    : "Edit Profile"}
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

                           {pageUser.about && <div className="bg-neutral-900 text-neutral-200 p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl mb-6 font-semibold">
                                    About Me
                                </h3>
                                
                                <p>{pageUser.about}</p>
                            </div>}

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
                        <h1 className="text-white text-4xl">No User Found</h1>
                    )}
                </>
            )}
        </>
    );
};

export default ProfilePage;
