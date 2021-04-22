import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Characters } from '../../components/characters/Characters';

import { Layout } from '../../components/layout/Layout';
import { fetchCharacters } from '../../lib/swapi';
import { ICharacter, IPaging } from '../../types';

export type PageProps = {
  peopleResponse: Array<ICharacter>;
  pageInfo: IPaging; // TODO EKKI any
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { peopleResponse, pageInfo } = data;

  return (
    <Layout>
      <Head>
        <title>Star Wars characters</title>
      </Head>
      <h1>Star Wars characters</h1>
      <Characters people={peopleResponse} pageInfo={pageInfo} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // TODO sækja karaktera
  const peopleResponse = await fetchCharacters('endCursor');

  return {
    props: {
      peopleResponse: peopleResponse?.allPeople?.people ?? null,
      pageInfo: peopleResponse?.allPeople?.pageInfo ?? null,
    },
  };
};
