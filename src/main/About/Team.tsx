import FlipStack from '@/components/ui/flipstack';
import Image from 'next/image';

export default function FlipStackDemo() {
    const cards = [
        {
            id: 1,
            content: (
                <Image
                    src='/assets/Team2.png'
                    alt='Isabelle Carlos'
                    className='w-full h-105 object-cover'
                    height={420}
                    width={2000}
                />
            ),
        },
        {
            id: 2,
            content: (
                <Image
                    src='/assets/Team.png'
                    alt='Isabelle Carlos'
                    className='w-full h-105 object-cover'
                    height={420}
                    width={2000}
                />
            ),
        },
        {
            id: 3,
            content: (
                <Image
                    src='/assets/Team2.png'
                    alt='Isabelle Carlos'
                    className='w-full h-105 object-cover'
                    height={420}
                    width={2000}
                />
            ),
        },
        {
            id: 4,
            content: (
                <Image
                    src='/assets/Team.png'
                    alt='Isabelle Carlos'
                    className='w-full h-105 object-cover'
                    height={420}
                    width={2000}
                />
            ),
        },
        {
            id: 5,
            content: (
                <Image
                    src='/assets/Team.png'
                    alt='Isabelle Carlos'
                    className='w-full h-105 object-cover'
                    height={420}
                    width={2000}
                />
            ),
        },
    ];

    return (
        <>
            <section className="flex flex-col justify-center items-center text-white my-16">
                <div className="h-0.5 bg-secondary w-48" />
                <h2 className="text-5xl font-bold pb-4 mt-4">Meet Our Team</h2>
                <p className="text-base font-normal max-w-3xl text-center">Our team is dedicated to delivering the best experience possible. From the kitchen to customer service, every member works with passion, care, and attention to detail.</p>
            </section>
            <div className='w-full lg:hidden flex flex-col items-center gap-4 overflow-clip'>
                <FlipStack cards={cards} />
            </div>

            <div className='hidden lg:flex overflow-visible items-center justify-center'>
                <FlipStack cards={cards} />
            </div>
        </>
    );
}
