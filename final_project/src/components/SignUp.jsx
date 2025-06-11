import React from 'react';

export default function SignUp() {
  return (
    <main className="container">
      <h1>Sign Up</h1>
      <form aria-label="Sign up form">
        <label>Name<input type="text" required/></label>
        <label>Email<input type="email" required/></label>
        <label>Password<input type="password" required/></label>
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}
