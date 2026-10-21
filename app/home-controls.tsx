"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

type SearchFilm = { id: string; title: string; genres: string };

export function Search({ films }: { films: SearchFilm[] }) {
  const [query, setQuery] = useState("");
  const matches = films.filter((film) => `${film.title} ${film.genres}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <details className={styles.search}>
      <summary aria-label="Search films">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </summary>
      <div className={styles.searchPanel}>
        <label htmlFor="film-search">SEARCH THE COLLECTION</label>
        <input id="film-search" type="search" placeholder="Title or genre" value={query} onChange={(event) => setQuery(event.target.value)} />
        <ul aria-label="Matching films">
          {matches.map((film) => <li key={film.id}><a href={`#${film.id}`} onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); }}>{film.title}</a></li>)}
        </ul>
        {matches.length === 0 && <p role="status">No films found.</p>}
      </div>
    </details>
  );
}

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form className={styles.signupForm} onSubmit={submit}>
      <label className={styles.visuallyHidden} htmlFor="newsletter-email">
        Your email address
      </label>
      <div className={styles.signupFields}>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          required
          aria-describedby={submitted ? "signup-status" : undefined}
        />
        <button type="submit">
          JOIN THE LIST <span aria-hidden="true">&#10230;</span>
        </button>
      </div>
      {submitted && (
        <p id="signup-status" className={styles.signupStatus} role="status">
          Subscriptions open soon. Your email has not been saved.
        </p>
      )}
    </form>
  );
}
