import Image from 'next/image';

const FaqHero = () => {
    return (
        <section className="w-11/12 md:w-10/12 mx-auto">
            <div className='text-white rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8'>

                <div className="space-y-4 flex-1 text-center lg:text-left">
                    <div className="h-0.5 bg-secondary w-1/3 mx-auto lg:mx-0" />

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
                        Got Questions?
                    </h2>

                    <p className="text-sm sm:text-base font-normal">
                        Find answers to common questions about our menu, delivery, takeaway, and services. We’re here to make your experience smooth and hassle-free.
                    </p>
                </div>

                <div className="flex-1 w-full">
                    <Image
                        src="/assets/Faq.png"
                        alt="BranchLocation"
                        className="rounded-2xl w-full h-64 sm:h-80 lg:h-96 object-contain"
                        width={1900}
                        height={1900}
                    />
                </div>
            </div>
        </section>
    );
};

export default FaqHero;