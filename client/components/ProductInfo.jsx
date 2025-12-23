"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    const increment = () => setQuantity((p) => p + 1);
    const decrement = () => setQuantity((p) => (p > 1 ? p - 1 : 1));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-serif text-4xl mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-medium">{product.price}</span>
                    <div className="flex items-center text-yellow-500">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        <span className="text-muted-foreground text-sm ml-2 text-black">(24 reviews)</span>
                    </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    {product.description} An exquisite blend composed of the rarest ingredients.
                    Long-lasting and unforgettable, this fragrance embodies the essence of luxury.
                </p>
            </div>

            <div className="border-t border-b border-border py-6 space-y-4">
                <div>
                    <span className="font-bold text-sm uppercase tracking-widest">Top Notes</span>
                    <p className="text-muted-foreground">Bergamot, Pink Pepper, Saffron</p>
                </div>
                <div>
                    <span className="font-bold text-sm uppercase tracking-widest">Heart Notes</span>
                    <p className="text-muted-foreground">Rose de Mai, Jasmine, Magnolia</p>
                </div>
                <div>
                    <span className="font-bold text-sm uppercase tracking-widest">Base Notes</span>
                    <p className="text-muted-foreground">Amber, Clean Musk, Vetiver</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-md">
                        <button
                            onClick={decrement}
                            className="p-3 hover:bg-secondary transition-colors"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <button
                            onClick={increment}
                            className="p-3 hover:bg-secondary transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <Button
                        className="flex-1 h-12 text-sm uppercase tracking-widest font-bold"
                        onClick={() => addItem(product, quantity)}
                    >
                        Add to Cart - {product.price}
                    </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                    Free shipping on all orders over $200
                </p>
            </div>
        </div>
    );
}
