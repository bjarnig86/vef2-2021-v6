import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCharacters } from '../../lib/swapi';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const after = req.query?.after as string | null;
  // TODO sækja næstu síðu af gögnum hér
  let morePeople;
  if (after) {
    morePeople = await fetchCharacters(after);
  }
  return res.status(200).json(morePeople);
};

// hægt að kalla í apis með fetch()
