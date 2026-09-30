import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-screen">
      <section className="home-hero" aria-labelledby="home-title">
        <img
          className="home-hero-image"
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2400&q=85"
          alt="Deep teal ocean waves breaking into white foam"
          fetchPriority="high"
        />
        <div className="home-content">
          <p className="home-kicker">PERSONAL TASK LOG / 01</p>
          <h1 className="home-title" id="home-title">
            Stone Ocean
            <span>Task Manager</span>
          </h1>
          <p className="home-description">
            Make room for what matters. Keep your day moving, one task at a
            time.
          </p>
          <div className="home-actions">
            <Link to="/register" className="button">
              Create account
            </Link>
            <Link to="/login" className="button button-secondary">
              Log in
            </Link>
            <Link to="/dashboard" className="button button-tertiary">
              Open dashboard
            </Link>
          </div>
        </div>
        <p className="home-image-note">OPEN WATER / CLEAR INTENT</p>
      </section>
      <section className="home-next" aria-label="Continue to your workspace">
        <span>THE DAILY LOG</span>
        <Link to="/dashboard">
          Continue to your workspace <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

export default Home;
