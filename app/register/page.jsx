"use client";
import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';



const page = () => {

    const routers = useRouter();

    const [supabase] = useState(() => createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ));

    const [emailval, setEmailVal] = useState("");
    const changeEmail = (event) => {
        setEmailVal(event.target.value)
    }

    const [passval, setPassVal] = useState("");
    const changePass = (event) => {
        setPassVal(event.target.value)
    }

    const signUp = () => {
        supabase.auth.signUp({
            email: emailval,
            password: passval,
        })
        routers.push("/welcome");
    }

    return (
        <main>
            <div className="login_title">Register Page</div>
            <div className='flex flex-col items-center'>
                <input className='login_form' onChange={changeEmail} type='email' placeholder='email' id='email'></input>
                <input className='login_form' onChange={changePass} type='password' placeholder='password' id='pass'></input>
                <button className='register_buton' onClick={signUp}>Register</button>
            </div>
        </main>
  )
}
export default page