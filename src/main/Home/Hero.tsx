import Image from "next/image";
import Carousel from "./Carousel";

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
        <section>
            <Carousel />
            <div className="py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-10/12 mx-auto">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col items-center gap-2 transition-opacity duration-300"
                        >
                            <div className="transition-transform duration-300">
                                <Image
                                    src={service.icon}
                                    alt={service.title}
                                    width={54}
                                    height={48}
                                />
                            </div>

                            <h3 className="text-white text-lg font-semibold tracking-wide">
                                {service.title}
                            </h3>

                            <p className="text-[#B5B5B5] text-base leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;