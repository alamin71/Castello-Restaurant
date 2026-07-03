'use client';
import { Button } from '@/components/ui/button';
import ExpandableCards from '@/components/ui/expandable-cards';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/shared/Container';

export default function AboutBranches() {
    const cards = [
        {
            id: 1,
            content: (
                <Image
                    src='/assets/location.png'
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
                    src='/assets/location2.png'
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
                    src='/assets/location.png'
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
                    src='/assets/location2.png'
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
                    src='/assets/location.png'
                    alt='Isabelle Carlos'
                    className='w-full h-105 object-cover'
                    height={420}
                    width={2000}
                />
            ),
        },
    ];

    return (
        <section className="w-full max-w-360 mx-auto">
            <Container className="select-none py-16">

                <div className="flex flex-col justify-center items-center text-white my-16">
                    <div className="h-0.5 bg-secondary w-48" />
                    <h2 className="text-5xl font-bold pb-4 mt-4">Our Branches</h2>
                    <p className="text-base font-normal max-w-3xl text-center">With multiple branches across Iceland, we&apos;re always nearby and ready to serve you. Visit your nearest branch and enjoy the same great taste and experience.</p>
                </div>

                <div className='h-50 md:h-75 w-full'>
                    <ExpandableCards cards={cards} defaultExpanded={1} />
                </div>

                <div className='text-center py-12'>
                    <Link href="/find-a-branch" className='text-white text-2xl font-bold tracking-wide'>Visit our all branches</Link>
                </div>

                <div className='relative bg-secondary py-12 sm:py-16 lg:py-20 px-4 rounded-2xl text-center overflow-hidden'>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-4 mt-4 text-white text-center leading-tight">
                        Ready to enjoy something delicious?
                    </h2>

                    <Button className='bg-white text-black px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base rounded-2xl mt-4'>
                        Order Now
                    </Button>

                    <Image
                        src="/icons/kebab.svg"
                        alt='kebab'
                        height={144}
                        width={180}
                        className='absolute top-0 left-0 w-20 sm:w-28 lg:w-44 h-auto'
                    />
                    <Image
                        src="/icons/pizza.svg"
                        alt='pizza'
                        height={144}
                        width={120}
                        className='absolute bottom-0 left-0 w-16 sm:w-24 lg:w-32 h-auto'
                    />
                    <Image
                        src="/icons/bowl.svg"
                        alt='bowl'
                        height={144}
                        width={120}
                        className='absolute right-0 top-0 w-16 sm:w-24 lg:w-32 h-auto'
                    />
                    <Image
                        src="/icons/chicken.svg"
                        alt='chicken'
                        height={144}
                        width={120}
                        className='absolute right-0 bottom-0 w-16 sm:w-24 lg:w-32 h-auto'
                    />
                </div>

            </Container>
        </section>
    );
}
