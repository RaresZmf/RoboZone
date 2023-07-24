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
          <div className='h-[100px] w-[100%] py-[50px]'>
            <NavBar />
          </div>
          <Container>{children}</Container>
          <div className='shadow-md border text-sm text-opacity-40 text-black rounded-b-none flex-wrap border-b-0 p-5 flex flex-row justify-center sm:justify-between bg-white rounded-xl max-w-[500px] w-[80vw] mx-[10%] space-x-3'>
            <Link href={"https://github.com/RaresZmf/RoboZone"}>GitHub</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/"} className='sm:hidden'>Home</Link>
            <span>Copyright 2023 &copy; RoboZone</span>
          </div>
          <div className='fixed top-[90vh] left-7 w-fit'>
            <a target='_blank' href={"https://discord.gg/Dm8Jkfyv"}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#7289da" class="bi bi-discord" viewBox="0 0 16 16">
  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
</svg></a>
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
