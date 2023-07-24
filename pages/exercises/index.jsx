import { useRouter } from "next/router";
import supabase from "../../utils/supabase";
import { useState, useEffect } from "react";
import Image from "next/image";
import Excard from "../../components/Excard";

export default function ExIndex() {
    const [exes, setexes] = useState([])
    const router = useRouter();

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("quiz")
                .select("*")
                .order("id", { ascending: true });

            if (error) {
                console.error(error);
                return null;
            }
            setexes(data);
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
        <div className='flex flex-col select-none w-screen max-w-4xl space-y-5'>
            <div className='flex sm:flex-row flex-col items-center content-center justify-between'>
                <div className='flex flex-col space-y-3 justify-center text-center sm:text-left items-center sm:items-start'>
                    <span className='text-6xl font-bold underline decoration-6 decoration-blue-500'>Exerci&#355;ii</span>
                    <span className='text-gray-500 text-xl max-w-3xl '>Cocalarii îi învață pe cocalari robotikă</span>
                </div>
                <div className='animate-floatingsmall2'>
                    <div className='relative left-[20vw] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] sm:left-0'>
                        <Image src={'https://res.cloudinary.com/dvntmruhr/image/upload/v1689903258/Brain_Chip_fd9avb.png'} alt='' width={300} height={300} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-5 pb-32 bg-white rounded-xl w-full'>
                <div className='grid grid-cols-1 sm:grid-cols-2 px-[9%] sm:px-[0%] gap-5'>
                    {exes.map((item) => (
                        <div className='' key={'ROBOZONE_COMMUNITY_EX_X_' + item.id} onClick={() => router.push('/exercises/' + item.form_id)}>
                            <Excard id={item.id} title={item.title} description={item.subtitle}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}