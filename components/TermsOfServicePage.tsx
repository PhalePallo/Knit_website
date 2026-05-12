import React, { memo, useMemo } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';
import { FileText, CheckCircle, AlertTriangle, Scale, CreditCard, ShieldAlert, UserCheck, Building, Users, Globe, Lock, Eye, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

// Memoized section component to prevent unnecessary re-renders
const TermsSection = memo(({ id, icon: Icon, title, children, delay = 0 }: {
  id: string;
  icon: any;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <ScrollReveal delay={delay}>
    <div id={id} className="bg-white rounded-lg border border-surface-200 p-8 shadow-sm">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-950 mb-6">
        <Icon className="text-brand-600" size={28} />
        {title}
      </h2>
      <div className="space-y-4 text-slate-600">
        {children}
      </div>
    </div>
  </ScrollReveal>
));

TermsSection.displayName = 'TermsSection';

const TermsOfServicePage: React.FC = () => {
    const lastUpdated = useMemo(() => "May 8, 2026", []);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-100 selection:text-brand-900">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-surface-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-100/30 rounded-full blur-3xl -z-10 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-surface-200/40 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-6">
                                <FileText size={14} />
                                <span>Legal & Compliance</span>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <h1 className="text-4xl md:text-5xl font-bold text-brand-950 tracking-tight mb-6">
                                Terms of Service
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <p className="text-xl text-slate-600 leading-relaxed mb-4">
                                Website terms and conditions for Knit AI Financial Infrastructure.
                            </p>
                            <p className="text-sm text-slate-500">
                                Last Updated: {lastUpdated}
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-slate prose-lg max-w-none">
                        <ScrollReveal delay={300}>
                            <div className="space-y-16">
                                <TermsSection 
                                    id="acceptance" 
                                    icon={CheckCircle} 
                                    title="1. INTRODUCTION AND ACCEPTANCE"
                                    delay={300}
                                >
                                    <p className="leading-relaxed">
                                        1.1 These Website Terms and Conditions ("Website Terms") govern access to and use of the website operated by Knit Group (Pty) Ltd, a company registered in the Republic of South Africa ("Knit", "we", "us", or "our").
                                    </p>
                                    <p className="leading-relaxed">
                                        1.2 By accessing, browsing, or using this website, you confirm that you have read, understood, and agree to be bound by these Website Terms. If you do not agree with these Website Terms, you must not use this website.
                                    </p>
                                    <p className="leading-relaxed">
                                        1.3 Nothing on this website constitutes an offer to provide services except where expressly agreed in writing.
                                    </p>
                                    <p className="leading-relaxed">
                                        1.4 These Website Terms apply solely to use of the website and do not govern use of Knit's software platform or services, which are governed separately by contractual agreements, including as Common Terms Agreement and applicable Service Schedules.
                                    </p>
                                    <p className="leading-relaxed">
                                        1.5 In the event of any inconsistency between these Website Terms and any signed agreement governing as provision of services by Knit, the signed agreement shall prevail.
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="contractual" 
                                    icon={FileText} 
                                    title="2. RELATIONSHIP TO CONTRACTUAL AGREEMENTS"
                                    delay={350}
                                >
                                    <p className="leading-relaxed">
                                        2.1 Any access to or use of Knit's software platform or services is subject to a separate written agreement entered into between Knit and a customer (including Common Terms Agreement and any applicable Service Schedules).
                                    </p>
                                    <p className="leading-relaxed">
                                        2.2 In the event of any inconsistency between these Website Terms and any signed agreement governing as provision of services by Knit, the signed agreement shall prevail.
                                    </p>
                                    <p className="leading-relaxed">
                                        2.3 Nothing on this website constitutes legal advice, financial advice, regulatory advice, or professional advice of any kind.
                                    </p>
                                    <p className="leading-relaxed">
                                        2.4 You should not rely on information on this website as a substitute for independent professional advice.
                                    </p>
                                    <p className="leading-relaxed">
                                        2.5 Knit makes no representations or warranties regarding outcomes, performance, suitability, or compliance based solely on information contained on the website.
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="about-knit" 
                                    icon={Building} 
                                    title="3. About Knit and the Website"
                                    delay={400}
                                >
                                    <p className="leading-relaxed">
                                        <strong>3.1 Knit provides a technology platform designed to assist schools with school fee administration, payment enablement, collections workflows, and related financial operations.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>3.2 The website is provided for general informational purposes and to enable potential customers or partners to learn about Knit and make enquiries.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>3.3 Knit does not guarantee that the website will be uninterrupted, error-free, or available at all times.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>3.4 Access to the website may be temporarily suspended or restricted without notice for maintenance, updates, or other operational reasons.</strong>
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="no-advice" 
                                    icon={AlertTriangle} 
                                    title="4. No Advice and No Reliance"
                                    delay={450}
                                >
                                    <p className="leading-relaxed">
                                        <strong>4.1 Information made available on this website does not constitute legal advice, financial advice, regulatory advice, or professional advice of any kind.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>4.2 You should not rely on information on this website as a substitute for independent professional advice.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>4.3 Knit makes no representations or warranties regarding outcomes, performance, suitability, or compliance based solely on information contained on the website.</strong>
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="no-services" 
                                    icon={CreditCard} 
                                    title="5. No Credit, Collections or Payment Services via Website"
                                    delay={500}
                                >
                                    <p className="leading-relaxed">
                                        <strong>5.1 Knit is not:</strong>
                                    </p>
                                        <ul className="list-disc pl-6 space-y-2 ml-6">
                                            <li>a bank; a deposit-taking institution; a credit provider; or a debt collection agency.</li>
                                            <li>No payments, credit assessments, collections activity, or debt recovery services are conducted through this website itself.</li>
                                        </ul>
                                        <p className="leading-relaxed">
                                            <strong>5.2 Any payment processing, credit assessment, or collections activity is performed only through Knit's platform and applicable third-party providers, subject to separate agreements.</strong>
                                    </p>
                                </TermsSection>

                                {/* Section 6 */}
                                <TermsSection 
                                    id="intellectual-property" 
                                    icon={Globe} 
                                    title="6. Intellectual Property"
                                    delay={550}
                                >
                                    <p className="leading-relaxed">
                                        <strong>6.1 All intellectual property rights in and to the website, including all content, text, graphics, logos, trademarks, software, and design elements, are owned by or licensed to Knit.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>6.2 You may view and use the website for lawful personal or business informational purposes only.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>6.3 You may not:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 ml-6">
                                        <li>copy, reproduce, distribute, or modify website content;</li>
                                        <li>reverse engineer any software or code;</li>
                                        <li>use the website or its content for competitive analysis or to develop competing products; without Knit's prior written consent.</li>
                                    </ul>
                                </TermsSection>

                                {/* Section 7 */}
                                <TermsSection 
                                    id="acceptable-use" 
                                    icon={Users} 
                                    title="7. Acceptable Use"
                                    delay={600}
                                >
                                    <p className="leading-relaxed">
                                        <strong>7.1 You agree not to use the website in any manner that is:</strong>
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 ml-6">
                                        <li>unlawful, fraudulent, or misleading;</li>
                                        <li>infringes on the rights of any third party;</li>
                                        <li>interferes with the operation or security of the website;</li>
                                        <li>introduces malicious code or harmful content.</li>
                                    </ul>
                                    <p className="leading-relaxed">
                                        <strong>7.2 Knit reserves the right to restrict or terminate access to the website where misuse is detected.</strong>
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="privacy" 
                                    icon={Lock} 
                                    title="8. Privacy and Personal Information"
                                    delay={650}
                                >
                                    <p className="leading-relaxed">
                                        <strong>8.1 Knit processes personal information in accordance with applicable South African data protection law, including the Protection of Personal Information Act 4 of 2013.</strong>
                                        </p>
                                        <p className="leading-relaxed">
                                        <strong>8.2 Information submitted via contact forms or enquiries will be processed solely for responding to enquiries, business development, and related purposes.</strong>
                                        </p>
                                        <p className="leading-relaxed">
                                            <strong>8.3 More information on how Knit processes personal information is set out in its Privacy Policy, which forms part of these Website Terms.</strong>
                                        </p>
                                </TermsSection>

                                <TermsSection 
                                    id="third-party" 
                                    icon={Eye} 
                                    title="9. Third-Party Links"
                                    delay={700}
                                >
                                    <p className="leading-relaxed">
                                        <strong>9.1 The website may contain links to third-party websites.</strong>
                                        </p>
                                        <p className="leading-relaxed">
                                        <strong>9.2 Knit does not control, endorse, or assume responsibility for third-party content, products, or services.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>9.3 Accessing third-party websites is at your own risk.</strong>
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="availability" 
                                    icon={Database} 
                                    title="10. Availability and Changes"
                                    delay={750}
                                >
                                    <p className="leading-relaxed">
                                        <strong>10.1 Knit may modify, suspend, or discontinue any aspect of the website at any time without notice.</strong>
                                        </p>
                                        <p className="leading-relaxed">
                                        <strong>10.2 Knit does not warrant that the website will be uninterrupted, error-free, or available at all times.</strong>
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="liability" 
                                    icon={Scale} 
                                    title="11. Liability Limitations"
                                    delay={800}
                                >
                                    <p className="leading-relaxed">
                                        <strong>11.2 Nothing in these Website Terms limits liability that cannot lawfully be excluded.</strong>
                                    </p>
                                </TermsSection>

                                <TermsSection 
                                    id="indemnity" 
                                    icon={ShieldAlert} 
                                    title="12. Indemnity"
                                    delay={850}
                                >
                                    <p className="leading-relaxed">
                                        <strong>12.1 You agree to indemnify and hold Knit harmless against any claims, losses, or damages arising from your unlawful use of the website or breach of these Website Terms.</strong>
                                        </p>
                                </TermsSection>

                                {/* Section 13 */}
                                <div id="governing-law" className="bg-white rounded-lg border border-surface-200 p-8 shadow-sm">
                                    <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-950 mb-6">
                                        <Scale className="text-brand-600" size={28} />
                                        13. Governing Law and Jurisdiction
                                    </h2>
                                    <p className="leading-relaxed">
                                        <strong>13.1 These Website Terms are governed by and construed in accordance with the laws of South Africa.</strong>
                                    </p>
                                    <p className="leading-relaxed">
                                        <strong>13.2 Any disputes arising out of or in connection with these Website Terms shall be resolved through arbitration in accordance with the rules of the Arbitration Foundation of Southern Africa.</strong>
                                    </p>
                                </div>

                                {/* Contact Section */}
                                <div className="bg-gradient-to-r from-brand-50 to-surface-100 rounded-lg border border-surface-200 p-8 shadow-sm">
                                    <div className="text-center">
                                        <p className="text-slate-600 mb-6">
                                            <strong>Questions about these Website Terms?</strong>
                                        </p>
                                        <Link 
                                            to="/contact" 
                                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors"
                                        >
                                            Contact Support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TermsOfServicePage;
