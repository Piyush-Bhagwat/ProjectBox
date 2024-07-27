import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
    return (
        <main className="">
            <section className="text-gray-400 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                            This will be the Landing Page
                            <br className="hidden lg:inline-block" />
                            of the App
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Copper mug try-hard pitchfork pour-over freegan
                            heirloom neutra air plant cold-pressed tacos poke
                            beard tote bag. Heirloom echo park mlkshk tote bag
                            selvage hot chicken authentic tumeric truffaut
                            hexagon try-hard chambray.
                        </p>
                        <div className="flex justify-center gap-3">
                            <Link href="/feed">
                            <Button lable="Go to Feed" lg />
                            </Link>
                            <Button lable="Button" lg important />
                            
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img
                            className="object-cover object-center rounded"
                            alt="hero"
                            src="https://dummyimage.com/720x600"
                        />
                    </div>
                </div>
            </section>
            <hr className="w-2/3 mx-auto block border-dashed border-t-2 border-neutral-600"/>
            <section className="text-gray-400 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
                            Raw Denim Heirloom Man Braid
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">
                            Blue bottle crucifix vinyl post-ironic four dollar
                            toast vegan taxidermy. Gastropub indxgo juice
                            poutine, ramps microdosing banh mi pug.
                        </p>
                        <div className="flex mt-6 justify-center">
                            <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-evenly sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div className="p-4 md:w-1/4 flex flex-col text-center items-center rounded-lg border-2 border-dashed border-neutral-600">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    className="w-10 h-10"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">
                                    Shooting Stars
                                </h2>
                                <p className="leading-relaxed text-base">
                                    Blue bottle crucifix vinyl post-ironic four
                                    dollar toast vegan taxidermy. Gastropub
                                    indxgo juice poutine, ramps microdosing banh
                                    mi pug VHS try-hard.
                                </p>
                                <a className="mt-3 text-purple-400 inline-flex items-center">
                                    Learn More
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 flex flex-col text-center items-center rounded-lg border-2 border-dashed border-neutral-600">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    className="w-10 h-10"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="6" cy="6" r="3"></circle>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">
                                    The Catalyzer
                                </h2>
                                <p className="leading-relaxed text-base">
                                    Blue bottle crucifix vinyl post-ironic four
                                    dollar toast vegan taxidermy. Gastropub
                                    indxgo juice poutine, ramps microdosing banh
                                    mi pug VHS try-hard.
                                </p>
                                <a className="mt-3 text-purple-400 inline-flex items-center">
                                    Learn More
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 flex flex-col text-center items-center rounded-lg border-2 border-dashed border-neutral-600">
                            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    className="w-10 h-10"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">
                                    Neptune
                                </h2>
                                <p className="leading-relaxed text-base">
                                    Blue bottle crucifix vinyl post-ironic four
                                    dollar toast vegan taxidermy. Gastropub
                                    indxgo juice poutine, ramps microdosing banh
                                    mi pug VHS try-hard.
                                </p>
                                <a className="mt-3 text-purple-400 inline-flex items-center">
                                    Learn More
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    

                    <Button lable="Button" lg className="block mx-auto mt-16"/>
                </div>
            </section>
        </main>
    );
}
