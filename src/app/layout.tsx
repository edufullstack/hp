import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Prueba técnica",
	description: "Prueba de desarrollo full stack",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} container_body`}>
				<Navbar></Navbar>
				<div className="container_app">{children}</div>
				<Footer></Footer>
			</body>
		</html>
	);
}
