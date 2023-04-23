import SEO from '@/components/SEO';
import SearchForm from '@/components/SearchForm';
import { rankInfo, summoner } from '@/types/res';
import cards from '@/utils/card/cards';
import { renderStylesToString } from '@emotion/server';
import { useRouter } from 'next/router';
import { renderToString } from 'react-dom/server';
import type { QueueType } from '@/types/res';

export default function DesignPage({ userInfo }: { userInfo: rankInfo[] }) {
  const router = useRouter();
  const queueType = router.query.queueType ?? ('RANKED_SOLO_5x5' as QueueType);
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

  const user = userInfo.find((item) => item.queueType === queueType);

  return (
    <>
      <SEO />
      <SearchForm handleSubmit={handleSubmit} />
      {cards.map(({ Main, Null }) => (
        <div
          key={Main.name}
          dangerouslySetInnerHTML={{
            __html: renderStylesToString(
              renderToString(user ? <Main {...user} /> : <Null />),
            ),
          }}
        />
      ))}
    </>
  );
}

export async function getServerSideProps(context: {
  query: { search: string };
}) {
  const { search } = context.query;
  const API_KEY = process.env.RIOT_API_KEY as string;
  const API_URL = process.env.RIOT_API_URL as string;

  try {
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
  } catch {
    return {
      props: {
        userInfo: [],
      },
    };
  }
}
