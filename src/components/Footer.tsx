import { getVisitorCounts } from "@/lib/db";
export default async function Footer() {
	const counts = await getVisitorCounts();
	return (
		<footer className="mt-10 w-full border-t py-6 text-center text-sm text-neutral-600">
			<div className="flex flex-col items-center justify-center gap-1">
				<div>
          Pengunjung hari ini:{" "}
					<span className="font-semibold">{counts.today}</span>
				</div>
				<div>
          Total pengunjung:{" "}
					<span className="font-semibold">{counts.total}</span>
				</div>
				<div className="text-[10px] opacity-60">
          Data berdasarkan unique IP yang di-hash (SHA-256)
				</div>
			</div>
		</footer>
	);
}
