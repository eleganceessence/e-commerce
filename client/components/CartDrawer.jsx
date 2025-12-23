"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
    const { isCartOpen, closeCart, cartItems, updateQuantity, removeItem, subtotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-background shadow-xl flex flex-col transform transition-transform duration-500 ease-in-out">

                    {/* Header */}
                    <div className="px-6 py-6 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="h-5 w-5" />
                            <h2 className="font-serif text-2xl tracking-wide">Shopping Bag</h2>
                            <span className="text-sm font-medium text-muted-foreground">({cartItems.length})</span>
                        </div>
                        <button
                            onClick={closeCart}
                            className="p-2 -mr-2 hover:bg-secondary rounded-full transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="p-6 bg-secondary rounded-full">
                                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xl font-serif">Your bag is empty</p>
                                    <p className="text-muted-foreground mt-2">Discover your next signature scent.</p>
                                </div>
                                <Button onClick={closeCart} variant="outline" className="mt-4 px-8 uppercase tracking-widest text-xs font-bold">
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden bg-secondary rounded-sm">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-serif text-lg leading-tight uppercase tracking-wide">{item.name}</h3>
                                                    <p className="text-sm font-semibold">{item.price}</p>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">{item.description}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-border rounded-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-secondary transition-colors"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-secondary transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-4 tracking-wider uppercase transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer / Summary */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-border px-6 py-8 space-y-6 bg-secondary/20">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground uppercase tracking-widest">Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Shipping & Taxes</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    className="w-full h-14 uppercase tracking-widest font-bold text-sm"
                                    onClick={() => {
                                        closeCart();
                                        window.location.href = "/checkout";
                                    }}
                                >
                                    Secure Checkout
                                </Button>
                                <button
                                    onClick={closeCart}
                                    className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest py-2"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
