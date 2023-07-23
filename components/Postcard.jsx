import { useRouter } from "next/router";
import { HeartIcon } from "@heroicons/react/solid";
import Image from "next/image";
import moment from "moment";

export default function Postcard({
  title,
  description,
  id,
  community = false,
  likes = 0,
  creatorpic,
  creatorname,
  editing = false,
  created,
  ordine,
}) {
  const maxLength = 40;
  const router = useRouter();
  const truncatedDesc = description?.substring(0, maxLength) + "...";

  function time(time) {
    var m = moment(time);
    return m.fromNow();
  }

  if (community) {
    return (
      <div
        onClick={() => router.push("/post/" + id)}
        className="flex flex-col hover:-translate-y-[10px] cursor-pointer hover:shadow-md space-y-3 transition duration-300 ease-in-out bg-white border justify-between rounded-xl p-5 shadow "
      >
        <div className="flex flex-row w-full justify-between items-center content-center">
          <span className="underline decoration-4 decoration-blue-600 font-bold text-lg">
            {title}
          </span>
        </div>
        <span className="text-black text-opacity-40 font-normal text-md">
          {truncatedDesc}
        </span>
        <span className="flex flex-row justify-between text-xs text-black text-opacity-40">
          <div className="flex flex-row items-center content-center">
            <Image
              src={creatorpic}
              width={30}
              height={30}
              alt=""
              className="rounded-full shadow"
            />
            <div className="flex flex-col justify-center">
              <label className="text-black px-[10px]">{creatorname}</label>
              <label className="text-xs px-[10px]">{time(created)}</label>
            </div>
          </div>
          <div className="rounded-full  flex flex-row items-center content-center ">
            <HeartIcon className={"w-7 h-7 text-red-500 p-1 rounded-full"} />
            <span className="text-red-500 px-1 text-xs">
              {likes} aprecieri{" "}
            </span>
          </div>
        </span>
      </div>
    );
  } else {
    return (
      <div
        onClick={
          editing
            ? () => router.push("/edit/" + id)
            : () => router.push("/post/" + id)
        }
        className="flex flex-col hover:-translate-y-[10px] cursor-pointer hover:shadow-md space-y-3 transition duration-300 ease-in-out bg-white border justify-between rounded-xl p-5 shadow"
      >
        <div className="flex flex-row w-full justify-between items-center content-center">
          <span className="underline decoration-4 decoration-blue-600 font-bold text-lg">
          {
            ordine ? <>{`${ordine}. ${title}`}</> : <>{title}</> 
          }
          </span>
        </div>
        <span className="text-black text-opacity-40 font-normal text-md">
          {truncatedDesc}
        </span>
        <span className="flex flex-row justify-end text-xs text-black text-opacity-40">
          <div className="flex flex-row items-center content-center ">
            <HeartIcon className={"w-7 h-7 text-red-500 p-1 rounded-full"} />
            <span className="text-red-500 px-1 text-xs">
              {likes} aprecieri{" "}
            </span>
          </div>
        </span>
      </div>
    );
  }
}
