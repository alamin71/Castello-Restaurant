import FoodCard from "@/components/shared/FoodCard";

const SpecialOffer = () => {
  return (
    <section className="w-10/12 mx-auto ">
      <h2 className="text-white text-5xl text-left font-bold mb-12 mt-12">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <FoodCard
            key={i}
            title="12’’ Home Delivery Offer"
            description="12” pizza with 2 toppings, small breadsticks & 2L soda"
            price={12.99}
            image="/assets/pizza.png"
            // onAdd={() => console.log("Added to cart")}
          />
        ))}
      </div>
    </section>
  );
};

export default SpecialOffer;
