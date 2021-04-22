import Link from 'next/link';
import { IFilm } from '../../types';

import s from './Film.module.scss';

type Props = { film: IFilm };

export function Film({ film }: Props): JSX.Element {
  const persons = film.characterConnection.characters;

  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        Episode {film.episodeID}: {film.title}
      </h2>
      <div className={s.film__info}>
        <p className={s.film__crawl}>{film.openingCrawl}</p>
        <div className={s.film__characters}>
          <h3>Characters</h3>
          {persons.map((p, i) => (
            <Link key={i} href={`/characters/${p.id}`}>
              {p.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
