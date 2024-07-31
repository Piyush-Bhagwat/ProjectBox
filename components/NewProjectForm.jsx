"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ImagePicker from "./formComponants/imagePicker";

import { useRouter } from "next/navigation";

import { uploadImages } from "@/firebase/direbase.storage";
import { projectContext } from "@/context/projectContext";
import { debounce, getPostID } from "@/utils/utilFuncitons";
import {
    checkProjectNameAvalibale,
    searchUserNames,
    uploadPost,
} from "@/firebase/firebase.db";
import Button from "./ui/Button";
import Loader from "./ui/Loader";
import TextInput from "./formComponants/textInput";
import MemberInput from "./formComponants/MemberInput";

const NewProjectForm = () => {
    // Initialize state with one input field
    const [members, setMembers] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [nameAvaliable, setNameAvaliable] = useState(false);
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

    //check Projectname Avalable
    const checkProjectName = async () => {
        if (!projectName) return;
        setProjectName((p) => p.trim());

        const id = getPostID(user.username, projectName);
        const res = await checkProjectNameAvalibale(user.username, id);
        setNameAvaliable(res);
    };

    const debouncedCheckProjectName = debounce(checkProjectName, 300);
    useEffect(() => {
        debouncedCheckProjectName();
    }, [projectName]);

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
            projectName &&
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
        if (uploading) return;

        if (!isFormFilled()) {
            alert("fill the form please");
            return;
        }

        if (!nameAvaliable) {
            alert("Name not avaliable");
            return;
        }

        setUploading(true);
        console.log("clicked on submit");

        // step1 photos!
        const photos = await uploadImages(images, user.username, projectName);

        //step2: sending invitaions
        sendInviations();

        //step3: add urls to data
        const data = {
            ...formData,
            projectName,
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

        setUploading(false);
        router.push(`/display/${getPostID(user.username, projectName)}`);
    };

    const sendInviations = async () => {};

    return (
        <div>
            {uploading && <Loader background />}
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

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
                            <div className="sm:col-span-8 w-full">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="projectname"
                                        className="text-neutral-100"
                                    >
                                        Project Name:
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setProjectName(e.target.value)
                                        }
                                        autoComplete="off"
                                        placeholder="Blog Site"
                                        id="projectname"
                                        name="projectName"
                                        lable="Project Name:"
                                        required
                                        className=" w-full bg-transparent ring-transparent outline-none text-neutral-200 px-3 pt-5 pb-1 text-4xl border-b-2 border-dashed"
                                    />
                                </div>
                                {projectName && (
                                    <p
                                        className={`${
                                            nameAvaliable
                                                ? "text-green-300"
                                                : "text-red-400"
                                        } ml-3 text-sm`}
                                    >
                                        <span className="text-blue-300">
                                            {getPostID(
                                                user?.username,
                                                projectName
                                            )}
                                        </span>{" "}
                                        is {!nameAvaliable && "not "} avaliable
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-4">
                                <div className="mt-2">
                                    <TextInput
                                        id="formal-name"
                                        lable="Formal Name"
                                        name="formalName"
                                        placeholder="Content Management System"
                                        onChange={handleFormChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="date"
                                    class="block text-sm text-neutral-200 dark:text-gray-300"
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
                                    className="block text-sm font-medium leading-6 text-neutral-200"
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
                                        className="block p-1 w-full border-2 border-dashed rounded-md bg-neutral-900 py-1.5 text-neutral-200 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                                        defaultValue={""}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-300">
                                    Write a few sentences about your project to
                                    describe it.
                                </p>
                            </div>

                            <div className="sm:col-span-4">
                                <div className="mt-2">
                                    <TextInput
                                        id="tags"
                                        lable="Tags"
                                        name="tags"
                                        onChange={handleFormChange}
                                        placeholder="Comma seperated"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-neutral-200">
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
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium leading-6 text-neutral-200">
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
                        <h2 className="text-base font-semibold leading-7 text-neutral-200">
                            Details
                        </h2>

                        <div className="mt-10 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium leading-6 text-neutral-200"
                                >
                                    Status
                                </label>
                                <fieldset className="flex flex-wrap gap-3">
                                    <legend className="sr-only">Status</legend>

                                    <div>
                                        <label
                                            htmlFor="finished"
                                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-neutral-200 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
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
                                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-neutral-200 hover:border-gray-200 has-[:checked]:border-red-500 has-[:checked]:bg-red-500 has-[:checked]:text-white"
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
                                className="block text-sm font-medium leading-6 text-neutral-200"
                            >
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    onChange={handleFormChange}
                                    required
                                    className="block w-full rounded-md bg-neutral-900 border-0 py-1.5 text-neutral-200 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                            <TextInput
                                id="tech"
                                lable="Technologies Used: (comma seperated)"
                                type="text"
                                onChange={handleFormChange}
                                required
                                name="tech"
                            />
                        </div>

                        <div className="sm:col-span-4 mb-3">
                            <label className="block text-sm font-medium leading-6 text-neutral-200">
                                Team Members: (write ProjectBox username if
                                exist)
                            </label>

                            <div className="mt-2">
                                <div className="flex text-neutral-400 rounded-md shadow-sm ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md mb-2">
                                    box/
                                    <input
                                        name="auther"
                                        type="text"
                                        placeholder="username"
                                        autoComplete="user"
                                        value={user?.username}
                                        readOnly
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />{" "}
                                    (auther)
                                </div>
                                {members.map((member, index) => (
                                    <>
                                        <MemberInput
                                            onChange={(event) => {
                                                handleMemberChange(
                                                    index,
                                                    event
                                                );
                                            }}
                                            key={index}
                                            index={index}
                                        />
                                    </>
                                ))}
                            </div>

                            <Button
                                onClick={addField}
                                lable="Add More Member"
                                type="button"
                            />
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-neutral-200">
                            Journey
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-300">
                            Tell about the journey of your project
                        </p>

                        <div className=" mt-10 col-span-full mb-3">
                            <label
                                htmlFor="problems"
                                className="block text-sm font-medium leading-6 text-neutral-200"
                            >
                                Problems Faced
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="problems"
                                    name="problems"
                                    onChange={handleFormChange}
                                    rows={3}
                                    className="block p-1 w-full border-2 border-dashed rounded-md bg-neutral-900 py-1.5 text-neutral-200 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>

                        <div className="col-span-full mb-3">
                            <label
                                htmlFor="solution"
                                className="block text-sm font-medium leading-6 text-neutral-200"
                            >
                                Solution you came up with:
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="solution"
                                    name="solution"
                                    onChange={handleFormChange}
                                    rows={3}
                                    className="block p-1 w-full border-2 border-dashed rounded-md bg-neutral-900 py-1.5 text-neutral-200 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>

                        <div className="col-span-full mb-3">
                            <label
                                htmlFor="notes"
                                className="block text-sm font-medium leading-6 text-neutral-200"
                            >
                                Personal Notes: (only visible to you)
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="notes"
                                    name="notes"
                                    onChange={handleFormChange}
                                    rows={3}
                                    className="block p-1 w-full border-2 border-dashed rounded-md bg-neutral-900 py-1.5 text-neutral-200 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>

                        <div className="mt-10 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="visiblity"
                                    className="block text-sm font-medium leading-6 text-neutral-200"
                                >
                                    Visiblity:
                                </label>
                                <fieldset className="flex flex-wrap gap-3">
                                    <legend className="sr-only">Status</legend>

                                    <div>
                                        <label
                                            htmlFor="public"
                                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-neutral-200 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
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
                                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100  px-3 py-2 text-neutral-200 hover:border-gray-200 has-[:checked]:border-red-500 has-[:checked]:bg-red-500 has-[:checked]:text-white"
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
                        className="text-sm font-semibold leading-6 text-neutral-200"
                    >
                        Cancel
                    </button>

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        lable="Upload"
                    />
                </div>
            </form>
        </div>
    );
};

export default NewProjectForm;
