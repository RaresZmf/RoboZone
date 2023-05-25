"use client";
import React from 'react';
import GetUser from './getUser';
import { useState } from "react";


export default async function Page(){
    const user = await GetUser();
    console.log(user);

    const [supabase] = useState(() => createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ));

    if(0)
    {
    return (
        <main>
            <div className='flex flex-col justify-center items-center'>
                    <p className='color_light text-5xl text-left sm:text-center mt-[100px] mb-[50px]'>Nu esti logat</p>   
                    <a className='login_buton text-center' href='/login'>Login</a>
            </div>
        </main>  
    )}
    {
        return (
            <main>
                <div className='flex color_light justify-center'>
                    {console.log('logged')}
                    <div className='border_primary w-[400px] border-4 rounded-lg text-left mt-[50px] p-[10px]'>
                        email : {user.email} <br></br>
                        creat in : {user.created_at.substring(0,10)}
                    </div>
                </div>
            </main>  
        ) 
    }
}