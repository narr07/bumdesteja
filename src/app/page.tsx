import HeroSection from "@/components/HeroSection";
import WisataSection from "@/components/WisataSection";
import UmkmSection from "@/components/UmkmSection";
export default function Home() {
	return (
		<main className="scroll-container">
			<HeroSection />
			<WisataSection />
			<UmkmSection />
		</main>
	);
}
