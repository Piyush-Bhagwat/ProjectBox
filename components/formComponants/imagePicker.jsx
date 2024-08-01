import Image from "next/image";
import React from "react";

const ImagePicker = ({ handleSelect, image, idx }) => {
    return (
        <div className="mt-2 w-[46%] md:w-[27%] aspect-square bg-neutral-800 items-center flex justify-center rounded-lg border-2 border-dashed border-neutral-600 p-3 ">
            <div className="text-center ">
                {image ? (
                    <>
                        <label htmlFor={`file-upload-${idx}-change`}>
                            <span className="text-blue-500 block mb-3">
                                Change
                            </span>
                            <input
                                id={`file-upload-${idx}-change`}
                                name="file-upload"
                                type="file"
                                onChange={(e) => handleSelect(e, parseInt(idx))}
                                accept="image/png, image/gif, image/jpeg, image/jpg"
                                className="sr-only"
                            />
                        </label>
                        <Image
                            width={300}
                            height={300}
                            className="w-full aspect-square object-contain rounded-md shadow-md"
                            src={image.url}
                            alt="hello"
                        />
                    </>
                ) : (
                    <>
                        <div className="mt-4 flex text-sm leading-6 text-gray-50">
                            <label
                                htmlFor={`file-upload-${idx}`}
                                className="relative px-2 cursor-pointer rounded-md bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input
                                    id={`file-upload-${idx}`}
                                    name="file-upload"
                                    type="file"
                                    onChange={(e) =>
                                        handleSelect(e, parseInt(idx))
                                    }
                                    accept="image/png, image/gif, image/jpeg, image/jpg"
                                    className="sr-only"
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-50">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImagePicker;
