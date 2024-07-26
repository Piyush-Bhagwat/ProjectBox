import { IMAGES } from "@/assets/assets";
import { projectContext } from "@/context/projectContext";
import { checkUsernameAvalible } from "@/firebase/firebase.db";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const SignupForm = () => {
    const { signUp } = useContext(projectContext);
    const [username, setUsername] = useState("");
    const [nameAvail, setNameAvail] = useState(false);
    const [pass, setPass] = useState("");

    useEffect(() => {
        async function check() {
            const res = await checkUsernameAvalible(username);
            setNameAvail(res);
        }
        check();
    }, [username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nameAvail) {
            alert("Name not avalible");
            return;
        }

        if (!pass) {
            alert("password?");
            return;
        }
        signUp(username, pass);
    };

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden  rounded-lg shadow-md dark:bg-gray-800">
            <div className="px-6 py-4">
                <div className="flex justify-center mx-auto">
                    <Image className="w-20" src={IMAGES.logo} alt="logo" />
                </div>

                <h3 className="mt-3 text-xl font-medium text-center text-neutral-200 dark:text-gray-200">
                    Welcome
                </h3>

                <p className="mt-1 text-center text-neutral-400">
                    Create account
                </p>

                <form>
                    <div className="w-full mt-4">
                        <p className="ml-2 text-red-300 text-xs">
                            Choose wisely you cant change username later
                        </p>
                        <input
                            className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-400 bg-neutral-900 border-2 border-dashed rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="text"
                            required
                            placeholder="UserName"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        {username && (
                            <p className={`ml-2 mt-1 ${nameAvail ? "text-green-300" :"text-red-300"} text-xs`}>
                                {username} {!nameAvail && "not "} is Avaliable
                            </p>
                        )}
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-white placeholder-gray-400 bg-neutral-900 border-2 border-dashed rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div></div>

                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
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
