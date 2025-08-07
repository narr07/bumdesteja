"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function Navbar() {
	const pathname = usePathname();
	const links = [
		{ href: "/", label: "Home" },
		{ href: "/program", label: "Program" },
		{ href: "/wisata", label: "Wisata" },
		{ href: "/umkm", label: "UMKM" },
		{ href: "/informasi", label: "Informasi" },
	];
	return (
		<div className="fixed top-0 left-0 z-50 w-full">
			<nav className="flex items-center justify-between rounded-b-[40px] bg-pastel px-24 py-2 text-zaitun shadow-md">
				<div>
					<Link href="/">
						<Image
							src="/LogoWebFull.svg"
							alt="Logo"
							width={120}
							height={40} // sesuaikan ukuran sesuai desain
							priority // opsional, untuk logo utama agar prioritas di-load
							unoptimized
						/>
					</Link>
				</div>
				<div className="flex space-x-[32px]">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`p-2 ${pathname === link.href ? "font-bold" : ""} ${link.href === "/informasi" ? "rounded-2xl border bg-zaitun text-white" : ""}`}
						>
							{link.label}
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
}
