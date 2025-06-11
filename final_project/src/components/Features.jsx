// src/components/Features.jsx
import React from 'react';

const rowOne = [
  {
    title: 'Build your own book club and connect with people from all over the world',
    img: '/images/connect.png',     
  },
  {
    title: 'User-made reviews and recommendations',
    img: '/images/reviews.png',       
  },
];

const rowTwo = [
  {
    title: 'Use forums to connect/discuss with other users',
    img: '/images/forums.png',       
  },
  {
    title: 'Recommended locations for clubs',
    img: '/images/locations.png',  
  },
  {
    title: 'Subscribe for notifications about new literary hits',
    img: '/images/subscribe.png',    
  },
];

export default function Features() {
  return (
    <>
      <div className="row-two container">
        {rowOne.map((item, idx) => (
          <div key={idx} className="card">
            <img src={item.img} alt="" className="card-bg" />
            <div className="overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="row-three container">
        {rowTwo.map((item, idx) => (
          <div key={idx} className="card">
            <img src={item.img} alt="" className="card-bg" />
            <div className="overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
