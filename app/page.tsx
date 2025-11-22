'use client'

import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { WhereUghurMeetsCuisine } from "@/components/where-culture-meets-cuisine"
import { MenuShowcase } from "@/components/menu-showcase"
import { SignatureDishes } from "@/components/signature-dishes"
import { OurPromise } from "@/components/our-promise"
import { Ambience } from "@/components/ambience"
import { AmbienceVideo } from "@/components/ambience-video"
import { Testimonials } from "@/components/testimonials"
import { Reservation } from "@/components/reservation"
import { Map } from "@/components/map"
import { Footer } from "@/components/footer"
//apis 
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


export default function Home() {
  const amount = 0.5;
  return (
    <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    // <main className="min-h-screen">
    //   <Navigation />
    //   <Hero />
    //   <WhereUghurMeetsCuisine />
    //   <SignatureDishes />
    //   <MenuShowcase />
    //   <Ambience />
    //   <OurPromise />
    //   <AmbienceVideo />
    //   <Testimonials />
    //   <Reservation />
    //   <Map />
    //   <Footer />
    // </main>
  )
}
