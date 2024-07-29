"use client";

// Sunnnnnnnnnnnnnnnnnnnnnnnnnnnnnn!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// for text color we are user text-neutral-200 and background color jo hai vo hai bg-neutral-900

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/projectContext";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ProfilePage = ({ params }) => {
    const [profileImage, setProfileImage] = useState(null);
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
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const router = useRouter();
    const { user, toSignup, box, feed, projects } = useProjects();

    useEffect(() => {
        document.title = `Upload Profile Photo - ${params.username}`;
    }, [params.username]);

    useEffect(() => {
        if (projects.length > 0) {
            const { labels, data } = getProjectsDataByCategory(projects);
            setChartData({
                labels,
                datasets: [
                    {
                        label: "Number of Projects",
                        data,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [projects]);

    const getProjectsDataByCategory = (projects) => {
        console.log("Projects:", projects);

        const categoryCounts = projects.reduce((acc, project) => {
            console.log("Processing project:", project);
            const category = project.category || "Uncategorized";
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        console.log("Category Counts:", categoryCounts);

        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        return { labels, data };
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(URL.createObjectURL(event.target.files[0]));
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
        } else {
            setNewUsername(value);
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex flex-col lg:flex-row p-8 lg:p-16 space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="w-full lg:w-1/3 flex flex-col items-center bg-neutral-900 text-neutral-200 p-6 lg:p-8 rounded-lg shadow-lg flex-shrink-0 border border-gray-200 ">
                <div className="relative w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-4xl">👤</span>
                    )}
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
                </div>
                
                {isEditing ? (
                    <div className="mt-4 w-full">
                        <input
                            type="text"
                            name="username"
                            value={newUsername}
                            onChange={handleInputChange}
                            className="w-full block flex-1 border border-gray-200 rounded-md border-gray-300 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="New Username"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-center">
                                Social Links
                            </h3>
                            <div className="flex flex-col space-y-2 mt-2">
                                {Object.keys(socialLinks).map((key) => (
                                    <input
                                        key={key}
                                        type="text"
                                        name={key}
                                        value={socialLinks[key]}
                                        onChange={handleInputChange}
                                        className="block flex-1 border border-gray-200 rounded-md border-gray-300 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder={`Enter ${
                                            key.charAt(0).toUpperCase() +
                                            key.slice(1)
                                        } URL`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-4 w-full">
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
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl mt-4 font-semibold">
                            {params.username}
                        </h2>
                        <div className="mt-6 w-full">
                            <h3 className="text-lg font-semibold">
                                Social Links
                            </h3>
                            <ul className="mt-2 list-none flex flex-col space-y-2">
                                {Object.entries(savedSocialLinks).map(
                                    ([key, url]) =>
                                        url ? (
                                            <li
                                                key={key}
                                                className="flex items-center space-x-2"
                                            >
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 text-blue-500 hover:underline"
                                                >
                                                    <svg
                                                        className="w-5 h-5 fill-current"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        {/* Add appropriate SVG paths for each social media icon */}
                                                    </svg>
                                                    <span>
                                                        {key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            key.slice(1)}
                                                    </span>
                                                </a>
                                            </li>
                                        ) : null
                                )}
                            </ul>
                        </div>
                        <button
                            className="mt-6 mb-2 px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all w-full"
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </button>
                        <div className="mt-4 flex space-x-8 w-full">
                            <button
                                className="flex-1 px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                onClick={handleShareProfile}
                            >
                                Share Profile
                            </button>
                            <button
                                className="flex-1 px-3 py-0.5 border-white rounded-md border-2 text-neutral-200 border-dashed hover:bg-neutral-100 hover:text-black transition-all"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="w-full lg:w-2/3 bg-neutral-900 text-neutral-200 p-6 lg:p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl mb-6 font-semibold">Your Statistics</h3>
                <h4 className="text-xl mb-2">Total Projects Uploaded</h4>
                <div className="text-lg mb-6">{projects.length}</div>

                <h4 className="text-xl mb-4">Projects by Category</h4>

                <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
