import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-screen">
      <section className="home-hero" aria-labelledby="home-title">
        <img
          className="home-hero-image"
          src="/images/hero-image.svg"
          alt="Hero image for the Stone Ocean home page"
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
