"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ImagePicker from "./formComponants/imagePicker";

import { useRouter } from 'next/navigation';

import { uploadImages } from "@/firebase/direbase.storage";
import { projectContext } from "@/context/projectContext";
import { getProjectID } from "@/utils/utilFuncitons";
import { uploadPost } from "@/firebase/firebase.db";
import Button from "./ui/Button";


const NewProjectForm = () => {
    // Initialize state with one input field
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({ category: "web" });
    const [images, setImages] = useState([null, null, null, null]);
    const { user } = useContext(projectContext);

    // Handle adding a new input field
    const addField = () => {
        if (members?.length > 5) {
            alert("only 6 members can be added");
            return;
        }
        setMembers([...members, ""]);
    };

    // Handle change in input value
    const handleMemberChange = (index, event) => {
        const newMembers = [...members];
        newMembers[index] = event.target.value;
        setMembers(newMembers);
    };

    const handleFormChange = (e) => {
        const newData = { ...formData, [e.target.name]: e.target.value };
        console.log(newData);
        setFormData(newData);
    };

    const handlePhotosSelect = (e, idx) => {
        const file = e.target.files[0];
        if (file) {
            // Generate a temporary URL for the selected file
            const fileUrl = URL.createObjectURL(file);

            setImages((prev) =>
                prev.map((img, id) =>
                    id === idx ? { url: fileUrl, file } : img
                )
            );
        }
    };

    const isFormFilled = () => {
        return (
            formData.visiblity &&
            formData.projectName &&
            formData.about &&
            formData.date &&
            formData.status &&
            formData.tech
        );
    };

    useEffect(() => {
        console.log("images", images);
    }, [images]);


    const router = useRouter();

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormFilled()) {
            alert("fill the form please");
            return
        };

        console.log("clicked on submit");

        // step1 photos!
        const photos = await uploadImages(
            images,
            user.username,
            formData.projectName
        );

        //step2: sending invitaions
        sendInviations();

        //step3: add urls to data
        const data = {
            ...formData,
            photos,
            members,
            auther: user.username,
            createdAt: Date.now(),
            likes: 0,
        };
        //step4: upload!!
        console.log("uploads start");
        await uploadPost(data);

        alert("upload successful please refresh");
      
      const projectId = 'sampleId'; // Replace with actual project ID from form input or state
        router.push(`/display/${projectId}/pg`);
    };

    const sendInviations = async () => {};

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-white pb-12">
                    <h2 className="text-base font-semibold leading-7 text-white">
                        Basic Info
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-300">
                        This information will be displayed publicly so be
                        careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="projectName"
                                className="block text-sm font-medium leading-6 text-gray-50"
                            >
                                Project Name:
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input
                                        id="projectname"
                                        name="projectName"
                                        required
                                        type="text"
                                        placeholder="Blog Site"
                                        autoComplete="off"
                                        onChange={handleFormChange}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label
                                htmlFor="formal-name"
                                className="block text-sm font-medium leading-6 text-gray-50"
                            >
                                Formal Name:
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input
                                        id="formal-name"
                                        name="formalName"
                                        type="text"
                                        placeholder="Content Management System"
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="date"
                                class="block text-sm text-gray-50 dark:text-gray-300"
                            >
                                date
                            </label>

                            <input
                                type="date"
                                id="date"
                                name="date"
                                onChange={handleFormChange}
                                required
                                placeholder="John Doe"
                                class="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-50"
                            >
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    required
                                    onChange={handleFormChange}
                                    rows={3}
                                    className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-300">
                                Write a few sentences about your project to
                                describe it.
                            </p>
                        </div>

                        <div className="sm:col-span-4">
                            <label
                                htmlFor="tags"
                                className="block text-sm font-medium leading-6 text-gray-50"
                            >
                                Tags:
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                    <input
                                        id="tags"
                                        name="tags"
                                        onChange={handleFormChange}
                                        type="text"
                                        placeholder="Comma seperated"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="photo"
                                className="block text-sm font-medium leading-6 text-gray-50"
                            >
                                Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label className="block text-sm font-medium leading-6 text-gray-50">
                                Social Links of Project:
                            </label>
                            <div className="mt-2">
                                <div className="flex text-white rounded-md shadow-sm ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md">
                                    Github :
                                    <input
                                        name="githubLink"
                                        type="url"
                                        onChange={handleFormChange}
                                        placeholder="link"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="flex text-white rounded-md shadow-sm ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md">
                                    Hosted :
                                    <input
                                        name="hostedLink"
                                        onChange={handleFormChange}
                                        type="url"
                                        placeholder="link"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="flex text-white rounded-md shadow-sm ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md">
                                    Twitter :
                                    <input
                                        name="twitterLink"
                                        onChange={handleFormChange}
                                        type="url"
                                        placeholder="link"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="flex text-white rounded-md shadow-sm ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md">
                                    LinkedIn :
                                    <input
                                        name="linkedLink"
                                        onChange={handleFormChange}
                                        type="url"
                                        placeholder="link"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="flex text-white rounded-md shadow-sm ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md">
                                    Youtube :
                                    <input
                                        name="youtubeLink"
                                        type="url"
                                        onChange={handleFormChange}
                                        placeholder="link"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-50">
                                Photos
                            </label>
                            <div className="flex gap-2">
                                <ImagePicker
                                    handleSelect={handlePhotosSelect}
                                    image={images[0]}
                                    idx={0}
                                />
                                <ImagePicker
                                    handleSelect={handlePhotosSelect}
                                    image={images[1]}
                                    idx={1}
                                />
                                <ImagePicker
                                    handleSelect={handlePhotosSelect}
                                    image={images[2]}
                                    idx={2}
                                />
                                <ImagePicker
                                    handleSelect={handlePhotosSelect}
                                    image={images[3]}
                                    idx={3}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-50">
                        Details
                    </h2>

                    <div className="mt-10 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium leading-6 text-gray-50"
                            >
                                Status
                            </label>
                            <fieldset className="flex flex-wrap gap-3">
                                <legend className="sr-only">Status</legend>

                                <div>
                                    <label
                                        htmlFor="finished"
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-gray-50 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value="finished"
                                            required
                                            id="finished"
                                            onChange={handleFormChange}
                                            className="sr-only"
                                        />

                                        <p className="text-sm font-medium">
                                            Finished
                                        </p>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="ongoing"
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-gray-50 hover:border-gray-200 has-[:checked]:border-red-500 has-[:checked]:bg-red-500 has-[:checked]:text-white"
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            onChange={handleFormChange}
                                            value="ongoing"
                                            id="ongoing"
                                            required
                                            className="sr-only"
                                        />

                                        <p className="text-sm font-medium">
                                            On Going
                                        </p>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="mb-3 sm:col-span-3">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium leading-6 text-gray-50"
                        >
                            Category
                        </label>
                        <div className="mt-2">
                            <select
                                id="category"
                                name="category"
                                onChange={handleFormChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value="web">Web Development</option>
                                <option value="ds">Data Science</option>
                                <option value="app">App Development</option>
                                <option value="ai">Ai/ML</option>
                                <option value="vr">VR</option>
                                <option value="other">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-full mb-3">
                        <label
                            htmlFor="tech"
                            className="block text-sm font-medium leading-6 text-gray-50"
                        >
                            Technologies Used: (comma seperated)
                        </label>
                        <div className="mt-2">
                            <input
                                id="tech"
                                type="text"
                                onChange={handleFormChange}
                                required
                                name="tech"
                                className="w-[40%] rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4 mb-3">
                        <label className="block text-sm font-medium leading-6 text-gray-50">
                            Team Members: (write ProjectBox username if exist)
                        </label>

                        <div className="mt-2">
                            {members.map((member, index) => (
                                <div
                                    key={index}
                                    className="flex rounded-md shadow-sm ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md mb-2"
                                >
                                    box/
                                    <input
                                        name={`member-${index}`}
                                        type="text"
                                        placeholder="username"
                                        autoComplete="user"
                                        value={member}
                                        onChange={(event) =>
                                            handleMemberChange(index, event)
                                        }
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            ))}
                        </div>

                        <Button onClick={addField} lable="Add More Member" type="button" />
                           
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-50">
                        Journey
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-300">
                        Tell about the journey of your project
                    </p>

                    <div className=" mt-10 col-span-full mb-3">
                        <label
                            htmlFor="problems"
                            className="block text-sm font-medium leading-6 text-gray-50"
                        >
                            Problems Faced
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="problems"
                                name="problems"
                                onChange={handleFormChange}
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={""}
                            />
                        </div>
                    </div>

                    <div className="col-span-full mb-3">
                        <label
                            htmlFor="solution"
                            className="block text-sm font-medium leading-6 text-gray-50"
                        >
                            Solution you came up with:
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="solution"
                                name="solution"
                                onChange={handleFormChange}
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={""}
                            />
                        </div>
                    </div>

                    <div className="col-span-full mb-3">
                        <label
                            htmlFor="notes"
                            className="block text-sm font-medium leading-6 text-gray-50"
                        >
                            Personal Notes: (only visible to you)
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="notes"
                                name="notes"
                                onChange={handleFormChange}
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={""}
                            />
                        </div>
                    </div>

                    <div className="mt-10 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="visiblity"
                                className="block text-sm font-medium leading-6 text-gray-50"
                            >
                                Visiblity:
                            </label>
                            <fieldset className="flex flex-wrap gap-3">
                                <legend className="sr-only">Status</legend>

                                <div>
                                    <label
                                        htmlFor="public"
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-gray-50 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                                    >
                                        <input
                                            type="radio"
                                            name="visiblity"
                                            value="public"
                                            id="public"
                                            onChange={handleFormChange}
                                            required
                                            className="sr-only"
                                        />

                                        <p className="text-sm font-medium">
                                            Public
                                        </p>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="private"
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-gray-50 hover:border-gray-200 has-[:checked]:border-red-500 has-[:checked]:bg-red-500 has-[:checked]:text-white"
                                    >
                                        <input
                                            type="radio"
                                            name="visiblity"
                                            value="private"
                                            id="private"
                                            onChange={handleFormChange}
                                            required
                                            className="sr-only"
                                        />

                                        <p className="text-sm font-medium">
                                            Private
                                        </p>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 mb-10">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-50"
                >
                    Cancel
                </button>

                <Button type="submit" onClick={handleSubmit} lable="Upload" />
            </div>
        </form>
    );
};

export default NewProjectForm;
