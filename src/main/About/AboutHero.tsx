import Image from "next/image";
import Container from "@/components/shared/Container";

const AboutHero = () => {
  return (
    <section className="w-full max-w-360 mx-auto">
      <Container className="py-10 lg:py-14">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">

          {/* Text */}
          <div className="flex-1 space-y-4 text-center md:text-left text-white">
            <div className="h-0.5 bg-secondary w-32 mx-auto md:mx-0" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
              About Castello
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-normal max-w-prose mx-auto md:mx-0">
              We&apos;re passionate about serving fresh, delicious pizza made with
              quality ingredients. From quick bites to memorable meals, we&apos;re
              here to make every experience enjoyable.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 w-full relative h-64 sm:h-80 lg:h-96">
            <Image
              src="/assets/About.png"
              alt="About Castello"
              fill
              className="object-contain md:object-right"
              priority
            />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutHero;
