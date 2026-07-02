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
            <div className="bg-[#1a1a1a] py-6 md:py-14">
                <div className="grid grid-cols-3 w-11/12 md:w-10/12 mx-auto divide-x divide-white/10">
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

                            <h3 className="text-white text-[10px] leading-tight sm:text-sm md:text-xl font-bold tracking-wide">
                                {service.title}
                            </h3>

                            <p className="text-[#B5B5B5] hidden md:block md:text-sm lg:text-base leading-relaxed">
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