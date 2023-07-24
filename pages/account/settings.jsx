import React from 'react';
import { Row, Col } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';
import supabase from '../../utils/supabase';
import { useState, useEffect } from 'react';

function Profile() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  function userLogOut() {
    router.push('/api/auth/logout')
  }

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <div className="flex flex-col sm:mx-[0px] sm:flex-row align-center justify-evenly items-center space-x-4 sm:border-4 border-blue-500 rounded-xl p-[40px]">
          <div className='flex flex-col justify-center'>
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-circle rounded-full img-fluid profile-picture mb-3 mb-md-0"
              decode="async"
              data-testid="profile-picture"
            />
            <button onClick={userLogOut} className="w-[150px] h-[35px] my-[5px] sm:my-[20px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl" round>Logout</button>
          </div>
          <div className="flex flex-col space-y-6 ml-[50px] p-[20px]">
            <div>
              <p className='text-bold opacity-50'>nickname</p>
              <p className='border-4 rounded-l p-[5px]'>{user.nickname}</p>
            </div>
            <div>
              <p className='text-bold opacity-50'>email</p>
              <p className='border-4 rounded-l p-[5px]'>{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
