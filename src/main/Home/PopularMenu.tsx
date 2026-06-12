import FoodCard, { FoodCardProps } from '@/components/shared/FoodCard';
import Link from 'next/link';


const PopularMenu = () => {
    const foodItems: FoodCardProps[] = [
        {
            title: "Cheese Burger Combo",
            description: "Burger, fries & drink combo meal",
            price: 8.5,
            image: "/assets/pizza.png",
            badge: "20% off"
        },
        {
            title: "Pepperoni Pizza",
            description: "12” pizza with extra cheese & pepperoni",
            price: 12.99,
            image: "/assets/pizza.png",
        },
        {
            title: "Chicken Wings",
            description: "Spicy crispy wings with sauce",
            price: 9.99,
            image: "/assets/pizza.png",
            badge: "20% off"
        },
        {
            title: "Veggie Burger",
            description: "Healthy plant-based burger meal",
            price: 7.5,
            image: "/assets/pizza.png",
        },
        {
            title: "Chicken Wrap",
            description: "Grilled chicken wrap with fresh veggies",
            price: 6.99,
            image: "/assets/pizza.png",
        },
        {
            title: "French Fries",
            description: "Crispy golden fries with ketchup",
            price: 3.5,
            image: "/assets/pizza.png",
            badge: "20% off"
        },
        {
            title: "Ice Cream Sundae",
            description: "Chocolate sundae with toppings",
            price: 4.99,
            image: "/assets/pizza.png",
        },
        {
            title: "BBQ Chicken Pizza",
            description: "Smoky BBQ chicken with cheese",
            price: 13.99,
            image: "/assets/pizza.png",
        },
    ];
    return (
        <section className='w-10/12 mx-auto '>
            <h2 className='text-white text-5xl text-center font-bold my-12'>Popular Menu</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {foodItems.map((food) => (
                    <FoodCard
                        key={food.title}
                        title={food.title}
                        description={food.description}
                        price={food.price}
                        image={food.image}
                        badge={food.badge}
                    // onAdd={() => console.log("Added to cart")}
                    />
                ))}
            </div>
            <div className='text-center pt-12'>
                <Link href="/menu" className='text-secondary text-2xl font-bold tracking-wide'>Explore Full Menu</Link>
            </div>
        </section>
    );
};

export default PopularMenu;