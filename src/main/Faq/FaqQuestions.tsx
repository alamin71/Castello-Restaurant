import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FaqQuestions = () => {
    type IFaq = {
        id: number,
        question: string,
        answer: string,
    }

    const faqs: IFaq[] = [
        {
            id: 1,
            question: "1. How can I place an order?",
            answer:
                "You can easily place your order through our website by browsing the menu and selecting your favorite items. You can also visit any of our branches to order in person or choose takeaway. Our ordering process is simple, quick, and designed for your convenience.",
        },
        {
            id: 2,
            question: "2. Can I customize my pizza?",
            answer:
                "Yes, absolutely! You can customize your pizza by choosing your preferred size, crust, and toppings. Whether you like extra cheese, more veggies, or specific flavors, we give you the flexibility to create your perfect pizza just the way you want.",
        },
        {
            id: 3,
            question: "3. Do you offer home delivery?",
            answer:
                "Yes, we provide fast and reliable home delivery service. Once you place an order, our team prepares your food fresh and ensures it is delivered hot and in perfect condition right to your doorstep.",
        },
        {
            id: 4,
            question: "4. How long does delivery take?",
            answer:
                "Delivery usually takes around 30 to 45 minutes depending on your location and order volume. During peak hours or busy times, it may take slightly longer, but we always aim to deliver as quickly as possible without compromising quality.",
        },
        {
            id: 5,
            question: "5. Can I order for takeaway?",
            answer:
                "Yes, you can place your order in advance and pick it up from your nearest branch at your convenience. This is a great option if you're on the go and want to avoid waiting time while still enjoying fresh food.",
        },
        {
            id: 6,
            question: "6. Do you have dine-in facilities?",
            answer:
                "Yes, we offer a comfortable and welcoming dine-in experience at our locations. You can enjoy your meal in a relaxed environment with friends and family while experiencing our service firsthand.",
        },
        {
            id: 7,
            question: "7. Do you provide catering services?",
            answer:
                "Yes, we offer catering services for a variety of events including parties, corporate gatherings, and special occasions. Our team can help you choose the right menu to suit your needs and ensure a great food experience for your guests.",
        },
        {
            id: 8,
            question: "8. What payment methods do you accept?",
            answer:
                "We accept multiple payment options including cash and popular digital payment methods. Depending on your location, additional payment options may also be available for your convenience.",
        },
    ];

    return (
        <div className="w-10/12 mx-auto">
            <section className="flex flex-col justify-center items-center text-white my-16">
                <div className="h-0.5 bg-secondary w-1/4" />
                <h2 className="text-5xl font-bold pb-4 mt-4">Frequently Asked Questions</h2>
            </section>
            <section className="mb-10">
                <Accordion type="single" collapsible>
                    {faqs.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.question}
                            className="mb-2"
                        >
                            <AccordionTrigger>
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
};

export default FaqQuestions; 