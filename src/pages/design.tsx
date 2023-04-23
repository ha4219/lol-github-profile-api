import SEO from '@/components/SEO';
import SearchForm from '@/components/SearchForm';
import { rankInfo, summoner } from '@/types/res';
import cards from '@/utils/card/cards';
import { OpggCard } from '@/utils/card/opgg';
import { renderStylesToString } from '@emotion/server';
import { useRouter } from 'next/router';
import { renderToString } from 'react-dom/server';

export default function DesignPage({ userInfo }: { userInfo: rankInfo[] }) {
  const router = useRouter();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    if (!target.search.value) return;
    router.push({
      pathname: `/design`,
      query: { search: target.search.value },
    });
  };

  return (
    <>
      <SEO />
      <SearchForm handleSubmit={handleSubmit} />
      {userInfo.map(
        (item) => {
          return cards.map((Card) => (
            <div
              key={item.leagueId + Card.name}
              dangerouslySetInnerHTML={{
                __html: renderStylesToString(
                  renderToString(<Card {...item} />),
                ),
              }}
            />
          ));
        },
        // )),
      )}
    </>
  );
}

export async function getServerSideProps(context: {
  query: { search: string };
}) {
  const { search } = context.query;
  const API_KEY = process.env.RIOT_API_KEY as string;
  const API_URL = process.env.RIOT_API_URL as string;

  const so: summoner = await fetch(
    `${API_URL}/summoner/v4/summoners/by-name/${search}`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());
  const userInfo: rankInfo[] = await fetch(
    `${API_URL}/league/v4/entries/by-summoner/${so.id}`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    },
  ).then((res) => res.json());

  return {
    props: {
      userInfo,
    },
  };
}
