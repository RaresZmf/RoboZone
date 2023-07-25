import supabase from '../../utils/supabase';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Postcard from '../../components/Postcard';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';


export default function CourseView() {
    const [articles, setarticles] = useState([])
    const [chapters, setchapters] = useState([])
    const router = useRouter();
    const { user, isLoading } = useUser();
    const [isadmin, setisadmin] = useState(false)

    async function fetchAdmin() {
        const { data, error } = await supabase
            .from('authdata')
            .select("admin")
            .eq("auth0id", user.sub)
            .limit(1);
        setisadmin(data[0].admin)
    }

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("MD")
                .select("*")
                .eq("community", false)
                .limit(100)
                .order("number", { ascending: true });

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
        fetchAdmin()
    }, [])

    function addPost() {
        router.push('/posts/adminpost')
    }

    function editPost() {
        router.push('/posts/editpost')
    }

    return (
        <div className='flex flex-col select-none w-screen max-w-4xl'>
            <div className='flex sm:flex-row flex-col items-center content-center justify-between'>
                <div className='flex flex-col sm:mx-[10%] space-y-3 justify-center'>
                    <span className='text-4xl md:text-6xl text-center font-bold underline decoration-6 decoration-blue-500'>Lectii</span>
                    <span className='text-gray-500 text-xl max-w-3xl text-center'>Universul Roboticii în 9 capitole</span>
                    <div className='flex items-center flex-col sm:flex-row align-items-center justify-center content-center sm:space-x-6'>
                        {isadmin && (
                            <>
                                <button onClick={addPost} className="w-[150px] h-[35px] my-[5px] sm:my-[20px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl" round>Adauga o lectie</button>
                                <button onClick={editPost} className="w-[150px] h-[35px] my-[5px] sm:my-[20px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl" round>Editeaza o lectie</button>
                            </>
                            
                        )}
                    </div>
                </div>
                <div >
                    <div className='animate-floatingsmall2 relative w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] sm:right-0'>
                        <Image src={'https://res.cloudinary.com/dvntmruhr/image/upload/v1689724244/UI%20Icons/Robot_xtk2uw.png'} alt='' fill={true} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-5 pb-32 bg-white rounded-xl w-full'>
                {Object.entries(chapters).map(([chapterNumber, chapter]) => (
                    <div key={'ROBOZONE_CHAPTER_DIV_' + chapterNumber} className='p-10 rounded-xl shadow-md border flex flex-col space-y-4 border-gray-100'>
                        <span className='font-bold decoration-2 text-xl decoration-blue-500 underline'>Capitolul {chapterNumber}</span>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {chapter.items?.map((item, index) => (
                                <div onClick={() => router.push('/post/' + item.id)} className='flex flex-col cursor-pointer justify-between transition duration-300 ease-in-out hover:-translate-y-[10px] rounded-xl space-y-2'>
                                    <Postcard id={item.id} title={item.title} description={item.subtitle} community={false} likes={item.liked_by.length} creatorpic={item.creator_pic} creatorname={item.creator_name} ordine={index + 1} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}