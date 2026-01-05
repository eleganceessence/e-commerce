"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  CheckCircle2,
  CreditCard,
  Truck,
  Banknote,
  Smartphone,
  MapPin,
  User
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  /* ======================
     👤 PERSONAL INFO
     ====================== */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  
  /* ======================
     📍 ADDRESS
     ====================== */
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  
  const { cartItems, clearCart, subtotal } = useCart();
  
  const shipping = 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  /* ======================
     🔐 LOAD DATA FROM CLERK
     ====================== */
  useEffect(() => {
    if (isLoaded && user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [isLoaded, user]);
  
  /* ======================
     📍 GET CURRENT LOCATION
     ====================== */
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
            );
            const data = await res.json();
            const a = data.address || {};
            
            setAddress(`${a.house_number || ""} ${a.road || ""}`.trim());
            setCity(a.city || a.town || a.village || "");
            setState(a.state || "");
            setZip(a.postcode || "");
          } catch {
            alert("Failed to fetch address");
          } finally {
            setIsLocating(false);
          }
        },
        () => {
          alert("Location permission denied");
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
    );
  };
  
  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrdered(true);
      clearCart();
    }, 2000);
  };
  
  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <CheckCircle2 className="h-20 w-20 text-emerald-600 mb-6" />
        <h1 className="text-4xl font-serif mb-3">Order Confirmed 🎉</h1>
        <p className="text-muted-foreground">
          Confirmation sent to <b>{email}</b>
        </p>
      </div>
    );
  }
  
  return (
    <main className="py-16 bg-background">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16">

        {/* LEFT */}
        <div className="flex-1 space-y-12">
          <h1 className="text-3xl font-serif flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" /> Checkout
          </h1>

          {/* 👤 PERSONAL INFO */}
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <User className="h-4 w-4" /> Personal Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={firstName} readOnly />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={lastName} readOnly />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input value={email} readOnly />
            </div>
          </section>

          {/* 📍 SHIPPING */}
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest">
              Shipping Address
            </h2>

            <Button
              type="button"
              variant="outline"
              onClick={getCurrentLocation}
              disabled={isLocating}
              className="flex gap-2 text-xs uppercase tracking-widest"
            >
              <MapPin className="h-4 w-4" />
              {isLocating ? "Detecting..." : "Use My Location"}
            </Button>

            <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              <Input placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
              <Input placeholder="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
          </section>

          {/* 💳 PAYMENT */}
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest">
              Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "card", icon: CreditCard, label: "Card" },
                { id: "upi", icon: Smartphone, label: "UPI" },
                { id: "cod", icon: Banknote, label: "COD" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-4 border-2 flex flex-col items-center gap-2 ${
                    paymentMethod === m.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}
                >
                  <m.icon className="h-6 w-6" />
                  <span className="text-xs uppercase font-bold">{m.label}</span>
                </button>
              ))}
            </div>
          </section>

          <Button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full h-14 uppercase tracking-widest font-bold"
          >
            {isSubmitting ? "Processing..." : "Complete Order"}
          </Button>
        </div>

        {/* RIGHT */}
        <aside className="w-full lg:w-96">
          <div className="border p-8 sticky top-24">
            <h2 className="font-serif text-xl mb-6 uppercase tracking-widest">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>{item.price}</span>
              </div>
            ))}

            <div className="border-t mt-6 pt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 text-xs uppercase text-muted-foreground">
              <Truck className="h-4 w-4" /> Fast delivery
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}