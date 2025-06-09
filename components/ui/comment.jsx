import { getUserPhoto } from "@/firebase/firebase.db";
import Image from "next/image";
import Link from "next/link";
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
            <p className="text-xs flex items-center gap-2">
                <Image
                    src={photoURL}
                    width={30}
                    height={30}
                    className="object-cover w-6 aspect-square rounded-full"
                />
                <Link href={`/box/${com.username}`}>{com.username}</Link>
            </p>
            <p className="mt-3">{com.comment}</p>
        </div>
    );
};

export default Comment;
