import React, { useState, useEffect } from 'react';
import { Container, Toast } from 'reactstrap';
import Head from 'next/head';
import Loading from './Loading';
import NavBar from './NavBar';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import toast, {Toaster} from 'react-hot-toast';
import Link from 'next/link';

function Layout({ children }) {
  const [loading, setloading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, [])
  
  return (
    <>
      {!loading ? <><Head>
        <title>RoboZone</title>
      </Head>
        <main id="app" className='flex flex-col bgpattern w-screen h-screen justify-between text-black content-center items-center'>
          <NavBar />
          <Container>{children}</Container>
          <div className='shadow-md border text-sm text-opacity-40 text-black rounded-b-none flex-wrap border-b-0 p-5 flex flex-row justify-center sm:justify-between bg-white rounded-xl max-w-[500px] w-[80vw] mx-[10%] space-x-3'>
            <Link href={"https://github.com/RaresZmf/RoboZone"}>GitHub</Link>
            <Link href={"/about"}>About</Link>
            <span>Copyright 2023 &copy; RoboZone</span>
          </div>
          <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName="sm:flex hidden"
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#fff',
            color: '#2D2F4E',
            padding: '14px'
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
        </main> </> : <Loading />}
    </>
  )
}

export default withPageAuthRequired(Layout, {
  onRedirecting: () => '',
});
