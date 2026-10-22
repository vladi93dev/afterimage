import Image from "next/image";
import Link from "next/link";
import { EntranceAnimations } from "./entrance-animations";
import { FilmCard, type FeaturedFilm } from "./film-card";
import { NewsletterForm, Search } from "./home-controls";
import styles from "./page.module.css";
import entrance from "./entrance-animations.module.css";

const films: FeaturedFilm[] = [
  {
    id: "the-quiet-between",
    title: "The Quiet Between",
    subtitle: "A place out of time.",
    synopsis: "Returning to an abandoned observatory, a solitary archivist discovers a town that appears on no map. As familiar voices echo through its concrete halls, the boundary between memory and the present begins to dissolve.",
    director: "Mara Voss",
    year: 2024,
    genres: "Drama · Mystery · Surreal",
    image: "film-quiet-between",
    alt: "A lone figure approaches a circular concrete ruin in the mist.",
  },
  {
    id: "hollow-tides",
    title: "Hollow Tides",
    subtitle: "Some things don't stay buried.",
    synopsis: "A woman returns to her coastal village after the disappearance of her sister. Each night, the tide carries fragments of a forgotten ritual ashore, drawing her toward something the village has spent generations refusing to name.",
    director: "Elias Rook",
    year: 2023,
    genres: "Folk horror · Psychological · Cult",
    image: "film-hollow-tides",
    alt: "A woman's face emerges from dark, still water.",
  },
  {
    id: "the-receiver",
    title: "The Receiver",
    subtitle: "Some signals shouldn't be found.",
    synopsis: "At a remote listening station, a technician intercepts a transmission that seems to describe events before they happen. Following the signal into a deserted landscape, he begins to suspect that someone is listening back.",
    director: "Irena Vale",
    year: 2025,
    genres: "Sci-fi · Thriller · Experimental",
    image: "film-receiver",
    alt: "A figure crosses a rocky landscape beneath an immense radio telescope.",
  },
];

function Arrow() {
  return (
    <span aria-hidden="true" className={styles.arrow}>
      &#10230;
    </span>
  );
}

function Navigation({ footer = false }: { footer?: boolean }) {
  return (
    <nav
      className={footer ? styles.footerNav : styles.navigation}
      aria-label={footer ? "Footer navigation" : "Main navigation"}
    >
      <a href="#films">FILMS</a>
      <a href="#manifesto">ABOUT</a>
      <a href="#join">JOIN</a>
    </nav>
  );
}

export default function Home() {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>
      <div className={styles.opening}>
        <header className={`${styles.header} ${styles.container}`}>
          <Link className={styles.wordmark} href="/">
            AFTERIMAGE
          </Link>
          <Navigation />
          <div className={styles.headerActions}>
            <Search films={films} />
            <a className={styles.joinLink} href="#join">
              JOIN
            </a>
          </div>
        </header>
        <main id="main">
          <EntranceAnimations />
          <section className={styles.hero} aria-labelledby="hero-title">
            <div
              className={`${styles.heroArt} ${entrance.reveal} ${entrance.heroImage}`}
              data-entrance="hero-image"
            >
              <Image
                src="/images/approved/hero-architecture.webp"
                alt="A solitary figure stands in a vast brutalist chamber, facing a tall opening of cold light."
                fill
                sizes="(max-width: 600px) 100vw, 52vw"
                preload
              />
            </div>
            <div className={`${styles.heroInner} ${styles.container}`}>
              <div className={styles.heroCopy}>
                <p
                  className={`${styles.heroEyebrow} ${entrance.reveal} ${entrance.heroEyebrow}`}
                  data-entrance="hero-eyebrow"
                >
                  ARTHOUSE
                  <br />
                  INDEPENDENT
                  <br />
                  EXPERIMENTAL
                  <br />
                  CINEMA
                </p>
                <h1
                  id="hero-title"
                  className={`${styles.heroTitle} ${entrance.reveal} ${entrance.heroTitle}`}
                  data-entrance="hero-title"
                >
                  ALL THE LIVES
                  <br />
                  WE HAVEN'T LIVED.
                </h1>
                <p
                  className={`${styles.heroDescription} ${entrance.reveal} ${entrance.heroDescription}`}
                  data-entrance="hero-description"
                >
                  An independent selection of strange and overlooked films.
                </p>
                <a
                  className={`${styles.button} ${entrance.reveal} ${entrance.heroCta}`}
                  data-entrance="hero-cta"
                  href="#films"
                >
                  EXPLORE THE COLLECTION <Arrow />
                </a>
              </div>
            </div>
          </section>

          <section
            id="films"
            className={styles.featured}
            aria-labelledby="films-title"
          >
            <div className={styles.container}>
              <div className={styles.sectionHeading}>
                <h2 id="films-title">FEATURED FILMS</h2>
                <span className={styles.headingLine} aria-hidden="true" />
              </div>
              <div className={styles.filmGrid}>
                {films.map((film) => (
                  <FilmCard key={film.id} film={film} />
                ))}
              </div>
            </div>
          </section>

          <section
            id="manifesto"
            className={styles.manifesto}
            aria-labelledby="manifesto-title"
          >
            <div className={styles.manifestoArt}>
              <Image
                src="/images/approved/manifesto-sculpture.webp"
                alt="A weathered sculptural face turns upward through a veil of grain and rain."
                fill
                sizes="(max-width: 600px) 100vw, 42vw"
              />
            </div>
            <div className={`${styles.editorialInner} ${styles.container}`}>
              <div
                className={`${styles.editorialCopy} ${entrance.reveal} ${entrance.manifesto}`}
                data-entrance="manifesto"
              >
                <p className={styles.sectionEyebrow}>
                  ABOUT <span aria-hidden="true" />
                </p>
                <h2 id="manifesto-title">OFF THE RADAR.</h2>
                <p id="about" className={styles.manifestoText}>
                  Some films are overlooked, difficult to categorize, or simply
                  never find a wide audience. They come from different places,
                  tell unusual stories, and explore ideas outside conventional
                  cinema.
                </p>

                <p className={styles.manifestoText}>
                  AFTERIMAGE brings together independent, arthouse, and
                  experimental films, focusing on lesser-known filmmakers and
                  work worth discovering.
                </p>
              </div>
            </div>
          </section>

          <section
            id="join"
            className={styles.signup}
            aria-labelledby="join-title"
          >
            <div className={styles.signupArt}>
              <Image
                src="/images/approved/signup-door.webp"
                alt="A small monolithic doorway glows on a desolate plain."
                fill
                sizes="(max-width: 600px) 100vw, 42vw"
              />
            </div>
            <div className={`${styles.editorialInner} ${styles.container}`}>
              <div
                className={`${styles.signupCopy} ${entrance.reveal} ${entrance.newsletter}`}
                data-entrance="newsletter"
              >
                <p className={styles.sectionEyebrow}>
                  NEWSLETTER <span aria-hidden="true" />
                </p>
                <h2 id="join-title">THE AFTERIMAGE LETTER</h2>
                <p id="journal" className={styles.signupText}>
                  Occasional letters on forgotten films, new discoveries,
                  <br className={styles.desktopBreak} /> and the strange corners
                  of cinema.
                </p>
                <NewsletterForm />
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className={styles.footer}>
        <div className={`${styles.footerInner} ${styles.container}`}>
          <Link className={styles.footerBrand} href="/">
            AFTERIMAGE
          </Link>
          <p>
            Designed & developed by{" "}
            <a
              href="https://github.com/vladi93dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vladi Semyonov
            </a>{" "}
            © 2026
          </p>
          <Navigation footer />
          <div className={styles.socialMarks} aria-hidden="true">
            <span>𝕏</span>
            <span>◎</span>
            <svg viewBox="0 0 20 16">
              <rect
                x="1"
                y="2"
                width="18"
                height="12"
                rx="3"
                fill="currentColor"
              />
              <path d="m8 5 5 3-5 3Z" fill="var(--color-background)" />
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}
