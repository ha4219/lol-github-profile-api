import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-[50%] translate-x-[-50%] whitespace-nowrap p-6 text-sm text-center">
      <Link
        href="https://github.com/ha4219/lol-github-profile-api"
        className="text-white"
      >
        please visit github page
      </Link>
      <p className="pt-5">
        <span className="text-gray-600">
          Copyright &copy; {new Date().getFullYear()} ha4219
        </span>
      </p>
    </footer>
  );
}
