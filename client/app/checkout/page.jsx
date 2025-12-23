"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, CheckCircle2, CreditCard, Truck } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
    const { cartItems, subtotal, clearCart } = useCart();
    const [isOrdered, setIsOrdered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const shipping = 15.0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsOrdered(true);
            clearCart();
        }, 2000);
    };

    if (isOrdered) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
                <div className="mb-6 p-4 bg-primary/10 rounded-full">
                    <CheckCircle2 className="h-16 w-16 text-primary" />
                </div>
                <h1 className="font-serif text-4xl mb-4">Thank You for Your Order</h1>
                <p className="text-muted-foreground max-w-md mb-8">
                    Your signature scent is being prepared. We've sent a confirmation email with your order details.
                </p>
                <div className="flex gap-4">
                    <Link href="/shop">
                        <Button variant="outline" className="uppercase tracking-widest text-xs px-8">Continue Shopping</Button>
                    </Link>
                    <Button className="uppercase tracking-widest text-xs px-8">Track Order</Button>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0 && !isOrdered) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
                <Link href="/shop">
                    <Button className="uppercase tracking-widest text-xs px-8">Return to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left: Checkout Form */}
                    <div className="flex-1 space-y-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                            <h1 className="font-serif text-3xl tracking-tight">Checkout</h1>
                        </div>

                        <form onSubmit={handlePlaceOrder} className="space-y-10">
                            {/* Contact Information */}
                            <section className="space-y-6">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px]">1</span>
                                    Contact Information
                                </h2>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="alex@example.com" required className="rounded-none border-t-0 border-l-0 border-r-0 border-b-border focus-visible:ring-0 focus-visible:border-primary transition-colors px-0 bg-transparent" />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section className="space-y-6">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px]">2</span>
                                    Shipping Address
                                </h2>
                                <div className="grid gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" required className="rounded-none border-t-0 border-l-0 border-r-0 border-b-border focus-visible:ring-0 focus-visible:border-primary transition-colors px-0 bg-transparent" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" required className="rounded-none border-t-0 border-l-0 border-r-0 border-b-border focus-visible:ring-0 focus-visible:border-primary transition-colors px-0 bg-transparent" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" required className="rounded-none border-t-0 border-l-0 border-r-0 border-b-border focus-visible:ring-0 focus-visible:border-primary transition-colors px-0 bg-transparent" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" required className="rounded-none border-t-0 border-l-0 border-r-0 border-b-border focus-visible:ring-0 focus-visible:border-primary transition-colors px-0 bg-transparent" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input id="state" required className="rounded-none border-t-0 border-l-0 border-r-0 border-b-border focus-visible:ring-0 focus-visible:border-primary transition-colors px-0 bg-transparent" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zip">ZIP Code</Label>
                                            <Input id="zip" required className="rounded-none border-t-0 border-l-0 border-r-0 border-b-border focus-visible:ring-0 focus-visible:border-primary transition-colors px-0 bg-transparent" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Payment Info */}
                            <section className="space-y-6">
                                <h2 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px]">3</span>
                                    Payment Details
                                </h2>
                                <div className="p-6 bg-secondary/30 border border-border space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                        <CreditCard className="h-4 w-4" /> All transactions are secure and encrypted.
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="card">Card Number</Label>
                                        <Input id="card" placeholder="0000 0000 0000 0000" disabled className="bg-transparent border-border" />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Mock Checkout: No actual payment will be processed.</p>
                                </div>
                            </section>

                            <Button type="submit" disabled={isSubmitting} className="w-full h-14 uppercase tracking-[0.2em] font-bold text-sm">
                                {isSubmitting ? "Processing..." : "Complete Order"}
                            </Button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <aside className="w-full lg:w-96">
                        <div className="bg-secondary/20 border border-border p-8 sticky top-32">
                            <h2 className="font-serif text-xl mb-8 uppercase tracking-widest pb-4 border-b border-border">Order Summary</h2>

                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-16 bg-secondary flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h3 className="text-sm font-bold uppercase tracking-wider">{item.name}</h3>
                                            <p className="text-xs text-muted-foreground italic truncate w-40">{item.description}</p>
                                            <p className="text-sm mt-1">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground uppercase tracking-widest">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground uppercase tracking-widest">Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground uppercase tracking-widest">Estimated Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-border pt-4">
                                    <span className="uppercase tracking-[0.2em]">Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 space-y-4">
                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest">
                                    <Truck className="h-4 w-4" /> Complimentary luxury packaging
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
