import SEO from '@/components/SEO';
import SearchForm from '@/components/SearchForm';
import { useRouter } from 'next/router';

export default function Home() {
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
    </>
  );
}
