import Image from "next/image";
import Container from "@/components/shared/Container";

const BranchHero = () => {
  return (
    <section className="w-full max-w-360 mx-auto overflow-hidden">
      {/* Hero row */}
      <div className="relative py-10 lg:py-14 mb-12">
        {/* Map — right half, desktop only */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-1/2">
          <Image
            src="/assets/BranchLocation.png"
            alt="Branch location"
            fill
            className="object-contain object-right"
            priority
          />
        </div>

        {/* Text */}
        <Container className="relative z-10">
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left text-white">
            <div className="h-0.5 bg-secondary w-44 mx-auto md:mx-0" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
              Visit Our Branches
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-normal max-w-prose mx-auto md:mx-0">
              Each of our locations is designed to deliver the same quality,
              comfort, and experience you expect from us. Step in, relax, and
              enjoy freshly prepared food made with care.
            </p>
          </div>
        </Container>

        {/* Map — mobile */}
        <Container className="mt-6 md:hidden">
          <Image
            src="/assets/BranchLocation.png"
            alt="Branch location"
            width={900}
            height={400}
            className="w-full h-auto"
            priority
          />
        </Container>
      </div>

      {/* Dine-In / Delivery cards */}
      <Container className="flex flex-col md:flex-row gap-6 pb-10">
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 bg-primary py-5 px-6 rounded-2xl flex-1">
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

        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 bg-primary py-5 px-6 rounded-2xl flex-1">
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
      </Container>
    </section>
  );
};

export default BranchHero;
