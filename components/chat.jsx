'use client'
import { useState, useEffect } from 'react';
import openai from '../utils/openai';
// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
//     apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);
// const prompt = "Esti un asistent AI antrenat pentru a raspunde intrebarilor legate strict de o lectie de robotica, in caz contrar, explici politicos faptul ca intrebarea nu are legatura cu robotica. Iata mesajul: "

export default function Chat(props){
    const [messages, setMessages] = useState("");
    const [response, setResponse] = useState("");

    async function openAIRequest() {
        const response = await fetch('/api/hello',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: "Cat e 2+2?" }),
        })
        const data = await response.json();
        console.log(data); // Handle the response data here
    }

    return (
        <div className={props.classes}>
            <div>
                <h2>Nelamuriri legate de Dani Mocanu?</h2>
                <h3>Scrie aici ca le dovedim noi bro</h3>
                <div>
                    <textarea onChange={(e) => setMessages(e.target.value)} placeholder="Send your message here" id="" cols="30" rows="10"></textarea>
                    {
                        response !== "" ? 
                        <h3>{response}</h3>
                        :
                        null
                    }
                    <button onClick={openAIRequest} className='py-[100px] px-10px bg-white'>Raspunde la intrebare</button>
                </div>
            </div>
        </div>
    );
};


