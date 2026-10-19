"use client";

import Image from "next/image";
import { useRef, type MouseEvent, type PointerEvent } from "react";
import styles from "./page.module.css";
import interaction from "./film-card.module.css";

export type FeaturedFilm = {
  id: string;
  title: string;
  subtitle: string;
  synopsis: string;
  director: string;
  year: number;
  genres: string;
  image: string;
  alt: string;
};

function outsideDialog(event: MouseEvent<HTMLDialogElement> | PointerEvent<HTMLDialogElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;
}

export function FilmCard({ film }: { film: FeaturedFilm }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const startedOnBackdrop = useRef(false);
  const dialogId = `${film.id}-dialog`;
  const titleId = `${film.id}-title`;
  const synopsisId = `${film.id}-synopsis`;
  const image = `/images/approved/${film.image}.webp`;

  function open() {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    closeButton.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <article id={film.id} className={`${styles.filmCard} ${interaction.card}`}>
        <div className={`${styles.filmImage} ${interaction.image}`}>
          <Image src={image} alt={film.alt} fill sizes="(max-width: 600px) 85vw, 28vw" />
          <span className={interaction.overlay} aria-hidden="true">
            <span className={interaction.diagonalArrow}>&#8599;</span>
          </span>
        </div>
        <h3>{film.title}</h3>
        <p className={styles.filmSubtitle}>{film.subtitle}</p>
        <p className={styles.filmGenres}>{film.genres}</p>
        <button
          ref={trigger}
          type="button"
          className={interaction.trigger}
          aria-label={`View details for ${film.title}`}
          aria-haspopup="dialog"
          aria-controls={dialogId}
          onClick={open}
        />
      </article>

      <dialog
        ref={dialog}
        id={dialogId}
        className={interaction.dialog}
        aria-labelledby={titleId}
        aria-describedby={synopsisId}
        onClose={() => {
          startedOnBackdrop.current = false;
          trigger.current?.focus({ preventScroll: true });
        }}
        onPointerDown={(event) => {
          startedOnBackdrop.current = event.target === event.currentTarget && outsideDialog(event);
        }}
        onClick={(event) => {
          if (startedOnBackdrop.current && event.target === event.currentTarget && outsideDialog(event)) {
            event.currentTarget.close();
          }
          startedOnBackdrop.current = false;
        }}
      >
        <div className={interaction.modalContent}>
          <div className={interaction.modalImage}>
            <Image src={image} alt={film.alt} fill sizes="(max-width: 640px) 90vw, 420px" />
          </div>
          <div className={interaction.details}>
            <button ref={closeButton} type="button" className={interaction.close} onClick={() => dialog.current?.close()}>
              CLOSE <span aria-hidden="true">&#215;</span>
            </button>
            <p className={interaction.eyebrow}>FEATURED FILM</p>
            <h2 id={titleId}>{film.title}</h2>
            <p id={synopsisId} className={interaction.synopsis}>{film.synopsis}</p>
            <dl className={interaction.metadata}>
              <div><dt>Director</dt><dd>{film.director}</dd></div>
              <div><dt>Year</dt><dd>{film.year}</dd></div>
              <div><dt>Genres</dt><dd>{film.genres}</dd></div>
            </dl>
          </div>
        </div>
      </dialog>
    </>
  );
}
