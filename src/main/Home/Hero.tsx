import Image from "next/image";
import Carousel from "./Carousel";
import Container from "@/components/shared/Container";

interface Service {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        id: 1,
        icon: "/icons/Dining.svg",
        title: "Dine-In Experience",
        description: "Enjoy your meal in a comfortable space",
    },
    {
        id: 2,
        icon: "/icons/Truck.svg",
        title: "Fast Home Delivery",
        description: "Hot and fresh food at your doorstep",
    },
    {
        id: 3,
        icon: "/icons/Serve.svg",
        title: "Catering Service",
        description: "Perfect meals for parties and events",
    },
];

const Hero = () => {
    return (
        <section className="w-full max-w-360 mx-auto md:grid md:grid-rows-[1fr_auto] md:h-[calc(100vh-80px)] md:max-h-225">
            <Carousel />
            <div className="bg-[#1a1a1a] py-4 md:py-6">
                <Container className="grid grid-cols-3 divide-x divide-white/10">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col items-center text-center gap-1.5 md:gap-3 px-2 md:px-8"
                        >
                            <div>
                                <Image
                                    src={service.icon}
                                    alt={service.title}
                                    width={54}
                                    height={48}
                                    className="w-7 h-6 md:w-14 md:h-12"
                                />
                            </div>

                            <div className="flex flex-col items-center gap-0.5">
                                <h3 className="text-white text-[10px] leading-tight sm:text-sm md:text-xl font-bold tracking-wide">
                                    {service.title}
                                </h3>

                                <p className="text-[#B5B5B5] hidden md:block md:text-sm lg:text-base leading-snug">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </Container>
            </div>
        </section>
    );
};

export default Hero;