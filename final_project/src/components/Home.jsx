import React from 'react';
import Hero            from './Hero';
import Features        from './Features';
import SubscribeBanner from './SubscribeBanner';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="features-container container">
        <Features />
      </section>

      <SubscribeBanner />
    </>
  );
}
