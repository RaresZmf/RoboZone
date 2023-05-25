import Image from 'next/image'
import './globals.css'
import Thumbnail from '@/components/lectieThumbnail'
import NavBar from '@components/header'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="color_light flex flex-col items-center justify-start mt-[80px] text-6xl">
      <Link href="http://localhost:3000/register">REGISTER</Link>
      <Link href="http://localhost:3000/login">Login</Link>
      <Link href="http://localhost:3000/account">Account</Link>
    </main>
  )
}