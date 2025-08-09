"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "./ui/popover";
export default function Navbar() {
	const pathname = usePathname();
	const links = [
		{ href: "/", label: "Home" },
		{ href: "/program", label: "Program" },
		{ href: "/wisata", label: "Wisata" },
		{ href: "/umkm", label: "UMKM" },
		{ href: "/informasi", label: "Informasi" },
	];
	const [open, setOpen] = useState(false);
	return (
		<div className="fixed top-0 left-0 z-50 w-full">
			<nav className="h-16 flex items-center justify-between rounded-b-[40px] bg-pastel px-4 md:px-24 py-2 text-zaitun shadow-md">
				<Link href="/">
					<Image
						src="/LogoWebFull.svg"
						alt="Logo"
						width={80}
						height={30}
						priority
						unoptimized
						className="block"
					/>
				</Link>
				<div className="hidden md:flex space-x-[32px]">
					{links.map((link) => (
						<Link key={link.href} href={link.href}>
							<Button variant={pathname === link.href ? "default" : "ghost"} className="text-lg font-semibold">
								{link.label}
							</Button>
						</Link>
					))}
				</div>
				{/* MOBILE NAV */}
				<div className="md:hidden">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button size="icon" variant="ghost">
								{open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							align="end"
							sideOffset={8}
							className="w-48 flex flex-col items-center"
						>
							{links.map((link) => (
								<Link key={link.href} href={link.href}>
									<Button
										onClick={() => setOpen(false)}
										variant={pathname === link.href ? "default" : "ghost"}
										className="w-full text-base justify-start"
									>
										{link.label}
									</Button>
								</Link>
							))}
						</PopoverContent>
					</Popover>
				</div>
			</nav>
		</div>
	);
}
