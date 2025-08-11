import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { VisualEditing } from "next-sanity";
import { draftMode, headers } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { trackVisit } from "@/lib/db";
import Footer from "@/components/Footer";
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});
export const metadata: Metadata = {
	title: "BUMDes Teja",
	description: "Badan Usaha Milik Desa Teja - Membangun Masa Depan Desa Teja",
};
// Force dynamic so visitor tracking & counts always update
export const dynamic = "force-dynamic";
export default async function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const draft = await draftMode();
	// Track visit (unique per IP per day, IP hashed in DB)
	try {
		const h = await headers();
		const ip =
      h.get("x-forwarded-for")?.split(",")[0].trim() ||
      h.get("x-real-ip") ||
      "0.0.0.0";
		await trackVisit(ip);
	} catch (e) {
		// swallow errors to avoid breaking page render
		console.error("visit track error", e);
	}
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
				<Footer />
			</body>
		</html>
	);
}
