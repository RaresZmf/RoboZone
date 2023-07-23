import supabase from '../../utils/supabase';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Postcard from '../../components/Postcard';

export default function CourseView() {
    const [articles, setarticles] = useState([])
    const [chapters, setchapters] = useState([])
    const router = useRouter();

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("MD")
                .select("*")
                .eq("community", false)
                .limit(10)
                .order("number", { ascending: false });

            if (error) {
                console.error(error);
                return null;
            }
            setarticles(data);
            // console.log(data);
            const chapters = data.reduce((acc, item) => {
                const chapter = item.chapter;
                if (!acc[chapter]) {
                    acc[chapter] = { items: [] };
                }
                acc[chapter].items.push(item);
                return acc;
            }, {});

            // Afiseaza array-urile separate
            console.log(chapters);
            setchapters(chapters)
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
        <div className='flex flex-col select-none w-screen max-w-4xl'>
            <div className='flex sm:flex-row flex-col items-center content-center justify-between'>
                <div className='flex flex-col space-y-3 justify-center'>
                    <span className='text-6xl font-bold underline decoration-6 decoration-blue-500'>Fii robot</span>
                    <span className='text-gray-500 text-xl max-w-3xl '>Escape the matrix</span>
                </div>
                <div >
                    <div className='relative w-[100px] h-[100px]'>
                        <Image src={'https://res.cloudinary.com/dvntmruhr/image/upload/v1689724244/UI%20Icons/Robot_xtk2uw.png'} alt='' fill={true} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-5 pb-32 bg-white rounded-xl w-full'>
                {Object.entries(chapters).map(([chapterNumber, chapter]) => (
                    <div key={'ROBOZONE_CHAPTER_DIV_' + chapterNumber} className='p-10 rounded-xl shadow-md border flex flex-col space-y-4 border-gray-100'>
                        <span className='font-bold decoration-2 text-xl decoration-blue-500 underline'>Capitolul {chapterNumber}</span>
                        <div className='grid grid-cols-2 gap-5'>
                            {chapter.items?.map((item, index) => (
                                <div onClick={() => router.push('/post/'+item.id)} className='flex flex-col cursor-pointer justify-between hover:shadow-md transition duration-300 ease-in-out hover:-translate-y-[10px] rounded-xl space-y-2'>
                                    <Postcard id={item.id} title={item.title} description={item.subtitle} community={false} likes={item.liked_by.length} creatorpic={item.creator_pic} creatorname={item.creator_name} ordine={index+1}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}