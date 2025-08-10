// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
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
			<nav className="flex h-16 items-center justify-between rounded-b-[40px] bg-pastel px-4 py-2 text-zaitun shadow-md md:px-24">
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
				<div className="hidden space-x-[32px] md:flex">
					{links.map((link) => {
						// Untuk homepage, hanya match jika pathname === '/'
						const isActive =
              link.href === "/"
              	? pathname === "/"
              	: pathname.startsWith(link.href);
						return (
							<Button
								asChild
								key={link.href}
								variant={isActive ? "lemon" : "ghost"}
								className="text-lg font-semibold"
							>
								<Link href={link.href}>{link.label}</Link>
							</Button>
						);
					})}
				</div>
				{/* MOBILE NAV */}
				<div className="md:hidden">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button size="icon" variant="ghost">
								{open ? (
									<X className="h-7 w-7" />
								) : (
									<Menu className="h-7 w-7" />
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							align="end"
							sideOffset={8}
							className="flex w-48 flex-col items-center"
						>
							{links.map((link) => {
								const isActive =
                  link.href === "/"
                  	? pathname === "/"
                  	: pathname.startsWith(link.href);
								return (
									<Button
										asChild
										key={link.href}
										onClick={() => setOpen(false)}
										variant={isActive ? "lemon" : "ghost"}
										className="w-full justify-start text-base"
									>
										<Link href={link.href}>{link.label}</Link>
									</Button>
								);
							})}
						</PopoverContent>
					</Popover>
				</div>
			</nav>
		</div>
	);
}
