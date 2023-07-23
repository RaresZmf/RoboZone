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
    <div className='flex flex-row w-full my-[20px] sm:justify-around justify-center items-center content-center'>
      <Link href='/'>
        <span className='hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 font-extrabold text-xl'>RoboZone</span>
      </Link>
      <div className='flex flex-row border sm:rounded-xl overflow-hidden sm:text-base text-xs bg-white sm:rounded-l-full w-fit sm:rounded-r-full rounded-xl items-center content-center sm:space-x-1 font-bold'>
        <div className='flex flex-col items-center justify-center space-y-2 sm:space-y-0 sm:space-x-7  sm:inline sm:p-[0px]'>
          <Link href='/posts/community/add' className='bg-blue-500 text-white py-2 px-[10px] sm:rounded-l-full flex flex-row items-center content-center justify-center space-x-2'>
            <span>Posteaz&#259;</span><PlusIcon className='w-4 h-4' />
          </Link>
          <Link href='/' className='sm:hidden text-center bg-white pb-[12px] text-gray-500 transition duration-300 ease-in-out hover:text-black'>
            Home
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center space-y-2 sm:space-y-0 sm:space-x-7 py-[5px] px-[10px] sm:inline p-[0px]'>
          <Link href='/posts/course' className='bg-white text-gray-500 transition duration-300 ease-in-out hover:text-black'>
            Lectii
          </Link>
          <Link href='/posts/community' className='bg-white text-gray-500 transition duration-300 ease-in-out hover:text-black'>
            Community
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center space-y-2 sm:space-y-0 sm:space-x-7 py-[5px] px-[10px] sm:inline p-[0px]'>
          <Link href='/exercises' className='bg-white text-gray-500 transition duration-300 ease-in-out hover:text-black'>
            Exerci&#355;ii
          </Link>
          <Link href='/account/settings' className='sm:hidden bg-white text-gray-500 transition duration-300 ease-in-out hover:text-black'>
            Account
          </Link>
        </div>
        <Image onClick={() => router.push('/account/settings')} src={user?.picture} width={40} height={40} alt={user?.nickname} className="hidden sm:inline rounded-full cursor-pointer border-2 border-white" />
      </div>
    </div>
  );
};

export default NavBar;
