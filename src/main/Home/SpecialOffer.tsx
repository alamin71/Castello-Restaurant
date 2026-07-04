import FoodCard from "@/components/shared/FoodCard";
import Container from "@/components/shared/Container";

const SpecialOffer = () => {
  return (
    <Container className="py-12">
      <h2 className="text-white text-5xl text-left font-bold mb-12">
        Special Offers
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <FoodCard
            key={i}
            title="12'' Home Delivery Offer"
            description="12&quot; pizza with 2 toppings, small breadsticks &amp; 2L soda"
            price={12.99}
            image="/assets/pizza.png"
            allowHalfHalf
          />
        ))}
      </div>
    </Container>
  );
};

export default SpecialOffer;
