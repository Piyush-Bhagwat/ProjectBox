"use client";
import { IMAGES } from "@/assets/assets";
import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Button from "./ui/Button";

const Header = () => {
    const { user, login } = useContext(projectContext);

    return (
        <header className="text-gray-50 body-font bg-black">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between w-full relative">
                <Link
                    href="/feed"
                    className="flex cursor-pointer title-font font-medium items-center text-gray-50 mb-4 md:mb-0"
                >
                    <Image src={IMAGES.logo} alt="logo" width="30" />
                    <span className="ml-3 text-xl">ProjectBox</span>
                </Link>

                {user && (
                    <Link href="/newProject">
                        <Button
                            className="absolute left-[50%] bottom-[25%] translate-x-[-50%] "
                            lable="Add Project"
                        />
                    </Link>
                )}

                <nav className="flex text-sm flex-wrap items-center gap-3 justify-center">
                    <a className=" cursor-pointer hover:text-gray-300">
                        Randomize
                    </a>
                    {user && (
                        <>
                            <a className=" cursor-pointer hover:text-gray-300">
                                Favorites
                            </a>

                            <a className=" cursor-pointer hover:text-gray-300">
                                Your Box
                            </a>
                            <a className="cursor-pointer hover:text-gray-300">
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
                            <Button lable="Login" />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
