import React, { useEffect, useState, useRef } from 'react';
import { Shield, Lock, Zap, ArrowRight, Check, GitMerge, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import DesignSystem from './DesignSystem';
import KnitWorkflowDemo from './KnitWorkflowDemo';
import FeatureShowcase from './FeatureShowcase';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';



const CountUp = ({ end, duration = 2000, prefix = '' }: { end: number, duration?: number, prefix?: string }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            countRef.current = Math.floor(ease * end);
            setCount(countRef.current);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration, isVisible]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}</span>;
};

// --- Main App ---

const LandingPage: React.FC = () => {
    const [showDesignSystem, setShowDesignSystem] = useState(false);
    const navigate = useNavigate();

    return (
        <div id="top" className="min-h-screen bg-white text-slate-900 selection:bg-brand-100 selection:text-brand-900 font-sans overflow-x-hidden">
            {showDesignSystem && <DesignSystem onClose={() => setShowDesignSystem(false)} />}

            <div className={showDesignSystem ? "print:hidden" : ""}>
                <Navigation />

                {/* Hero Section */}
                <section id="knit-architect" className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-drift"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-drift animation-delay-2000"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <ScrollReveal>
                                <div className="badge-toddle bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 mb-8 justify-center">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                    Predictive Revenue Infrastructure
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={100}>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
                                    AI that manages school fees<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">end-to-end</span>
                                </h1>
                            </ScrollReveal>
                            <ScrollReveal delay={200}>
                                <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                                    Knit is the school finance managers' co-pilot. Our AI-powered financial infrastructure platform automates payment recovery, risk assessment, and financial workflows for schools and businesses.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={300}>
                                <div className="flex flex-wrap justify-center gap-4 mb-12">
                                    <button
                                        onClick={() => navigate('/contact')}
                                        className="btn-toddle px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                                    >
                                        Book a Demo <ArrowRight size={18} />
                                    </button>
                                    <button
                                        onClick={() => navigate('/pricing')}
                                        className="btn-toddle px-10 py-5 bg-white text-slate-700 rounded-xl text-base font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                                    >
                                        View Pricing
                                    </button>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={400}>
                                <div className="flex items-center justify-center gap-6 text-slate-500 text-sm mb-16">
                                    <div className="flex items-center gap-2">
                                        <Shield size={16} className="text-blue-600" /> SOC2 Type II
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Lock size={16} className="text-blue-600" /> 256-bit Encryption
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Hero Visual */}
                        <ScrollReveal delay={500}>
                            <div className="relative max-w-5xl mx-auto">
                                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-2 relative z-10 card-hover">
                                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden h-[450px] flex flex-col">
                                        <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shrink-0">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                            </div>
                                            <div className="text-xs font-medium text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                                                <Lock size={10} /> overview.knit.fi
                                            </div>
                                        </div>
                                        <div className="flex-1 relative overflow-hidden">
                                            <KnitWorkflowDemo compact headless />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating widget elements */}
                                <div className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 w-48 md:w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-20 animate-float">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recovery Rate</span>
                                        <span className="text-xs text-emerald-600 font-semibold">↑ 12%</span>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900">94.2%</div>
                                    <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 w-44 md:w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-20 animate-float animation-delay-2000">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                            <Zap size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500">AI Agents Active</div>
                                            <div className="text-lg font-bold text-slate-900">12</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 -z-10"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 -z-10"></div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Trust Section */}
                <section id="trust" className="py-28 lg:py-32 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal>
                            <div className="text-center mb-14">
                                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">TRUSTED BY TOP TIER SCHOOLS</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {[
                                    { src: "/southdowns-logo.jpg", alt: "Southdowns College" },
                                    { src: "/laerskool-elarduspark-logo.png", alt: "Laerskool Elarduspark" },
                                    { src: "/links-college-logo.png", alt: "Links Combined College" },
                                    { src: "/willow-view-logo.png", alt: "Willow View Academy" },
                                    { src: "/palmview-logo.png", alt: "Palmview State Primary School" },
                                    { src: "/molo-mhlaba-logo.png", alt: "Molo Mhlaba" },
                                    { src: "/maseala-logo.jpg", alt: "Maseala" }
                                ].map((logo, index) => (
                                    <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 md:p-8 flex items-center justify-center h-28 md:h-32 card-hover">
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            className="h-12 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="mt-20 pt-14 border-t border-slate-200 text-center">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Our Strategic Industry Partners</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-8 flex items-center justify-center h-28 md:h-32 card-hover">
                                        <img
                                            src="/sbma-logo.png"
                                            alt="School Business Managers' Association (SBMA)"
                                            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-8 flex items-center justify-center h-28 md:h-32 card-hover">
                                        <img
                                            src="/fedsas-logo.png"
                                            alt="FEDSAS"
                                            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-8 flex items-center justify-center h-28 md:h-32 card-hover">
                                        <img
                                            src="/Google%20for%20startups.jpeg"
                                            alt="Google for Startups"
                                            className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
                <section id="ai-engine" className="py-28 lg:py-32 bg-brand-950 text-white relative overflow-hidden border-t border-brand-900">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/15 rounded-full blur-[100px] animate-pulse-slow"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal>
                            <div className="mb-12 md:mb-20">
                                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">How Knit Agents Execute</h2>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <FeatureShowcase />
                        </ScrollReveal>
                    </div>
                </section>

                {/* Platform Section */}
                <section id="platform" className="py-28 lg:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <ScrollReveal>
                            <div className="text-center mb-16 max-w-3xl mx-auto">
                                <div className="badge-toddle bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 mb-6">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                    Knit Architect OS
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Seamless Infrastructure Integration</h2>
                                <p className="text-slate-600 text-lg">
                                    Our API-first architecture sits between your systems and your customers, acting as an intelligent firewall against revenue loss.
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                            <ScrollReveal delay={100} className="h-full">
                                <div className="card-soft p-8 h-full flex flex-col card-hover">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                                        <GitMerge size={26} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Workflows</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Drag-and-drop logic for financial operations. Automate fee recovery, enrollment contracts, and reconciliation without writing code.
                                    </p>
                                    <div className="mt-auto">
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                                <Check size={16} className="text-blue-600 flex-shrink-0" /> Event-driven architecture
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                                <Check size={16} className="text-blue-600 flex-shrink-0" /> Multi-party approval steps
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={200} className="h-full">
                                <div className="card-soft p-8 h-full flex flex-col card-hover">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                                        <Database size={26} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Integrations</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        We integrate with your school's existing systems (accounting, school management) to offer a seamless experience.
                                    </p>
                                    <div className="mt-auto">
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200">Sage</span>
                                            <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200">Xero</span>
                                            <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200">Netcash</span>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={300} className="h-full">
                                <div className="card-soft p-8 h-full flex flex-col card-hover">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                                        <Shield size={26} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">Security & Compliance</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        Knit has compliance built in, ensuring the school operates within defined regulatory parameters. Built on Google foundations for enterprise-grade security.
                                    </p>
                                    <div className="mt-auto">
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                                <Check size={16} className="text-emerald-600 flex-shrink-0" /> SOC2 Type II
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                                <Check size={16} className="text-emerald-600 flex-shrink-0" /> 256-bit Encryption
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                                <Check size={16} className="text-emerald-600 flex-shrink-0" /> Role-Based Access Control
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>

                        </div>
                    </div>
                </section>







                {/* CTA Footer */}
                <section id="contact" className="py-28 lg:py-32 bg-slate-50 border-t border-slate-200">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Ready to modernize your financial infrastructure?</h2>
                            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                                Schedule a consultation to see how Knit can integrate with your existing payment stack.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="btn-toddle px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    Book a Demo
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Simple Footer */}
                {/* Simple Footer */}
                <Footer onShowDesignSystem={() => setShowDesignSystem(true)} />
            </div>
        </div>
    );
};

export default LandingPage;
