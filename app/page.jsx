import './globals.css'
import Link from 'next/link'
import Lectii from './homePage/page'
// import { LectiiIntroducere } from './homePage/page'
import { LectiiIntroducere } from './homePage/page'
import Line from "components/line"
import ProTipComponent from "components/proTip"

export default function Home() {

  return (
    <main className="color_light flex flex-col items-center justify-start mt-[80px]">
      <div className='w-[85%] md:w-[800px]'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex items-start justify-center'>
            <h1 className="text-5xl mr-[10px] font-semibold">Invata </h1><h1 className='text-5xl ml-[10px] logoGradient font-semibold'>robotica</h1>
          </div>
          <div className='mt-[70px] flex flex-col sm:flex-row items-center  justify-center font-bold'>
            <Link href="http://localhost:3000/login" className="px-[58px] py-[17px] my-[10px] sm:my-[0px] sm:mx-[30px] text-2xl backgroundPrimary textColorLight rounded-xl ">
              Login
            </Link>
            <Link href="http://localhost:3000/register" className="px-[45px] py-[17px] my-[10px] sm:my-[0px] sm:mx-[30px] text-2xl backgroundSecondary textColorLight rounded-xl ">
              Sign Up
            </Link>
          </div>
          <ProTipComponent />
        </div>
        <div className='lessonsWrap mt-[80px] mb-[50px]'>
          <div>
            <h2 className='text-2xl'>Lectii de introducere</h2>
            <Line />
            {/* <Posts/> */}
            <LectiiIntroducere />
            <Link href="http://localhost:3000/lessons">
              <p className='text-right my-[20px] text-xl font-semibold text-primary'>Citeste Mai Mult</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
