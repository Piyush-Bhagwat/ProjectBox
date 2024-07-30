import { IMAGES } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BoxHeader = () => {
    return (
        <div className="mx-auto mt-4 w-3/4 bg-neutral-800 rounded-lg sticky top-3 flex justify-between px-4 py-2 text-neutral-300 shadow-lg z-50">
            <Link href="/feed" className="flex items-center gap-2">
                <Image src={IMAGES.logo} width={30} />
                ProjectBox
            </Link>

            <nav className="gap-3 flex underline">
                <button>Home</button>
                <button>Projects</button>
            </nav>
        </div>
    );
};

export default BoxHeader;
