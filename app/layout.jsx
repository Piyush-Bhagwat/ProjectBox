import { Inter, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import ProjectContext from "@/context/projectContext";

const inter = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], });

export const metadata = {
    title: "ProjectBox | Home",
    description:
        "ProjectBox is an innovative platform designed to help developers document, manage, and showcase their projects efficiently. It serves as a comprehensive repository where developers can store detailed information about their projects, making it easier to reference and share their work.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <ProjectContext>
                <body className={inter.className}>{children}</body>
            </ProjectContext>
        </html>
    );
}
