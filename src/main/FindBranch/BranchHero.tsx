import Image from 'next/image';

const BranchHero = () => {
    return (
        <section className="w-11/12 lg:w-10/12 mx-auto">
            <div className="text-white rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">

                <div className="space-y-4 flex-1 text-center lg:text-left">
                    {/* Line is full-width on mobile so it feels intentional, constrained on desktop */}
                    <div className="h-0.5 bg-secondary w-16 mx-auto lg:mx-0" />

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
                        Visit Our Branches
                    </h2>

                    <p className="text-white/80 text-sm sm:text-base font-normal max-w-prose mx-auto lg:mx-0">
                        Each of our locations is designed to deliver the same quality, comfort,
                        and experience you expect from us. Step in, relax, and enjoy freshly
                        prepared food made with care.
                    </p>
                </div>

                <div className="flex-1 w-full">
                    <Image
                        src="/assets/BranchLocation.png"
                        alt="Branch location"
                        className="rounded-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
                        width={900}
                        height={400}
                        priority
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Dine-In card */}
                <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 bg-primary py-8 sm:py-10 px-6 rounded-2xl flex-1">
                    <Image
                        src="/icons/DiningRed.svg"
                        alt=""
                        width={96}
                        height={96}
                        className="w-14 sm:w-20 lg:w-24 h-auto shrink-0"
                    />
                    <div>
                        <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
                            Dine-In Waiting
                        </p>
                        <h3 className="text-white text-lg font-semibold tracking-wide">
                            15 - 20 Minutes
                        </h3>
                    </div>
                </div>

                {/* Delivery card */}
                <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 bg-primary py-8 sm:py-10 px-6 rounded-2xl flex-1">
                    <Image
                        src="/icons/Bike.svg"
                        alt=""
                        width={96}
                        height={96}
                        className="w-14 sm:w-20 lg:w-24 h-auto shrink-0"
                    />
                    <div>
                        <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
                            Home Delivery
                        </p>
                        <h3 className="text-white text-lg font-semibold tracking-wide">
                            50 - 60 Minutes
                        </h3>
                        <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
                            Last order at 10:30 PM
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BranchHero;