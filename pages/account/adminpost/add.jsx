import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Editor = dynamic(
    () => import("../../../components/EditorAdminPost"),
    { ssr: false }
  );

import { useUser } from '@auth0/nextjs-auth0/client';

export default function PostCommunity() {
    const {user} = useUser()

    return (
        <>
            <div className='flex flex-col w-[800px] space-y-3'>
                <Editor user={user.sub} user_pic={user.picture} user_name={user.nickname} />
            </div>
        </>
    )
}