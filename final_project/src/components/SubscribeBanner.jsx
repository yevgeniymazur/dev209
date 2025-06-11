// src/components/SubscribeBanner.jsx
import React from 'react';

export default function SubscribeBanner() {
  return (
    <section className="subscribe-banner container two-col">
      <div className="text">
        <h3>Subscribe for notifications about new literary hits</h3>
      </div>
      <div className="image">
        <img src="/images/subscribe.jpg" alt="Reading books" />
      </div>
    </section>
  );
}
