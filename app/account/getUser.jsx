import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default async function GetUser(){
    const [supabase] = useState(() => createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ));

    const { data: { user } }  = await supabase.auth.getUser();

    return user;
}