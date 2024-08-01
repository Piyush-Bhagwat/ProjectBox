import { Space_Mono } from "next/font/google";
import "./globals.css";
import ProjectContext from "@/context/projectContext";

const inter = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "ProjectBox | Home";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata = {
    title: APP_DEFAULT_TITLE,
    manifest: "/manifest.json",
    description:
        "ProjectBox is an innovative platform designed to help developers document, manage, and showcase their projects efficiently. It serves as a comprehensive repository where developers can store detailed information about their projects, making it easier to reference and share their work.",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
};

export const viewport = {
    themeColor: "#404040",
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
