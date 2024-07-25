"use client";
import { IMAGES } from "@/assets/assets";
import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
    const { user, login } = useContext(projectContext);

    return (
        <header className="text-gray-600 body-font bg-white dark:bg-black">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between w-full relative">
                <Link
                    href="/feed"
                    className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                >
                    <Image src={IMAGES.logoDark} alt="logo" width="30" />
                    <span className="ml-3 text-xl">ProjectBox</span>
                </Link>

                {user && (
                    <Link href="/newProject">
                        <button className="absolute left-[50%] bottom-[25%] translate-x-[-50%] inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 transition-all rounded text-base text-white mt-4 md:mt-0">
                            Add Project
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4 ml-1"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </Link>
                )}

                <nav className="flex text-sm flex-wrap items-center gap-3 justify-center">
                    <a className=" cursor-pointer hover:text-gray-900">
                        Randomize
                    </a>
                    {user && (
                        <>
                            <a className=" cursor-pointer hover:text-gray-900">
                                Favorites
                            </a>

                            <a className=" cursor-pointer hover:text-gray-900">
                                Your Box
                            </a>
                            <a className="cursor-pointer hover:text-gray-900">
                                <Image
                                    className="object-cover w-6 h-6 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                    src={user.photoURL}
                                    alt="hi"
                                    width={20}
                                    height={20}
                                />
                            </a>
                        </>
                    )}

                    {!user && (
                        <Link href="/login">
                        <button
                            
                            className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 transition-all rounded text-base text-white mt-4 md:mt-0"
                        >
                            Login
                        </button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
