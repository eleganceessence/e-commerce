"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => {
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

                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Cookie Policy</h1>
                    <p className="text-muted-foreground text-sm mb-8 italic">Last Updated: December 23, 2025</p>

                    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
                        <section>
                            <p className="lead text-lg text-muted-foreground leading-relaxed">
                                This is the Cookie Policy for Elegance Essence, accessible from our website. We believe in being transparent about how we use your data.
                            </p>
                        </section>

                        <div className="width-full h-px bg-border/50 my-8"></div>

                        <section>
                            <h2 className="text-xl font-serif font-semibold mb-3">What Are Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold mb-3">How We Use Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-semibold mb-3">Disabling Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
