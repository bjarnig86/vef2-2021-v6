import Link from 'next/link';
import { ICharacter } from '../../types';
import s from './Person.module.scss';

type Props = {
  person: ICharacter;
};

export function Person({ person }: Props): JSX.Element {
  return (
    <div className={s.person}>
      <h1>{person.name}</h1>
      <h3>Birth year:</h3>
      <p>{person.birthYear}</p>
      <h3>Eye color:</h3>
      <p>{person.eyeColor}</p>
      <h3>Hair Color:</h3>
      <p>{person.hairColor}</p>
      <h3>Heigth:</h3>
      <p>{person.height} cm</p>
      <h3>Mass:</h3>
      <p>{person.mass} kg</p>
      <div className={s.person__link}>
        <Link href="/characters">Back to characters</Link>
      </div>
    </div>
  );
}
