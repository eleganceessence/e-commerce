"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, CheckCircle2, CreditCard, Truck, Banknote, Smartphone } from "lucide-react";
import { useCart } from '@/lib/cart-context';

export default function CheckoutPage() {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");
  
  const {
    cartItems,
    clearCart,
    subtotal,
  } = useCart();
  
  const shipping = 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };
  
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardNumber(formatted);
    }
  };
  
  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace(/\//g, "").length <= 4) {
      setExpiryDate(formatted);
    }
  };
  
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, "");
    if (value.length <= 4) {
      setCvv(value);
    }
  };
  
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrdered(true);
      clearCart();
    }, 2000);
  };
  
  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 p-4 bg-emerald-50 rounded-full">
          <CheckCircle2 className="h-16 w-16 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-serif mb-4">Thank You for Your Order</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Your signature scent is being prepared. We've sent a confirmation email with your order details.
          {paymentMethod === "cod" && " Please keep the exact amount ready for cash on delivery."}
        </p>
        <div className="flex gap-4">
          <Button variant="outline" className="uppercase tracking-widest text-xs px-8">Continue Shopping</Button>
          <Button className="uppercase tracking-widest text-xs px-8">Track Order</Button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-12">
            <div className="flex items-center gap-2 mb-8">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h1 className="font-serif text-3xl tracking-tight">Checkout</h1>
            </div>

            <div className="space-y-10">
              <section className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px]">1</span>
                  Contact Information
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="alex@example.com" 
                    required 
                    className="rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent"
                  />
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px]">2</span>
                  Shipping Address
                </h2>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className="rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className="rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" required className="rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" required className="rounded-none border-t-0 border-l-0 border-r-0 focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px]">3</span>
                  Payment Method
                </h2>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "card" 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-xs uppercase tracking-wider font-bold">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "upi" 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-xs uppercase tracking-wider font-bold">UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === "cod" 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <Banknote className="h-6 w-6" />
                    <span className="text-xs uppercase tracking-wider font-bold">COD</span>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="p-6 bg-card border border-border space-y-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <CreditCard className="h-4 w-4" /> All transactions are secure and encrypted.
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input 
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card">Card Number</Label>
                      <Input 
                        id="card" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry"
                          value={expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv"
                          type="password"
                          value={cvv}
                          onChange={handleCvvChange}
                          placeholder="123"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4">
                      Mock Checkout: No actual payment will be processed.
                    </p>
                  </div>
                )}

                {/* UPI Payment Form */}
                {paymentMethod === "upi" && (
                  <div className="p-6 bg-card border border-border space-y-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <Smartphone className="h-4 w-4" /> Pay using your UPI ID
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        required
                        className="bg-background"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Enter your UPI ID (e.g., 9876543210@paytm, yourname@googlepay)
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'%3E%3Crect fill='%23097939' width='100' height='40' rx='4'/%3E%3Ctext x='50' y='25' font-family='Arial' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EGPAY%3C/text%3E%3C/svg%3E" alt="GPay" className="h-8" />
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'%3E%3Crect fill='%2300B9F1' width='100' height='40' rx='4'/%3E%3Ctext x='50' y='25' font-family='Arial' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EPaytm%3C/text%3E%3C/svg%3E" alt="Paytm" className="h-8" />
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'%3E%3Crect fill='%235f259f' width='100' height='40' rx='4'/%3E%3Ctext x='50' y='25' font-family='Arial' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EPhonePe%3C/text%3E%3C/svg%3E" alt="PhonePe" className="h-8" />
                    </div>

                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4">
                      Mock Checkout: No actual payment will be processed.
                    </p>
                  </div>
                )}

                {/* COD Information */}
                {paymentMethod === "cod" && (
                  <div className="p-6 bg-card border border-border space-y-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <Banknote className="h-4 w-4" /> Pay when you receive your order
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 p-4 space-y-2">
                      <h3 className="font-bold text-sm uppercase tracking-wider">Cash on Delivery</h3>
                      <ul className="text-sm text-foreground space-y-1">
                        <li>• Pay in cash when your order is delivered</li>
                        <li>• Please keep exact amount ready: <span className="font-bold">${total.toFixed(2)}</span></li>
                        <li>• Our delivery partner will collect the payment</li>
                        <li>• COD available for orders in select locations</li>
                      </ul>
                    </div>

                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4">
                      Mock Checkout: No actual payment will be processed.
                    </p>
                  </div>
                )}
              </section>

              <Button 
                onClick={handlePlaceOrder}
                disabled={isSubmitting} 
                className="w-full h-14 uppercase tracking-[0.2em] font-bold text-sm"
              >
                {isSubmitting ? "Processing..." : paymentMethod === "cod" ? "Place Order (COD)" : "Complete Order"}
              </Button>
            </div>
          </div>

          <aside className="w-full lg:w-96">
            <div className="bg-card border border-border p-8 sticky top-32">
              <h2 className="font-serif text-xl mb-8 uppercase tracking-widest pb-4 border-b border-border">
                Order Summary
              </h2>

              <div className="space-y-6 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 bg-secondary flex-shrink-0">
                      <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider">{item.name}</h3>
                      <p className="text-xs text-muted-foreground italic">{item.description}</p>
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
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-sm text-amber-600">
                    <span className="uppercase tracking-widest">COD Fee</span>
                    <span>$0.00</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-border pt-4">
                  <span className="uppercase tracking-[0.2em]">Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {paymentMethod === "cod" && (
                  <p className="text-xs text-amber-600 font-medium">
                    Pay this amount in cash on delivery
                  </p>
                )}
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