import React from 'react';

export default function SignIn() {
  return (
    <main className="container">
      <h1>Sign In</h1>
      <form aria-label="Sign in form">
        <label>Email<input type="email" required/></label>
        <label>Password<input type="password" required/></label>
        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}
