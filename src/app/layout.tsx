import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});
export const metadata: Metadata = {
	title: "BUMDes Teja",
	description: "Badan Usaha Milik Desa Teja - Membangun Masa Depan Desa Teja",
};
export default async function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const draft = await draftMode();
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`}>
				<Navbar />
				<div className="py-20">{children}</div>
				{draft.isEnabled && (
					<>
						<VisualEditing />
						<DisableDraftMode />
					</>
				)}
			</body>
		</html>
	);
}
