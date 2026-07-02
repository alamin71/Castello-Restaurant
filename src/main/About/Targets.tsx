import Image from 'next/image';
import React from 'react';

const Targets = () => {
    return (
        <main>
            {/* our story */}
            <section className='bg-primary'>
                <div className="w-11/12 md:w-10/12 mx-auto text-white rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">

                    <div className="space-y-4 flex-1 text-center lg:text-left">
                        <div className="h-0.5 bg-secondary w-32 sm:w-48 mx-auto lg:mx-0" />

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
                            Our Story
                        </h2>

                        <p className="text-white text-sm sm:text-base font-normal">
                            What started as a simple idea to serve great pizza has grown into a place where food, quality, and experience come together. From day one, our focus has been on creating flavors people love and moments they remember.
                        </p>

                        <p className="text-white text-sm sm:text-base font-normal">
                            Every pizza we make is prepared with care, using fresh ingredients and a commitment to consistency. We believe good food has the power to bring people together, and that’s what inspires us every day.
                        </p>
                    </div>

                    <div className="flex-1 w-full">
                        <Image
                            src="/assets/location.png"
                            alt="location"
                            className="rounded-2xl shadow-lg w-full h-64 sm:h-80 lg:h-96 object-cover"
                            width={900}
                            height={400}
                        />
                    </div>
                </div>
            </section>

            {/* our mission */}
            <section>
                <div className="w-11/12 md:w-10/12 mx-auto text-white rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row-reverse items-center justify-between gap-10 lg:gap-20">

                    <div className="space-y-4 flex-1 text-center lg:text-left">
                        <div className="h-0.5 bg-secondary w-32 sm:w-48 mx-auto lg:mx-0" />

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
                            Our Mission
                        </h2>

                        <p className="text-white text-sm sm:text-base font-normal">
                            To deliver fresh, high-quality food with fast and reliable service, making every meal convenient and satisfying for our customers.
                        </p>
                    </div>

                    <div className="flex-1 w-full">
                        <Image
                            src="/assets/location.png"
                            alt="location"
                            className="rounded-2xl shadow-lg w-full h-64 sm:h-80 lg:h-96 object-cover"
                            width={900}
                            height={400}
                        />
                    </div>
                </div>
            </section>

            {/* our vision */}
            <section className='bg-[#222222]'>
                <div className="w-11/12 md:w-10/12 mx-auto text-white rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">

                    <div className="space-y-4 flex-1 text-center lg:text-left">
                        <div className="h-0.5 bg-secondary w-32 sm:w-48 mx-auto lg:mx-0" />

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
                            Our Vision
                        </h2>

                        <p className="text-white text-sm sm:text-base font-normal">
                            To become a trusted and loved brand by offering great taste, consistent quality, and a memorable experience across every location.
                        </p>
                    </div>

                    <div className="flex-1 w-full">
                        <Image
                            src="/assets/location.png"
                            alt="location"
                            className="rounded-2xl shadow-lg w-full h-64 sm:h-80 lg:h-96 object-cover"
                            width={900}
                            height={400}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Targets;