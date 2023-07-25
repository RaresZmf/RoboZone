import supabase from '../../../utils/supabase';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Postcard from '../../../components/Postcard';
import {LogoutIcon, PlusIcon} from '@heroicons/react/solid'


export default function CommunityView() {
    const [articles, setarticles] = useState([])
    const router = useRouter();

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("MD")
                .select("*")
                .eq("community", true)
                .limit(100)
                .order("id", { ascending: false });

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
        fetchData()
    }, [])

    return (
        <div className='flex flex-col items-center sm:text-left text-center select-none max-w-4xl'>
            <div className='flex sm:flex-row flex-col items-center content-center justify-between'>
                <div className='flex flex-col space-y-3 justify-center sm:items-start items-center sm:mr-[70px]'>
                    <span className='text-3xl font-bold underline decoration-6 decoration-blue-500'>Community</span>
                    <span className='text-gray-500 text-xl max-w-3xl '>Exploram tehnologia împreună</span>
                    <div className='flex flex-col items-center sm:flex-row sm:space-y-0 sm:space-x-5 space-y-5'>
                        <button onClick={()=>router.push('/posts/community/postari')} className="px-4 h-[35px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl">Editeaza postarile</button>
                        <button onClick={()=>router.push('/posts/community/add')} className="w-fit px-4 h-[35px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl flex items-center justify-center font-bold"><span>Posteaz&#259;</span><PlusIcon className='w-4 h-4' /></button>
                    </div>
                </div>
                <div className='animate-floatingsmall2'>
                    <div className='relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] sm:left-0'>
                        <Image src={'https://res.cloudinary.com/dvntmruhr/image/upload/v1689773313/Data_Learning_ake15t.png'} alt='' width={300} height={300} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col pb-32 bg-white rounded-xl w-full sm:px-[0%] px-[8%]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                    {articles.map((item) => (
                        <div className='' key={'ROBOZONE_COMMUNITY_POST_X_'+item.id} onClick={() => router.push('/post/' + item.id)}>
                            <Postcard id={item.id} title={item.title} description={item.subtitle} community={true} likes={item.liked_by.length} creatorpic={item.creator_pic} creatorname={item.creator_name} created={item.created_at}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}