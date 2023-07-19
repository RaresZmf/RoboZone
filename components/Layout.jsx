import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Head from 'next/head';
import Loading from './Loading';
import NavBar from './NavBar';

export default function Layout({ children }) {
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
      </main> </>: <Loading />}
    </>
  )

}
