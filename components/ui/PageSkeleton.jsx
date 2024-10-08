import React from "react";

const PageSkeleton = () => {
    return (
        <section className="flex flex-col gap-4 justify-center items-center">
            <div className="flex w-full gap-10">
                <div
                    role="status"
                    class="w-1/4 p-4 border-2 border-neutral-500 border-dashed rounded shadow animate-pulse md:p-6 border-dashed"
                >
                    <div class="flex items-center justify-center h-48  mb-4 bg-neutral-600 rounded ">
                        <svg
                            class="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                        >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                    <div class="h-2.5 bg-neutral-700 rounded-full  w-48 mb-4"></div>
                    <div class="h-2 bg-neutral-700 rounded-full  mb-2.5"></div>
                    <div class="h-2 bg-neutral-700 rounded-full  mb-2.5"></div>
                    <div class="h-2 bg-neutral-700 rounded-full "></div>
                    <div class="flex items-center mt-4">
                        <svg
                            class="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div>
                            <div class="h-2.5 bg-neutral-700 rounded-full  w-32 mb-2"></div>
                            <div class="w-48 h-2 bg-neutral-700 rounded-full "></div>
                        </div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>

                <div role="status" class="space-y-2.5 w-1/2 animate-pulse ">
                    <div class="flex items-center w-full">
                        <div class="h-2.5 bg-neutral-700 rounded-full  w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[480px]">
                        <div class="h-2.5 bg-neutral-700 rounded-full  w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[400px]">
                        <div class="h-2.5 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-80"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[480px]">
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[440px]">
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-32"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-full"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[360px]">
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-80"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                    <div class="flex items-center w-full">
                        <div class="h-2.5 bg-neutral-700 rounded-full  w-32"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[480px]">
                        <div class="h-2.5 bg-neutral-700 rounded-full  w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[400px]">
                        <div class="h-2.5 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-80"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[480px]">
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[440px]">
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-32"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-24"></div>
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-full"></div>
                    </div>
                    <div class="flex items-center w-full max-w-[360px]">
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                        <div class="h-2.5 ms-2 bg-neutral-700 rounded-full  w-80"></div>
                        <div class="h-2.5 ms-2 bg-neutral-600 rounded-full w-full"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <div
                role="status"
                class="w-1/2 p-4 space-y-4 border-2 border-neutral-500 divide-y divide-gray-200 rounded shadow animate-pulse md:p-6 border-dashed"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <div class="h-2.5 bg-neutral-600 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-neutral-700 rounded-full "></div>
                    </div>
                    <div class="h-2.5 bg-neutral-600 rounded-full  w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-neutral-600 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-neutral-700 rounded-full "></div>
                    </div>
                    <div class="h-2.5 bg-neutral-600 rounded-full  w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-neutral-600 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-neutral-700 rounded-full "></div>
                    </div>
                    <div class="h-2.5 bg-neutral-600 rounded-full  w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-neutral-600 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-neutral-700 rounded-full "></div>
                    </div>
                    <div class="h-2.5 bg-neutral-600 rounded-full  w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-neutral-600 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-neutral-700 rounded-full "></div>
                    </div>
                    <div class="h-2.5 bg-neutral-600 rounded-full  w-12"></div>
                </div>
                <span class="sr-only">Loading...</span>
            </div>
        </section>
    );
};

export default PageSkeleton;
