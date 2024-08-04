import { projectContext } from "@/context/projectContext";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import {
    BiComment,
    BiHeart,
    BiLike,
    BiSolidComment,
    BiSolidHeart,
    BiSolidLike,
} from "react-icons/bi";

import React, { useContext, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Button from "./ui/Button";
import TextInput from "./formComponants/textInput";
import { addComment, likeProject, unLikeProject } from "@/firebase/firebase.db";
import Comment from "./ui/comment";

const ProjectCard = ({ project }) => {
    const { user } = useContext(projectContext);
    const [isLiked, setIsLiked] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [commentSec, setCommentSec] = useState(false);
    const [comments, setComments] = useState([]);
    const [likeCount, setLikeCount] = useState(0);

    const [comment, setComment] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            if (project.likes) {
                const likes = project.likes;

                likes?.map((like) => {
                    console.log("likes", likes);
                    if (like === user?.username) {
                        setIsLiked(true);
                    }
                });

                setLikeCount(likes.length);
            }
            setComments(project.comments);
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log("comments", comments);
    }, [comments]);

    useEffect(() => {
        if (textareaRef.current) {
            // Reset the height to auto so that the scrollHeight can be recalculated
            textareaRef.current.style.height = "auto";
            // Set the height to the scrollHeight to fit the content
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                100
            )}px`;
        }
    }, [comment]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const renderTech = () => {
        const tags = project.tech?.split(",");
        return (
            <>
                {tags?.map((tag) => {
                    return (
                        <div
                            key={tag}
                            className="md:px-2 md:py-0.5 px-1 text-white border text-sm border-white rounded-full"
                        >
                            {tag}
                        </div>
                    );
                })}
            </>
        );
    };

    const handleFav = () => {
        if (!user) {
            alert("Login First!");
            return;
        }
        if (isFav) setIsFav(false);
        else setIsFav(true);
    };

    const handleLike = async () => {
        if (!user) {
            alert("Login First!");
            return;
        }

        if (isLiked) {
            await unLikeProject(project.id, user.username, project.category);
            setLikeCount((p) => p - 1);
            setIsLiked(false);
        } else {
            await likeProject(project.id, user.username, project.category);
            setLikeCount((p) => p + 1);
            setIsLiked(true);
        }
    };

    const handleSendComment = async () => {
        if (!user) {
            alert("Login First!");
            return;
        }
        if (comment) {
            await addComment(
                project.id,
                user.username,
                comment,
                project.category
            );
            if (comments) {
                setComments((p) => [
                    ...p,
                    { username: user.username, comment },
                ]);
            } else {
                setComments((p) => [{ username: user.username, comment }]);
            }
        }
        setComment("");
    };

    const renderComments = () => {
        return (
            <>
                {comments?.map((com) => {
                    return <Comment com={com} />;
                })}
            </>
        );
    };

    return (
        <article
            className={`overflow-hidden transition-all duration-200 gap-8 flex 
            ${commentSec ? "col-span-2" : "col-span-1"}
            ${
                project?.auther === user?.username
                    ? "border-white"
                    : "border-neutral-600"
            }  p-2  border-2 border-dashed rounded-lg  shadow-sm `}
        >
            <div className="flex flex-col justify-between w-full">
                <Image
                    alt={project.projectName}
                    width={480}
                    height={480}
                    src={project.photos[0]}
                    className="h-56 w-full object-cover rounded-lg"
                />

                <div className="p-2">
                    <Link href={`/display/${project.id}`}>
                        <h3 className="text-lg font-medium text-neutral-200">
                            {project.projectName}
                        </h3>
                    </Link>

                    <div className="flex flex-wrap gap-1 mt-2">
                        {renderTech()}
                    </div>

                    <p className="mt-2 h-16 line-clamp-3 text-sm text-gray-400">
                        {project.about}
                    </p>

                    <Link href={`/box/${project.auther}`}>
                        <h3 className="flex items-center mt-2 text-neutral-400 gap-2">
                            <FaRegUserCircle /> {project.auther}
                        </h3>
                    </Link>

                    <div className="text-neutral-200 mt-3 flex text-2xl justify-between ">
                        <div className="flex gap-2">
                            <button
                                onClick={handleLike}
                                className="flex gap-2 bg-neutral-700 px-2 py-1 rounded-full items-center  hover:scale-110 transition-all duration-150"
                            >
                                {isLiked ? <BiSolidLike /> : <BiLike />}{" "}
                                <p className="text-base">{likeCount}</p>
                            </button>
                            <button
                                onClick={() => setCommentSec((p) => !p)}
                                className="flex gap-2 bg-neutral-700 px-2 py-1 rounded-full items-center hover:scale-110 transition-all duration-150"
                            >
                                {commentSec ? (
                                    <BiSolidComment />
                                ) : (
                                    <BiComment />
                                )}
                                <p className="text-base">
                                    {comments ? comments.length : 0}
                                </p>
                            </button>
                        </div>
                        <button
                            onClick={handleFav}
                            className="hover:scale-110 transition-all duration-150"
                        >
                            {isFav ? <BiSolidHeart /> : <BiHeart />}
                        </button>
                    </div>

                    <Link
                        href={`/display/${project.id}`}
                        className="mt-3 block"
                    >
                        <Button rounded="true" lable="View Project ->" />
                    </Link>
                </div>
            </div>

            {commentSec && (
                <div className="bg-neutral-800 p-2 rounded-lg w-full gap-2 flex flex-col justify-between h-full">
                    <h1 className="text-neutral-200 text-2xl font-bold tracking-wide">
                        Comments
                    </h1>
                    <div className="flex flex-col justify-start h-full overflow-auto gap-3">
                        {renderComments()}
                    </div>

                    <div className="flex items-center w-full gap-2">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={comment}
                            onChange={handleCommentChange}
                            type="text"
                            className="w-full block rounded-md bg-neutral-900 text-neutral-200 px-2"
                        />
                        <Button onClick={handleSendComment} rounded>
                            Send
                        </Button>
                    </div>
                </div>
            )}
        </article>
    );
};

export default ProjectCard;
