import Image from "next/image";
import FoodCard from "@/components/shared/FoodCard";
import { PIZZAS } from "./pizzaData";

const Pizzas = () => {
    return (
        <section className="w-10/12 mx-auto mb-12">
            <h2 className="text-white text-5xl font-bold my-12">Pizzas</h2>

            {/* Special pizza options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button className="flex items-center gap-4 bg-[#1a1a1a] border border-[#333] rounded-2xl p-5 text-left hover:border-[#555] transition-colors group">
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center">
                        <Image src="/icons/pizza-vector.svg" alt="Make Your Own Pizza" width={48} height={48} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-lg leading-tight">Make Your Own Pizza</p>
                        <p className="text-gray-400 text-sm mt-1 leading-snug">Here you can choose from all the toppings we offer and make your own pizza.</p>
                    </div>
                    <svg className="shrink-0 text-gray-400 group-hover:text-white transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                <button className="flex items-center gap-4 bg-[#1a1a1a] border border-[#333] rounded-2xl p-5 text-left hover:border-[#555] transition-colors group">
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center">
                        <Image src="/icons/pizza-half.svg" alt="Half and Half Pizza" width={48} height={48} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-lg leading-tight">Half &amp; Half Pizza</p>
                        <p className="text-gray-400 text-sm mt-1 leading-snug">Here you can choose two pizzas from the menu, each half of them, and customize them.</p>
                    </div>
                    <svg className="shrink-0 text-gray-400 group-hover:text-white transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {PIZZAS.map((pizza, i) => (
                    <FoodCard
                        key={i}
                        title={pizza.title}
                        description={pizza.description}
                        badge={pizza.badge}
                        sizes={pizza.sizes}
                        image="/assets/pizza.png"
                    />
                ))}
            </div>
        </section>
    );
};

export default Pizzas;
