// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  name?: string;
  birthYear: string;
  eyeColor: string;
  hairColor: string;
  height: number;
  mass: number;

  allPeople: {
    people: Array<ICharacter>;
    pageInfo: IPaging;
  };

  person: ICharacter;
}

export interface IFilm {
  title: string;
  episodeID: number;
  openingCrawl: string;
  characterConnection?: {
    characters: Array<ICharacter>;
  };
}

export interface IFilmResponse {
  allFilms?: {
    films: Array<IFilm>;
  };
}

export interface IPeopleResponse {
  allPeople: {
    people: Array<ICharacter>;
    pageInfo: IPaging;
  };
}

export interface IPaging {
  endCursor: string;
  hasNextPage: boolean;
}

// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
// og svör sem við fáum frá GraphQL endapunkti
