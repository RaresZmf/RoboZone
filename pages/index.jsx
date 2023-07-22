import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Hero from '../components/Hero';
import Content from '../components/Content';
import supabase from '../utils/supabase';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import Postcard from '../components/Postcard';
import { useUser } from '@auth0/nextjs-auth0/client';

import ProTip from '../components/proTip';

export default function Index() {
  const { user, isLoading } = useUser();
  const [articles, setarticles] = useState([])
  const textVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8, // Durata totală a animației
      },
    },
  };
  const textVariants2 = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2, // Intervalul între cuvinte
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  async function fetchUser(){
      const { data, error } = await supabase
        .from('authdata')
        .select("*")
        .eq("auth0id", user.sub)
        .limit(1);

        console.log(data);
        console.log(error);

        if(data.length<1)
      {
        await supabase
        .from('authdata')
        .insert({auth0id: user.sub});

        console.log("added user");
      }
      else
      {
        console.log("user already exists");
      }
  }

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("MD")
        .select("*")
        .eq("introduction", true)
        .limit(10);

      if (error) {
        console.error(error);
        return null;
      }
      setarticles(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
    fetchUser();
  }, [])
  const words = [
    "Explorează",
    "fascinanta",
    "lume",
    "a",
    "inovației",
    "și",
    "a",
    "posibilităților",
    "nelimitate",
    "pentru",
    "a-ți",
    "dezvolta",
    "creativitatea",
    "și",
    "abilitățile",
    "într-un",
    "domeniu",
    "plin",
    "de",
    "descoperiri",
    "captivante.",
  ];
  const router = useRouter();
  return (
    <>
      <div className='flex flex-col items-center content-center select-none'>
        <div className='absolute top-0 left-10 translate-y-[300px]'>
          <Image src={'https://res.cloudinary.com/dvntmruhr/image/upload/v1689724243/UI%20Icons/Automation_Testing_tuh2zs.png'} width={300} height={300} alt="" className='' />
        </div>
        <div className='absolute top-0 right-0 translate-y-[150px] -translate-x-[30px]'>
          {/* <Image src={'https://res.cloudinary.com/dvntmruhr/image/upload/v1689724243/UI%20Icons/Chatbot_f8xvfz.png'} width={300} height={300} alt="" className='animate-floatingsmall2' /> */}
          <ProTip />
        </div>
        <div className="text-6xl font-bold text-center">
      <motion.span
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Învață
      </motion.span>{" "}
      <motion.span
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          className="bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          robotică
        </motion.span>
      </motion.span>
      .
    </div>
    <motion.span
        variants={textVariants2}
        initial="hidden"
        animate="visible"
        className="text-gray-500 max-w-3xl text-center mt-4"
      >
        {words.map((word, index) => (
          <motion.span key={index} variants={wordVariants}>
            {word}{" "}
          </motion.span>
        ))}
      </motion.span>
        <button onClick={() => router.push('/posts/course')} className='px-4 py-2 rounded-xl bg-blue-500 ring-2 ring-offset-2 ring-blue-500 mt-6 transition duration-300 ease-in-out hover:ring-offset-4 text-white font-medium outline-2'>
          C&#259;tre cursuri
        </button>
        <div className=' mt-24 w-screen px-64'>
          <div className='grid grid-cols-3 gap-10 w-full'>
            {articles.map((article) => (
              <Postcard key={'X_ROBOZONE_CARD_' + article.id} title={article.title} id={article.id} description={article.subtitle} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
