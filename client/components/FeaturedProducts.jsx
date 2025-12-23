'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProductCard from "./ProductCard";

const PRODUCTS = [
    {
        id: 1,
        name: "Rose Élégante",
        price: "$145",
        description: "A soft floral bouquet with hints of velvet vanilla.",
        image: "/images/featured-1.png",
    },
    {
        id: 2,
        name: "Midnight Amber",
        price: "$185",
        description: "Deep, resinous amber with smoked spices.",
        image: "/images/featured-1.png", // Reuse placeholder
    },
    {
        id: 3,
        name: "Golden Citrus",
        price: "$135",
        description: "Bright bergamot layered over warm cedarwood.",
        image: "/images/featured-1.png", // Reuse placeholder
    },
];

export default function FeaturedProducts() {
    return (
        <section className="py-24 bg-background text-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm uppercase tracking-widest font-bold">Curated Collection</span>
                    <h2 className="font-serif text-4xl mt-3 mb-4">Signature Scents</h2>
                    <div className="w-20 h-1 bg-primary mx-auto"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, staggerChildren: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center mt-16">
                    <Link href="/shop" className="inline-block border-b border-foreground pb-1 uppercase tracking-widest text-sm hover:text-primary hover:border-primary transition-colors">
                        View All Fragrances
                    </Link>
                </div>
            </div>
        </section>
    );
}
