import { IMAGES } from "@/assets/assets";
import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

const SignupForm = () => {
    const { signUp } = useContext(projectContext);
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div class="px-6 py-4">
                <div class="flex justify-center mx-auto">
                    <Image class="w-20" src={IMAGES.logoDark} alt="" />
                </div>

                <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                    Welcome
                </h3>

                <p class="mt-1 text-center text-gray-500 dark:text-gray-400">
                    Create account
                </p>

                <form>
                    <div class="w-full mt-4">
                        <input
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="text"
                            required
                            placeholder="UserName"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>

                    <div class="w-full mt-4">
                        <input
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        <div></div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                signUp(username, pass);
                            }}
                            class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
