import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Copyright } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className="md:w-10/12 mx-auto py-12 bg-primary text-white rounded-t-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-4">

                {/* Logo */}
                <div className="flex items-center justify-center">
                    <Image
                        src="/assets/footerLogo.png"
                        alt="Castello"
                        width={500}
                        height={500}
                        className="object-cover w-52"
                    />
                </div>

                {/* Opening Hours & Contact */}
                <div className="space-y-4">
                    <div className="w-10 h-0.5 bg-secondary" />
                    <h3 className="text-base font-semibold">Opening Hours</h3>
                    <p className="text-sm text-gray-300">Monday - Sunday, 11:00 AM - 11:00 PM</p>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4 text-white" />
                        <span>+354 551 2345</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4 text-white" />
                        <span>info@castello.com</span>
                    </div>
                </div>

                {/* Nav Links - Column 1 */}
                <div className="space-y-4 pt-6">
                    <Link href="/about" className="block text-sm text-gray-300 hover:text-white transition-colors">About Castello</Link>
                    <Link href="/find-a-branch" className="block text-sm text-gray-300 hover:text-white transition-colors">Branches</Link>
                    <Link href="/career" className="block text-sm text-gray-300 hover:text-white transition-colors">Career</Link>
                </div>

                {/* Nav Links - Column 2 */}
                <div className="space-y-4 pt-6">
                    <Link href="/faq" className="block text-sm text-gray-300 hover:text-white transition-colors">FAQ</Link>
                    <Link href="/terms" className="block text-sm text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
                    <Link href="/privacy" className="block text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
            <div className='h-[0.5px] bg-white/20 w-11/12 mx-auto my-6'/>
            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-16">
                <p className="text-sm text-gray-400 flex items-center gap-2"><Copyright size={14} /> {new Date().getFullYear()} Castello. All rights reserved.</p>
                <div className="flex items-center gap-5">
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaFacebook className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaInstagram className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaTwitter className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <FaLinkedin className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}