import { MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";

interface LocationCard {
    id: string;
    city: string;
    phone: string;
    hours: string;
    address: string;
    image: string;
}

export function Branches() {
    const locations: LocationCard[] = [
        {
            id: "01",
            city: "Hafnarfjörður",
            phone: "+354 5512345",
            hours: "Everyday, 11:00 AM - 11:00 PM",
            address: "Dalshraun 13, 220 Hafnarfjörður, Iceland",
            image: "/assets/location.png",
        },
        {
            id: "02",
            city: "Kópavogur",
            phone: "+354 5512345",
            hours: "Everyday, 11:00 AM - 11:00 PM",
            address: "Dalvegur 2, 201 Kópavogur, Iceland",
            image: "/assets/location.png",
        },
        {
            id: "03",
            city: "Reykjavík",
            phone: "+354 5512345",
            hours: "Everyday, 11:00 AM - 11:00 PM",
            address: "Lágmúli 7, 108 Reykjavík, Iceland",
            image: "/assets/location.png",
        },
    ];

    return (
        <section>
            <h2 className='text-white text-5xl text-center font-bold mt-0 mb-12'>Branches</h2>
            <Container className="grid md:grid-cols-3 gap-6">
                {locations.map((loc) => (
                    <div
                        key={loc.id}
                        className="bg-[#2a2a2a] text-white rounded-2xl p-3 space-y-4 shadow-lg"
                    >
                        {/* Top */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-secondary text-2xl font-bold">
                                    {loc.id}
                                </h3>
                                <div className="h-0.5 w-10 bg-secondary mt-1" />
                            </div>
                            <button className="text-secondary text-sm flex items-center gap-1">
                                <MapPin size={16} /> Open map
                            </button>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-semibold">{loc.city}</h2>

                        {/* Info */}
                        <div className="space-y-2 text-sm text-gray-300">
                            <p className="flex items-center gap-2">
                                <Phone size={16} /> {loc.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <Clock size={16} /> {loc.hours}
                            </p>
                            <p className="flex items-center gap-2">
                                <MapPin size={16} /> {loc.address}
                            </p>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-64 rounded-xl overflow-hidden">
                            <Image
                                src={loc.image}
                                alt={loc.city}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </Container>
            <div className='text-center py-12'>
                <Link href="/find-a-branch" className='text-white text-2xl font-bold tracking-wide'>Visit our all branches</Link>
            </div>
        </section>
    );
}