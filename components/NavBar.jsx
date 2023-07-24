import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {LogoutIcon, PlusIcon} from '@heroicons/react/solid'
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import PageLink from '../components/PageLink';
import AnchorLink from '../components/AnchorLink';
import Link from 'next/link';
import LogoPNG from '../public/logoCol.png';
import { useRouter } from 'next/router';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();

  return (
    <div className='flex flex-row w-full sm:justify-around justify-center items-center content-center sm:static fixed top-[15px] z-50'>
      <Link href='/'>
        <span className='hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 font-extrabold text-xl'>RoboZone</span>
      </Link>
      <div className='flex flex-row border overflow-hidden sm:text-base text-xs bg-white w-fit rounded-full items-center content-center space-x-3 sm:space-x-6 font-bold'>
          <Link href='/posts/course' className='bg-blue-500 text-white py-3 sm:pb-2 px-3 sm:px-7 sm:rounded-l-full h-full flex flex-row items-center content-center justify-center space-x-2'>
            <span>Lectii</span>
          </Link>
          <Link href='/posts/community' className='bg-white text-gray-500 transition duration-300 ease-in-out hover:text-black'>
            Community
          </Link>
          <Link href='/exercises' className='bg-white text-gray-500 transition duration-300 ease-in-out hover:text-black'>
            Exerci&#355;ii
          </Link>
          <Image onClick={() => router.push('/account/settings')} src={user?.picture} width={40} height={40} alt={user?.nickname} className="rounded-full cursor-pointer border-2 border-white" />
      </div>
    </div>
  );
};

export default NavBar;
