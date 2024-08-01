import { searchUserNames } from "@/firebase/firebase.db";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MemberInput = ({ index, onChange }) => {
    const [showSugegstions, setShowSuggestions] = useState(false);

    const [usernameSuggest, setUsernameSuggest] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => console.log("value", value), [value]);

    return (
        <div
            key={index}
            className="flex  relative rounded-md shadow-sm text-neutral-400  ring-1 ring-inset items-center px-1 ring-gray-300 sm:max-w-md mb-2"
        >
            box/
            <input
                name={`member-${index}`}
                type="text"
                placeholder="username"
                autoComplete="off"
                value={value}
                onChange={async (e) => {
                    onChange(e);

                    setValue(e.target.value);
                    const suggest = await searchUserNames(e.target.value.toLowerCase());
                    setUsernameSuggest(suggest);
                }}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-neutral-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onFocus={() => setShowSuggestions(true)}
                onBlur={async () => {
                    setTimeout(() => setShowSuggestions(false), 100);
                }}
            />
            {value && showSugegstions && usernameSuggest?.length != 0 && (
                <div className="absolute flex flex-col gap-1 z-20 -bottom-2 translate-y-full bg-neutral-800 border-2 border-dashed border-neutral-500 text-neutral-200 p-2 rounded-md">
                    <h2>Users on ProjectBox</h2>
                    {usernameSuggest?.map((data) => (
                        <button
                            onClick={() => setValue(data.username)}
                            type="button"
                            key={data.username}
                            className="ml-4 flex items-center gap-2 hover:bg-neutral-600 px-3 py-2 rounded-md"
                        >
                            <Image
                                className="w-[36px] object-cover aspect-square rounded-full"
                                src={data.url}
                                width={35}
                                height={35}
                                alt={data.username}
                            />

                            <div>
                                <p>{data.name}</p>
                                <p className="text-sm">@{data.username}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MemberInput;
