import Image from 'next/image';
import LOGO from '../assets/logo.png';
import LOGOW from '../assets/logow.png';

export default function Logo() {
  return (
    <Image src={LOGOW} width={50} height={50} alt="logo" className="mx-auto " />
  );
}
