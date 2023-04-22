import SEO from '@/components/SEO';
import SearchForm from '@/components/SearchForm';
import { rankInfo, summoner } from '@/types/res';
import { opggCard, opggNullCard } from '@/utils/card/opgg';
import { sovledDotAcCard } from '@/utils/card/solvedDotAc';
import { useRouter } from 'next/router';

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
      {userInfo &&
        userInfo.map((item) => (
          <>
            <div
              key={item.summonerId}
              dangerouslySetInnerHTML={{
                __html: userInfo.length ? opggCard(item) : opggNullCard(),
              }}
            />
            <div
              key={item.summonerId}
              dangerouslySetInnerHTML={{
                __html: sovledDotAcCard(item),
              }}
            />
          </>
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
