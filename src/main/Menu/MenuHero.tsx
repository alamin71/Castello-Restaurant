import Image from "next/image";

const MenuHero = () => {
    return (
        <section className="relative min-h-50 md:min-h-60 lg:min-h-70 py-12 md:py-14 lg:py-16 flex items-center overflow-hidden">

            {/* Text content — constrained width so it never collides with the images */}
            <div className="relative z-10 w-full md:max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
                <div className="space-y-4 max-w-xs sm:max-w-sm lg:max-w-lg  lg:text-left text-white">
                    <div className="h-0.5 bg-secondary w-1/3 md:mx-auto lg:mx-0" />

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
                        Taste the Flavor
                    </h2>

                    <p className="text-sm sm:text-base font-normal text-white/80">
                        Explore a wide range of freshly prepared pizzas, sides, and drinks.
                        Crafted with quality ingredients and made to satisfy every craving.
                    </p>
                </div>
            </div>

            {/* Kebab — upper-left cluster, behind the text on mobile, beside it on lg */}
            <Image
                src="/icons/kebab.svg"
                alt="kebab"
                height={144}
                width={180}
                className="absolute top-6 left-32 sm:left-44 lg:left-56
                           w-16 sm:w-28 lg:w-44 h-auto
                           opacity-90 pointer-events-none"
            />

            {/* Pizza — lower-left, below the kebab */}
            <Image
                src="/icons/pizza.svg"
                alt="pizza"
                height={144}
                width={120}
                className="absolute bottom-0 left-16 sm:left-28 lg:left-36
                           w-12 sm:w-20 lg:w-32 h-auto
                           opacity-90 pointer-events-none"
            />

            {/* Bowl — upper-right */}
            <Image
                src="/icons/bowl.svg"
                alt="bowl"
                height={144}
                width={120}
                className="absolute top-0 right-16 sm:right-24 lg:right-32
                           w-14 sm:w-24 lg:w-32 h-auto
                           opacity-90 pointer-events-none"
            />

            {/* Chicken — lower-right */}
            <Image
                src="/icons/chicken.svg"
                alt="chicken"
                height={144}
                width={120}
                className="absolute bottom-0 right-0
                           w-14 sm:w-24 lg:w-32 h-auto
                           opacity-90 pointer-events-none"
            />
        </section>
    );
};

export default MenuHero;