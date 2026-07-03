import Image from 'next/image';
import Container from '@/components/shared/Container';

const CareerHero = () => {
    return (
        <section className="w-full max-w-360 mx-auto">
            <Container>
            <div className='text-white rounded-lg py-10 lg:py-14 flex flex-col lg:flex-row items-center justify-between gap-8'>

                <div className="space-y-4 flex-1 text-center lg:text-left">
                    <div className="h-0.5 bg-secondary w-1/3 mx-auto lg:mx-0" />

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
                        Build Your Future With Us
                    </h2>

                    <p className="text-sm sm:text-base font-normal">
                        We’re always looking for talented and motivated people to join our team. Explore opportunities and grow with a brand that values passion and teamwork.
                    </p>
                </div>

                <div className="flex-1 w-full">
                    <Image
                        src="/assets/career.png"
                        alt="BranchLocation"
                        className="rounded-2xl w-full h-64 sm:h-80 lg:h-96 object-contain"
                        width={1900}
                        height={1900}
                    />
                </div>
            </div>
            </Container>
        </section>
    );
};

export default CareerHero;