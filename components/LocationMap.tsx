
"use client";

import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    CircleMarker,
    useMap,
    useMapEvents,
} from "react-leaflet";

type LocationMapProps = {
    onConfirm: (address: string) => void;
    onClose: () => void;
};

type Position = [number, number];

function MapController({ position }: { position: Position | null }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 17, { duration: 1 });
        }
    }, [position, map]);

    return null;
}

function MapClick({
    position,
    setPosition,
}: {
    position: Position | null;
    setPosition: (position: Position) => void;
}) {
    const map = useMap();

    useMapEvents({
        click(event) {
            const newPosition: Position = [
                event.latlng.lat,
                event.latlng.lng,
            ];

            setPosition(newPosition);
            map.flyTo(newPosition, 17, { duration: 1 });
        },
    });

    return position ? (
        <CircleMarker
            center={position}
            radius={10}
            pathOptions={{
                color: "#ffffff",
                fillColor: "#2563eb",
                fillOpacity: 1,
                weight: 3,
            }}
        />
    ) : null;
}

export default function LocationMap({
    onConfirm,
    onClose,
}: LocationMapProps) {
    const [position, setPosition] = useState<Position | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function getCurrentLocation() {
        if (!navigator.geolocation) {
            setError("Your browser does not support location services.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (location) => {
                setPosition([
                    location.coords.latitude,
                    location.coords.longitude,
                ]);
                setError("");
            },
            () => {
                setError(
                    "Location access denied. Allow location permission or select a point manually."
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );
    }

    async function confirmLocation() {
        if (!position) {
            setError("Please select a location on the map first.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}&addressdetails=1`
            );

            if (!response.ok) {
                throw new Error("Could not retrieve the selected address.");
            }

            const data = await response.json();
            const place = data.address;

            if (!place) {
                throw new Error("No address details found for this location.");
            }

            const street = [
                place.house_number,
                place.road,
            ].filter(Boolean).join(" ");

            const area =
                place.neighbourhood ||
                place.suburb ||
                place.quarter ||
                place.residential ||
                place.city_district;

            const city =
                place.city ||
                place.town ||
                place.village ||
                place.municipality ||
                place.county;

            const selectedAddress = [
                street,
                area,
                city,
                place.state,
                place.postcode,
                place.country,
            ]
                .filter(Boolean)
                .filter(
                    (item: string, index: number, array: string[]) =>
                        array.indexOf(item) === index
                )
                .join(", ");

            if (!selectedAddress) {
                throw new Error("No readable address was found.");
            }

            onConfirm(selectedAddress);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while finding the address."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-3">
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Select Delivery Location
                        </h2>
                        <p className="text-sm text-gray-500">
                            Search your area by moving the map and selecting a point.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-700 hover:text-white cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4">
                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="mb-3 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
                    >
                        Use My Current Location
                    </button>

                    <div className="h-[350px] overflow-hidden rounded-xl">
                        <MapContainer
                            center={[30.3753, 69.3451]}
                            zoom={5}
                            scrollWheelZoom={true}
                            className="h-full w-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <MapController position={position} />

                            <MapClick
                                position={position}
                                setPosition={setPosition}
                            />
                        </MapContainer>
                    </div>

                    <p className="mt-3 text-sm text-gray-600">
                        {position
                            ? `Selected coordinates: ${position[0].toFixed(5)}, ${position[1].toFixed(5)}`
                            : "Select a point on the map or use your current location."}
                    </p>

                    {error && (
                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="mt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-800 cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={confirmLocation}
                            disabled={loading || !position}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 enabled:cursor-pointer"
                        >
                            {loading ? "Finding Address..." : "Confirm Location"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
