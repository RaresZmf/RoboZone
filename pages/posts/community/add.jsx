import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Editor = dynamic(
    () => import("../../../components/Editorpost"),
    { ssr: false }
  );

import { useUser } from '@auth0/nextjs-auth0/client';

export default function PostCommunity() {
    const {user} = useUser()

    return (
        <>
            <div className='px-[8vw] flex flex-col max-w-[800px] space-y-3 pb-[50px]'>
                <Editor user={user.sub} user_pic={user.picture} user_name={user.nickname} />
            </div>
        </>
    )
}