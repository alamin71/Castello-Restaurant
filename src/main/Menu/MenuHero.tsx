import Container from "@/components/shared/Container";

const MenuHero = () => {
  return (
    <section
      className="w-full max-w-360 mx-auto relative min-h-50 md:min-h-64 lg:min-h-96 py-12 md:py-14 lg:py-16 flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/Menu Banner.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Text content */}
      <Container className="relative z-10">
        <div className="space-y-4 max-w-xs sm:max-w-sm lg:max-w-lg text-left text-white">
          <div className="h-0.5 bg-secondary w-1/3" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold pb-1">
            Taste the Flavor
          </h2>

          <p className="text-sm sm:text-base font-normal text-white/80">
            Explore a wide range of freshly prepared pizzas, sides, and drinks.
            Crafted with quality ingredients and made to satisfy every craving.
          </p>
        </div>
      </Container>

      {/* Kebab — upper-left cluster, behind the text on mobile, beside it on lg */}
    </section>
  );
};

export default MenuHero;
