"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"

const slides = [
    { src: "/carousel/pizza.png", alt: "Castello Pizza" },
    { src: "/carousel/caroselImgage2.png", alt: "Castello Special" },
    { src: "/carousel/caroselimage3.png", alt: "Castello Offer" },
]

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
            className="w-full aspect-1920/631 md:aspect-auto md:h-full custom-swiper"
        >
            {slides.map((slide, i) => (
                <SwiperSlide key={i} className="relative w-full h-full overflow-hidden">
                    <Image
                        src={slide.src}
                        alt={slide.alt}
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