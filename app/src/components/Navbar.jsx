import React from 'react';

const Navbar = () => (
  <header className="navbar">
    <section className="navbar-section">
      <a href="/#" className="navbar-brand mr-2">Notes App</a>
    </section>
    <section className="navbar-section">
      <div className="input-group input-line">
        <input type="text" className="form-input" placeholder="Search note" />
      </div>
    </section>
  </header>
);

export default Navbar;
