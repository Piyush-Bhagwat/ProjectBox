import { getUserPhoto } from "@/firebase/firebase.db";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Comment = ({ com }) => {
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        async function fetchData() {
            const url = await getUserPhoto(com.username);
            setPhotoURL(url);
        }
        fetchData();
    });

    return (
        <div className="bg-neutral-900 rounded-md text-neutral-200 px-2 py-1">
            <p className="text-sm flex items-center gap-2">
                <Image
                    src={photoURL}
                    width={40}
                    height={40}
                    className="object-cover w-7 aspect-square rounded-full"
                />
                {com.username}
            </p>
            <p className="mt-3">{com.comment}</p>
        </div>
    );
};

export default Comment;
