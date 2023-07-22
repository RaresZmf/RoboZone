import { useRouter } from 'next/router';
import supabase from '../../utils/supabase';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Chat from '../../components/chatLectie';

import dynamic from "next/dynamic";
const EditorView = dynamic(
  () => import("../../components/Editorview"),
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

  function time(time) {
    var m = moment(time);
    return m.fromNow();
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
  }, []);

  const removeValue = (valueToRemove) => {
    const updatedArray = peopleLiked.filter((value) => value !== valueToRemove);
    setpeopleLiked(updatedArray);
  };

  const addValue = (valueToAdd) => {
    const updatedArray = peopleLiked.concat(valueToAdd);
    setpeopleLiked(updatedArray);
  };

  async function toggleLike() {
    try {
      const id = router.query.id;

      if (already_liked) {
        setlikes((prevLikes) => prevLikes - 1);
        setalready_liked(false);

        const updatedPeopleLiked = peopleLiked.filter((value) => value !== user.sub);
        removeValue(user.sub);

        const { data, error } = await supabase.from("MD")
        .update({ liked_by: updatedPeopleLiked })
        .eq("id", 53)

        console.log('Elementul a fost actualizat cu succes:', updatedPeopleLiked);
        return data;
      } else {
        setlikes((prevLikes) => prevLikes + 1);
        setalready_liked(true);

        const updatedPeopleLiked = [...peopleLiked, user.sub];
        addValue(user.sub);

        const { data, error } = await supabase.from("MD")
        .update({ liked_by: updatedPeopleLiked })
        .eq("id", 53)

        console.log('Elementul a fost actualizat cu succes:', updatedPeopleLiked);
        return data;
      }
    } catch (error) {
      console.error('Eroare la actualizarea elementului:', error);
      return null;
    }
  }



  return (
    <>
      <div className='flex flex-col items-center content-center space-y-10 py-24'>
        <div className='flex flex-row justify-center content-center text-center'>
          <span className='font-bold text-center text-6xl decoration-6 decoration-blue-500 underline'>
            {post?.title}
          </span>
        </div>
        <div className='flex flex-row items-center content-center justify-center space-x-5'>
          <Image src={post?.creator_pic} width={50} height={50} alt='' className='rounded-full shadow' />
          <div className='flex flex-col justify-center items-start content-start'>
            <span className='text-center font-bold underline decoration-blue-500 decoration-4 text-lg'>{post?.creator_name}</span>
            <span className='text-center text-gray-500 text-sm'>{time(post?.created_at)}</span>
          </div>
          <div className='rounded-full ring-2 ring-red-500 flex flex-row items-center content-center '>
            <HeartIcon onClick={() => toggleLike()} className={!peopleLiked.includes(user.sub) ? 'w-7 h-7 text-red-500 p-1 ring-2 ring-red-500 rounded-full transition duration-300 ease-in-out hover:bg-red-500 hover:text-white cursor-pointer' : 'w-7 h-7 text-white bg-red-500 ring-2 ring-red-500 p-1 rounded-full'} />
            <span className='text-red-500 px-4 text-xs'>{peopleLiked.length} aprecieri</span>
          </div>
        </div>
        {isPostLoaded && <EditorView json={post.json} />}
        <div>
          {isPostLoaded && post.json && <Chat lessonContent={JSON.stringify(post.json)}/>}
        </div>
      </div>
    </>
  );
}
