'use client'
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ProductCard({ product }) {
    return (
        <div className="group cursor-pointer">
            <Link href={`/shop/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-6">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Quick Add Button */}
                    <button
                        className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white shadow-lg z-10"
                        onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic would go here
                        }}
                    >
                        <Plus className="h-5 w-5" />
                    </button>
                </div>
            </Link>

            <div className="text-center">
                <Link href={`/shop/${product.id}`}>
                    <h3 className="font-serif text-2xl mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-3 italic">{product.description}</p>
                <div className="text-lg font-medium">{product.price}</div>
            </div>
        </div>
    );
}
