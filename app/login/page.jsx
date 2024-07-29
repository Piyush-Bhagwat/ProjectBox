"use client";
import { IMAGES } from "@/assets/assets";
import SignupForm from "@/components/Login/signupForm";
import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import React, { useContext } from "react";

const LoginPage = () => {
    const { login, user, toSignup } = useContext(projectContext);
    return (
        <div className="w-full h-[50vh] gap-3 flex justify-center items-center">
            {user ? <h1 className="text-white text-2xl font-bold">You are logged in</h1> : (
                <button
                    onClick={login}
                    className="px-10 py-3 text-white bg-blue-800 hover:bg-blue-500 hover:text-neutral-900 shadow-md rounded-lg"
                >
                    Login With Google
                </button>
            )}

            {toSignup && <SignupForm />}
        </div>
    );
};

export default LoginPage;
