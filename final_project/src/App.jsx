import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header   from './components/Header';
import Footer   from './components/Footer';

import Home     from './components/Home';
import BookClub from './components/BookClub';
import Blog     from './components/Blog';
import SignIn   from './components/SignIn';
import SignUp   from './components/SignUp';

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/"         element={<Home />}     />
          <Route path="/bookclub" element={<BookClub />} />
          <Route path="/blog"     element={<Blog />}     />
          <Route path="/signin"   element={<SignIn />}   />
          <Route path="/signup"   element={<SignUp />}   />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
