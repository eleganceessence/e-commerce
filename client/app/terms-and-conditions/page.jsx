"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => {
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

          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Terms and Conditions</h1>
          <p className="text-muted-foreground text-sm mb-8 italic">Last Updated: December 23, 2025</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="lead text-lg text-muted-foreground leading-relaxed">
                Welcome to Elegance Essence. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website we assume you accept these terms and conditions.
              </p>
            </section>

            <div className="width-full h-px bg-border/50 my-8"></div>

            <section>
              <h2 className="text-xl font-serif font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Do not continue to use Elegance Essence if you do not agree to take all of the terms and conditions stated on this page. Your continued use of the website following the posting of changes to this policy will be deemed your acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-semibold mb-3">2. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We employ the use of cookies. By accessing Elegance Essence, you agreed to use cookies in agreement with the Elegance Essence's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-semibold mb-3">3. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unless otherwise stated, Elegance Essence and/or its licensors own the intellectual property rights for all material on Elegance Essence. All intellectual property rights are reserved. You may access this from Elegance Essence for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-semibold mb-3">4. User Comments</h2>
              <p className="text-muted-foreground leading-relaxed">
                Parts of this website offer an opportunity for users to post and exchange opinions and information. Elegance Essence does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Elegance Essence, its agents and/or affiliates.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
