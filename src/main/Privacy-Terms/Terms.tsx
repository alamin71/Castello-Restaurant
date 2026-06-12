import { ScrollArea } from "@/components/ui/scroll-area";
interface Section {
    title: string;
    content: string;
}

const sections: Section[] = [
    {
        title: "1. Introduction",
        content:
            "Welcome to our website. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before placing an order or using our platform.",
    },
    {
        title: "2. Use of Our Services",
        content:
            "You agree to use our website and services for lawful purposes only. Any misuse, fraudulent activity, or violation of applicable laws may result in restricted access or cancellation of your order.",
    },
    {
        title: "3. Orders & Availability",
        content:
            "All orders are subject to availability and confirmation. We reserve the right to refuse or cancel any order due to product unavailability, pricing errors, or other unforeseen circumstances.",
    },
    {
        title: "4. Pricing & Payment",
        content:
            "All prices are listed in ISK and may change without prior notice. We accept multiple payment methods, and payment must be completed before order processing.",
    },
    {
        title: "5. Delivery & Takeaway",
        content:
            "Delivery times are estimates and may vary depending on location and demand. For takeaway orders, customers are responsible for collecting their orders on time.",
    },
    {
        title: "6. Cancellations & Refunds",
        content:
            "Orders may be cancelled within a limited time after placing them. Refunds, if applicable, will be processed based on our refund policy and payment method used.",
    },
    {
        title: "7. Intellectual Property",
        content:
            "All content on this website, including text, images, and branding, is the property of our company and may not be used without permission.",
    },
    {
        title: "8. Limitation of Liability",
        content:
            "We are not liable for any indirect or consequential damages arising from the use of our services, including delays or service interruptions.",
    },
    {
        title: "9. Changes to Terms",
        content:
            "We may update these Terms and Conditions at any time. Continued use of our services means you accept the updated terms.",
    },
];

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen flex items-start justify-center px-4 py-16">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-30 h-0.5 bg-secondary mb-5" />
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        Terms &amp; Conditions
                    </h1>
                </div>

                {/* Content card */}
                <div className="rounded-xl bg-primary px-8 py-8">
                    <ScrollArea className="w-full">
                        <div className="flex flex-col gap-6">
                            {sections.map((section, i) => (
                                <div key={i} className="flex flex-col gap-1.5 text-white">
                                    <p className="text-base">
                                        {section.title}
                                    </p>
                                    <p className="text-sm">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}