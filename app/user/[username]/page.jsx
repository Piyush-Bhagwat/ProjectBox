"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/projectContext";
import ProjectCard from "@/components/ProjectCard";
import Skeleton from "@/components/ui/skeleton";

const ProfilePage = ({ params }) => {
    const { profileImage, setProfileImage, user, box, projects } = useProjects();
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
    const [aboutMe, setAboutMe] = useState("");
    const router = useRouter();

    useEffect(() => {
        document.title = `Upload Profile Photo - ${params.username}`;
    }, [params.username]);

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
        <div className="bg-neutral-900 text-neutral-200 p-8 lg:p-16 space-y-8">
            <div className="flex flex-row items-center space-x-4 justify-between">
                <div className="w-1/3 bg-neutral-900 text-neutral-200 p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl mb-2">Total Projects Uploaded</h4>
                    <div className="text-lg">{projects.length}</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 rounded-full bg-gray-300 flex items-center justify-center">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-64 h-64 rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-8xl">👤</span>
                        )}
                        {user && user.username === params.username && (
                            <>
                                <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 text-white text-sm py-1 rounded-b-full">
                                    Upload Photo
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    style={{
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <h2 className="text-2xl mt-4 font-semibold">
                        {user && user.username === params.username && isEditing ? (
                            <input
                                type="text"
                                value={newUsername}
                                onChange={handleInputChange}
                                name="newUsername"
                                className="bg-neutral-900 text-neutral-200 border-b border-gray-200 focus:ring-0"
                            />
                        ) : (
                            params.username
                        )}
                    </h2>
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

            <div className="bg-neutral-900 text-neutral-200 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl mb-6 font-semibold">About Me</h3>
                {isEditing ? (
                    <textarea
                        name="aboutMe"
                        value={aboutMe}
                        onChange={handleInputChange}
                        className="w-full h-32 border border-gray-200 rounded-md bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Write about yourself..."
                    />
                ) : (
                    <p>{aboutMe || "No info."}</p>
                )}
                {isEditing && (
                    <div className="mt-4 flex space-x-4">
                        <button
                            className="flex-1 px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </button>
                        <button
                            className="flex-1 px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                            onClick={handleEditProfile}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="p-5 min-h-[60vh]">
                <h2 className="text-neutral-200 text-4xl font-bold">Your Box</h2>
                {box ? (
                    <div className="mt-6 grid grid-col-1 md:grid-cols-4 gap-3 md:gap-5">
                        {renderCards()}
                    </div>
                ) : (
                    <Skeleton />
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
