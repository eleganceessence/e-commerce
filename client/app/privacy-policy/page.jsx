"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Content Wrapper */}
                <div className="bg-card text-card-foreground p-8 md:p-12 rounded-lg border border-border/40 shadow-sm">

                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground text-sm mb-8 italic">Last Updated: December 23, 2025</p>

                    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
                        <section>
                            <p className="lead text-lg text-muted-foreground leading-relaxed">
                                At Elegance Essence, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Elegance Essence and how we use it.
                            </p>
                        </section>

                        <div className="width-full h-px bg-border/50 my-8"></div>

                        <section>
                            <h2 className="text-xl font-serif font-semibold mb-3">Information We Collect</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold mb-3">Log Files</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Elegance Essence follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, and referring/exit pages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold mb-3">Advertising Partners</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You may consult this list to find the Privacy Policy for each of the advertising partners of Elegance Essence. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Elegance Essence.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold mb-3">Third Party Privacy Policies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Elegance Essence's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
