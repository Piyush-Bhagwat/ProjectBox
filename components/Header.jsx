"use client";
import { IMAGES } from "@/assets/assets";
import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Button from "./ui/Button";
import { FaPlus } from "react-icons/fa6";

const Header = () => {
    const { user } = useContext(projectContext);
    const [openNav, setOpenNav] = useState(false);
    const [hideNav, setHideNav] = useState(true);

    useEffect(() => {
        async function closeNav() {
            if (!openNav) {
                setTimeout(() => setHideNav(true), 300);
            } else {
                setHideNav(false)
            }
        }
        closeNav();
    }, [openNav]);

    return (
        <header className="text-gray-50 body-font border-b border-neutral-700 shadow-xl">
            <div className="container mx-auto flex flex-wrap px-5 py-2 flex-row items-center justify-between w-full relative">
                <Link
                    href="/feed"
                    className="flex cursor-pointer title-font font-medium items-center text-gray-50 "
                >
                    <Image
                        src={IMAGES.logo}
                        alt="logo"
                        className="w-8 md:w-full"
                        width="50"
                    />
                    <span className="md:ml-3 md:text-xl">ProjectBox</span>
                </Link>

                {user && (
                    <Link href="/newProject">
                        <Button className="md:absolute left-[50%] bottom-[25%] translate-x-[-50%] relative">
                            Add Project <FaPlus />
                        </Button>
                    </Link>
                )}

                <nav className="hidden md:flex text-sm flex-wrap items-center gap-3 justify-center">
                    <a className="cursor-pointer hover:text-gray-300">
                        Randomize
                    </a>
                    {user && (
                        <>
                            <a className="cursor-pointer hover:text-gray-300">
                                Favorites
                            </a>

                            <Link
                                href={`/box/${user?.username}`}
                                className="cursor-pointer hover:text-gray-300"
                            >
                                Your Box
                            </Link>
                            <Link
                                href={`/user`}
                                className="cursor-pointer hover:text-gray-300"
                            >
                                <Image
                                    className="object-cover w-6 h-6 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                    src={user.photoURL}
                                    alt="hi"
                                    width={20}
                                    height={20}
                                />
                            </Link>
                        </>
                    )}
                </nav>

                {user && (
                    <div className="md:hidden">
                        <button onClick={() => setOpenNav((p) => !p)}>
                            <Image
                                className="object-cover w-6 h-6 rounded-full ring ring-gray-300 dark:ring-gray-600"
                                src={user?.photoURL}
                                alt="userPic"
                                width={20}
                                height={20}
                            />
                        </button>

                        {!hideNav && (
                            <nav
                                className={`absolute bg-neutral-700 flex flex-col gap-4 z-50 p-4 rounded-s-lg transition-all duration-200 delay-75 ease-out ${
                                    openNav ? "right-0" : "-right-32"
                                }`}
                            >
                                <a className="cursor-pointer hover:text-gray-300">
                                    Favorites
                                </a>

                                <Link
                                    href={`/box/${user?.username}`}
                                    className="cursor-pointer hover:text-gray-300"
                                >
                                    Your Box
                                </Link>
                                <Link
                                    href={`/user`}
                                    className="cursor-pointer hover:text-gray-300"
                                >
                                    Profile
                                </Link>
                            </nav>
                        )}
                    </div>
                )}

                {!user && (
                    <Link href="/login">
                        <Button lable="Login" />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
