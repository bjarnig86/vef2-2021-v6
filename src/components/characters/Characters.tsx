import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter, IPaging } from '../../types';

type Props = {
  people: Array<ICharacter>;
  pageInfo: IPaging;
};

let hasNext = true;

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
// type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters({ people, pageInfo }: Props): JSX.Element {
  // TODO meðhöndla loading state, ekki þarf sérstaklega að villu state
  const [loading, setLoading] = useState<boolean>(false);

  // TODO setja grunngögn sem koma frá server
  const [characters, setCharacters] = useState<Array<ICharacter>>([]);
  useEffect(() => {
    setCharacters(people);
  }, [people]);

  const [nextPage, setNextPage] = useState<string | null>(null);
  useEffect(() => {
    setNextPage(pageInfo.endCursor);
  }, [pageInfo]);

  const fetchMore = async (): Promise<void> => {
    if (hasNext) {
      setLoading(true);
      try {
        const morePeople = await fetch(`api/characters?after=${nextPage}`);

        if (!morePeople.ok) {
          console.error('error');
        }
        const json = await morePeople.json();
        const more = json.allPeople.people;
        more.map((i: ICharacter) => characters.push(i));

        setNextPage(json.allPeople.pageInfo.endCursor);
        hasNext = json.allPeople.pageInfo.hasNextPage;
      } catch (e) {
        throw new Error(`gat ekki sótt gögn: ${e.message} `);
      } finally {
        setLoading(false);
      }
    }

    // TODO sækja gögn frá /pages/api/characters.ts (gegnum /api/characters), ef það eru fleiri
    // (sjá pageInfo.hasNextPage) með cursor úr pageInfo.endCursor
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>

      <p>{loading ? 'Fetching...' : ''}</p>

      <Button disabled={loading || !hasNext} onClick={fetchMore}>
        Fetch more
      </Button>
    </section>
  );
}
