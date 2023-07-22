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
  const [isadmin, setisadmin] = useState(false)
  const router = useRouter();

  function userLogOut() {
    router.push('/api/auth/logout')
  }

  function routeLectie() {
    router.push();
  }

  async function fetchAdmin() {
    const { data, error } = await supabase
        .from('authdata')
        .select("admin")
        .eq("auth0id", user.sub)
        .limit(1);
        setisadmin(data[0].admin)
  }

  useEffect(() => {
    fetchAdmin();
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left" data-testid="profile">
            <Col md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decode="async"
                data-testid="profile-picture"
              />
            </Col>
            <Col md>
              <h2 data-testid="profile-name">{user.name}</h2>
              <p className="lead text-muted" data-testid="profile-email">
                {user.email}
              </p>
            </Col>
          </Row>
          <Row data-testid="profile-json">
            <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
          </Row>
          <div className='flex align-items-center justify-center'>
              <button onClick={userLogOut} className="w-[100px] h-[35px] my-[20px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl" round>LogOut</button>
              {isadmin && (
               <>
                 <button onClick={routeLectie} className="w-[150px] h-[35px] my-[20px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl ml-[20px]" round>Adauga o Lectie</button>
                </>
              )}
          </div>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
