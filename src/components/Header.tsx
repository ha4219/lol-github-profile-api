import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="p-5 text-center">
      <Link href="/">
        <Logo />
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          lol-github-profile-api
        </h1>
      </Link>
    </header>
  );
}
