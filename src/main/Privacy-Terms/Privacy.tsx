import { ScrollArea } from "@/components/ui/scroll-area";

interface Section {
    title: string;
    content?: string;
    bullets?: string[];
    contact?: { email: string; phone: string };
}

const sections: Section[] = [
    {
        title: "1. Introduction",
        content:
            "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.",
    },
    {
        title: "2. Information We Collect",
        content:
            "We may collect personal information such as your name, phone number, email address, and delivery address when you place an order or contact us.",
    },
    {
        title: "3. How We Use Your Information",
        content: "We use your information to:",
        bullets: [
            "Process and deliver your orders",
            "Improve our services and user experience",
            "Communicate updates, offers, or support",
        ],
    },
    {
        title: "4. Data Protection",
        content:
            "We take appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure.",
    },
    {
        title: "5. Sharing of Information",
        content:
            "We do not sell or trade your personal information. Your data may only be shared with trusted partners necessary for order processing and delivery.",
    },
    {
        title: "6. Cookies",
        content:
            "Our website may use cookies to enhance your browsing experience and analyze website traffic.",
    },
    {
        title: "7. Your Rights",
        content:
            "You have the right to access, update, or request deletion of your personal data at any time by contacting us.",
    },
    {
        title: "8. Changes to Privacy Policy",
        content:
            "We may update this policy occasionally. Any changes will be posted on this page.",
    },
    {
        title: "9. Contact Us",
        content: "If you have any questions about these Terms or Privacy Policy, please contact us at:",
        contact: {
            email: "info@castello.com",
            phone: "+354 551 2345",
        },
    },
];

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex items-start justify-center px-4 py-16">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-30 h-0.5 bg-secondary mb-5" />
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        Privacy Policy
                    </h1>
                </div>

                {/* Content card */}
                <div className="rounded-xl bg-primary px-8 py-8">
                    <ScrollArea className="w-full">
                        <div className="flex flex-col gap-6">
                            {sections.map((section, i) => (
                                <div key={i} className="flex flex-col gap-1.5 text-white">
                                    <p className="text-base">{section.title}</p>

                                    {section.content && (
                                        <p className="text-sm">{section.content}</p>
                                    )}

                                    {section.bullets && (
                                        <ul className="flex flex-col gap-1 mt-0.5">
                                            {section.bullets.map((item, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.contact && (
                                        <div className="flex flex-col gap-1 mt-0.5 text-sm">
                                            <span>✉ {section.contact.email}</span>
                                            <span>☎ {section.contact.phone}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}