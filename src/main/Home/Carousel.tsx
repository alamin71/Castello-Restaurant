"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"

export default function Carousel() {
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            loop={true}
            className="h-[50vh] sm:h-[55vh] md:h-[75vh] lg:h-[82vh] w-full custom-swiper"
        >
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <SwiperSlide key={i} className="relative w-full h-full overflow-hidden">
                    <Image
                        src="/carousel/pizza.png"
                        alt={`slide-${i}`}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
                        quality={100}
                        className="object-cover object-center"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}