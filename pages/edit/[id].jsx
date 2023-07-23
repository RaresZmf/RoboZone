import { useRouter } from 'next/router';
import supabase from '../../utils/supabase';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Chat from '../../components/chatLectie';

import dynamic from "next/dynamic";
const EditorEdit= dynamic(
  () => import("../../components/Editoredit"),
  { ssr: false }
);
import { useUser } from '@auth0/nextjs-auth0/client';
import { HeartIcon } from '@heroicons/react/solid';
import Image from 'next/image';


export default function ViewPost() {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const [already_liked, setalready_liked] = useState(false)
  const [likes, setlikes] = useState(0)
  const [peopleLiked, setpeopleLiked] = useState([])
  const { user } = useUser();
  const [markdown, setMarkdown] = useState('');
  const [isPostLoaded, setIsPostLoaded] = useState(false); // Variabila de stare pentru a urmări încărcarea completă a postului
  const [title, settitle] = useState(post?.title)
  const originalTitle = post?.title;
  const [isadmin, setisadmin] = useState(false)


  function time(time) {
    var m = moment(time);
    return m.fromNow();
  }

  async function fetchAdmin() {
    const { data, error } = await supabase
        .from('authdata')
        .select("admin")
        .eq("auth0id", user.sub)
        .limit(1);
        setisadmin(data[0].admin)
  }

  async function fetchData(id) {
    try {
      const { data, error } = await supabase
        .from('MD')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return null;
      }

      console.log(data);
      setPost(data);
      setMarkdown(data.content);
      setpeopleLiked(data.liked_by)
      setIsPostLoaded(true); // Setăm variabila de stare la true după ce postul a fost încărcat complet
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    fetchData(router.query.id);
    fetchAdmin();
  }, []);

  if(post?.creator == user.sub || isadmin == true)
  {
    return (
        <>
          <div className='flex flex-col items-center content-center space-y-10 py-24'>
            <div className='flex flex-row justify-center content-center text-center'>
              <input disabled={true} value={title} onChange={(e) => settitle(e.target.value)} className='font-bold bg-transparent justify-center w-full text-center caret-blue-500 border-transparent focus:border-transparent focus:ring-0 text-6xl focus:outline-none' placeholder={post?.title} />
            </div>
            <div className='flex flex-row items-center content-center justify-center space-x-5'>
              <Image src={post?.creator_pic} width={50} height={50} alt='' className='rounded-full shadow' />
              <div className='flex flex-col justify-center items-start content-start'>
                <span className='text-center font-bold underline decoration-blue-500 decoration-4 text-lg'>{post?.creator_name}</span>
                <span className='text-center text-gray-500 text-sm'>{time(post?.created_at)}</span>
              </div>
            </div>
            {isPostLoaded && <EditorEdit json={post.json} id={router.query.id}/>}
          </div>
        </>
      );
  }
  else
  {
    return(
        <div className='flex flex-row justify-center content-center items-center'>
    <p className='text-black font-bold text-3xl underline decoration-4 decoration-blue-500'>Nu ai acces sef</p>
    </div>
    )
    
  }
}
