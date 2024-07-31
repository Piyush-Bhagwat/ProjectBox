import React from "react";

const CategorySelect = ({catergory, setCategory}) => {
    return (
        <div className="mt-3 md:mt-5 text-neutral-200 text-xs md:text-sm flex justify-center gap-2 flex-wrap md:gap-4">
            <button
                className={`px-3 py-0.5 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                    catergory == "all" &&
                    "shadow-sm bg-neutral-700 border-neutral-400"
                } `}
                onClick={() => setCategory("all")}
            >
                All
            </button>
            <button
                className={`px-3 py-0.5 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                    catergory == "web" &&
                    "shadow-sm bg-neutral-700 border-neutral-400"
                } `}
                onClick={() => setCategory("web")}
            >
                Web Dev
            </button>
            <button
                className={`px-3 py-0.5 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                    catergory == "app" &&
                    "shadow-sm bg-neutral-700 border-neutral-400"
                } `}
                onClick={() => setCategory("app")}
            >
                App Dev
            </button>
            <button
                className={`px-3 py-0.5 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                    catergory == "ai" &&
                    "shadow-sm bg-neutral-700 border-neutral-400"
                } `}
                onClick={() => setCategory("ai")}
            >
                AI
            </button>
            <button
                className={`px-3 py-0.5 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                    catergory == "ds" &&
                    "shadow-sm bg-neutral-700 border-neutral-400"
                } `}
                onClick={() => setCategory("ds")}
            >
                Data Science
            </button>
            <button
                className={`px-3 py-0.5 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                    catergory == "vr" &&
                    "shadow-sm bg-neutral-700 border-neutral-400"
                } `}
                onClick={() => setCategory("vr")}
            >
                VR
            </button>
            <button
                className={`px-3 py-0.5 rounded-full border border-neutral-600 hover:bg-neutral-700   ${
                    catergory == "other" &&
                    "shadow-sm bg-neutral-700 border-neutral-400"
                } `}
                onClick={() => setCategory("other")}
            >
                Others
            </button>
        </div>
    );
};

export default CategorySelect;
