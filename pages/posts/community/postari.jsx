import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../../utils/supabase";
import Postcard from "../../../components/Postcard";
import Image from "next/image";

const postari = () => {
  const { user, isLoading } = useUser();
  const [articles, setarticles] = useState([]);
  const router = useRouter();

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("MD")
        .select("*")
        .eq("community", true)
        .eq("creator", user.sub)
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        return null;
      }
      setarticles(data);
      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col space-y-5 pb-32 bg-white rounded-xl w-full">
      <div className="flex flex-row items-center content-center justify-between">
        <div className="flex flex-col space-y-3 justify-center">
          <span className="text-6xl font-bold underline decoration-6 decoration-blue-500">
            Editeaza postarile
          </span>
          <span className="text-gray-500 text-xl max-w-3xl ">
            Apasa pe o postare pentru a o edita
          </span>
        </div>
        <div className="animate-floatingsmall2">
          <Image
            src={
              "https://res.cloudinary.com/dvntmruhr/image/upload/v1689773313/Data_Learning_ake15t.png"
            }
            alt=""
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {articles.map((item) => (
          <div
            className="h-full"
            key={"ROBOZONE_COMMUNITY_POST_X_" + item.id}
            onClick={() => router.push("/edit/" + item.id)}
          >
            <Postcard
              id={item.id}
              title={item.title}
              description={item.subtitle}
              community={false}
              likes={item.liked_by.length}
              creatorpic={item.creator_pic}
              creatorname={item.creator_name}
              editing={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default postari;
