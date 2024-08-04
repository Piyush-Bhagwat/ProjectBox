import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { SlPencil } from "react-icons/sl";
import { updateFeild, updateProfilePhoto } from "@/firebase/firebase.db";
import ProjectContext, { useProjects } from "@/context/projectContext";
import Image from "next/image";
import Loader from "./Loader";

const EditBtn = ({ title, type = "text", max, feild, InitialValue }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(InitialValue);
    const [image, setImage] = useState(null);
    const { user, updateUserFeild } = useProjects();

    const [processsing, setProcessing] = useState(false);

    const handleSubmit = async () => {
        setProcessing(true);

        if (type != "image") {
            await updateFeild(user.username, feild, value);
            updateUserFeild(feild, value);
        } else {
            const url = await updateProfilePhoto(user.username, image);
            updateUserFeild("photoURL", url);
        }
        setProcessing(false);
        setIsEditing(false);
    };

    const handlePhotosSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Generate a temporary URL for the selected file
            const fileUrl = URL.createObjectURL(file);

            setImage({
                url: fileUrl,
                file,
            });
        }
    };

    return (
        <>
            <button
                className={`absolute top-0 left-[110%] w-9 aspect-square flex items-center justify-center rounded-full active:bg-neutral-800 hover:md:bg-neutral-800`}
                onClick={() => setIsEditing((p) => !p)}
            >
                <SlPencil className="text-base" />
            </button>

            {isEditing && (
                <div className="fixed z-40 min-w-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-700 p-3 h-[40vh] flex flex-col items-center justify-evenly rounded-lg shadow-2xl">
                    {processsing ? (
                        <Loader />
                    ) : (
                        <>
                            <h1 className="text-2xl">{title}</h1>

                            {type == "image" && (
                                <div className="flex items-center flex-col">
                                    {image && (
                                        <Image
                                            className="object-cover w-40 aspect-square mb-3 rounded-md"
                                            src={image.url}
                                            width={90}
                                            height={90}
                                            alt=""
                                        />
                                    )}

                                    <input
                                        type="file"
                                        onChange={handlePhotosSelect}
                                        accept="image/*"
                                    />
                                </div>
                            )}
                            {type == "text" && (
                                <input
                                    className="text-black"
                                    defaultValue={InitialValue}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder={value}
                                    type="text"
                                    maxLength={max}
                                />
                            )}
                            {type == "area" && (
                                <textarea
                                    // value={value}
                                    defaultValue={InitialValue}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="p-2 text-base text-black"
                                    rows={8}
                                    cols={30}
                                    maxLength={max}
                                />
                            )}
                        </>
                    )}

                    <div className="flex gap-3 absolute -bottom-10 right-2">
                        <Button onClick={() => setIsEditing(false)}>
                            Cancle
                        </Button>

                        <Button important onClick={handleSubmit}>
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditBtn;
