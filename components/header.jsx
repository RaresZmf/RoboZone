import Link from "next/link";

export default function NavBar(){
    return (
        <div className="w-full flex justify-between items-center px-[300px] py-[20px] darkLightBackground">
            <Link className="text-3xl font-black logoGradient stroke-[10px]" href="http://localhost:3000/">RoboZone</Link>
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold px-5 text-zinc-200">About</p>
                <hr className="rotate-90 w-[15px] border-x-[20px] border-zinc-200"></hr>
                <p className="text-2xl font-bold px-5 text-zinc-200" >Home</p>
            </div>
        </div>
    )
}