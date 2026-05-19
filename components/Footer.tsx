import React from 'react';
import { FileText, Mail, Phone, MapPin, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubscribeSection from './SubscribeSection';

interface FooterProps {
    onShowDesignSystem?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowDesignSystem }) => {
    return (
        <>
            <SubscribeSection />
            <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                        <div className="col-span-2">
                            <div className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                                <img src="/knit-logo.png" alt="Knit" className="h-20 w-auto" />
                            </div>
                            <div className="text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
                                Next-generation financial infrastructure for the AI era.
                            </div>
                            <div className="text-xs text-slate-500 mb-6">
                                © 2026 Knit Group (Pty) Ltd.
                            </div>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/people/Knitcash/61583909662935/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="https://www.linkedin.com/company/knitcash/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/#platform" className="hover:text-blue-400 transition-colors">Platform Overview</Link></li>
                                <li><Link to="/#platform" className="hover:text-blue-400 transition-colors">Integration</Link></li>
                                <li><Link to="/pricing" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link to="/faq" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">FAQs</Link></li>
                                <li><Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Insights</Link></li>
                                <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                                <li><Link to="/security" onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 transition-colors">Security</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Get in Touch</h4>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex items-start gap-3">
                                    <Mail size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <a href="mailto:info@knit.cash" className="hover:text-blue-400 transition-colors">info@knit.cash</a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <a href="tel:+27101412770" className="hover:text-blue-400 transition-colors">+27 10 141 2770</a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span className="text-xs">
                                        The Zone @ Rosebank<br />
                                        Rosebank, Johannesburg<br />
                                        Gauteng, South Africa
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                        <div className="flex gap-6 items-center">
                            {onShowDesignSystem && (
                                <button onClick={onShowDesignSystem} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <FileText size={14} /> Design System
                                </button>
                            )}
                            <div>System Status: <span className="text-emerald-500 animate-pulse">Operational</span></div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
