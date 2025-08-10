// src/components/WisataMap.tsx
"use client";
import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
// Lazy-load react-leaflet components (client only)
const MapContainer = dynamic(
	() => import("react-leaflet").then((m) => m.MapContainer),
	{ ssr: false }
);
const TileLayer = dynamic(
	() => import("react-leaflet").then((m) => m.TileLayer),
	{ ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
	ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
	ssr: false,
});
type LatLngExpression = [number, number];
let leafletReady = false;
interface WisataMapProps {
  location?: { lat?: number; lng?: number } | null;
  name?: string;
  heightClass?: string; // allow override
  zoom?: number;
  showAttribution?: boolean; // control default attribution display
  customAttribution?: string; // override attribution text
  showExternalButtons?: boolean; // show buttons under map
}
export function WisataMap({
	location,
	name,
	heightClass = "h-80 md:h-96",
	zoom = 15,
	showAttribution = true,
	showExternalButtons = true,
}: WisataMapProps) {
	const hasLat = typeof location?.lat === "number";
	const hasLng = typeof location?.lng === "number";
	const center = useMemo<LatLngExpression | null>(() => {
		return hasLat && hasLng ? [location!.lat!, location!.lng!] : null;
	}, [hasLat, hasLng, location]);
	const [ready, setReady] = useState(false);
	useEffect(() => {
		let cancelled = false;
		(async () => {
			if (!leafletReady) {
				const L = (await import("leaflet")).default;
				const iconRetinaUrl = (
					await import("leaflet/dist/images/marker-icon-2x.png")
				).default;
				const iconUrl = (await import("leaflet/dist/images/marker-icon.png"))
					.default;
				const shadowUrl = (
					await import("leaflet/dist/images/marker-shadow.png")
				).default;
				const DefaultIcon = L.icon({
					iconRetinaUrl:
            typeof iconRetinaUrl === "string"
            	? iconRetinaUrl
            	: iconRetinaUrl.src,
					iconUrl: typeof iconUrl === "string" ? iconUrl : iconUrl.src,
					shadowUrl: typeof shadowUrl === "string" ? shadowUrl : shadowUrl.src,
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					shadowSize: [41, 41],
				});
				L.Marker.prototype.options.icon = DefaultIcon;
				leafletReady = true;
			}
			if (!cancelled) setReady(true);
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	if (!center || !ready) return null; // skip until coords + leaflet ready
	return (
		<div
			className={`w-full overflow-hidden rounded-xl border border-neutral-200 shadow ${heightClass} relative`}
		>
			<MapContainer
				center={center}
				zoom={zoom}
				scrollWheelZoom
				attributionControl={showAttribution}
				className="z-10 h-full w-full"
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution={undefined}
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={center}>
					<Popup>
						<div className="text-sm">
							<p className="font-semibold">{name || "Lokasi"}</p>
							<p className="text-neutral-600">
                Lat: {location?.lat?.toFixed(5)}, Lng:{" "}
								{location?.lng?.toFixed(5)}
							</p>
						</div>
					</Popup>
				</Marker>
			</MapContainer>
			{/* Tombol di depan peta */}
			{showExternalButtons && (
				<div className="absolute top-4 right-4 z-50 flex flex-col gap-2 rounded-md bg-white p-2 shadow">
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${location?.lat},${location?.lng}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center rounded-md bg-lime-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:outline-none"
					>
            Buka di Google Maps
					</a>
					<a
						href={`https://www.google.com/maps/dir/?api=1&destination=${location?.lat},${location?.lng}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
					>
            Petunjuk Arah
					</a>
				</div>
			)}
			{/* Attribution kecil jika perlu */}
			{!showAttribution && (
				<p className="mt-1 hidden text-[10px] text-neutral-400 md:block">
          Data © OpenStreetMap contributors
				</p>
			)}
		</div>
	);
}
export default WisataMap;
