import { useEffect, useState } from 'react';

const initPrompt = "Esti un asistent AI cu rolul de a raspunde intrebarilor legate strict de o lectie de robotica, in caz contrar, explici politicos faptul ca intrebarea nu are legatura cu robotica. Uite o lectie in format JSON pentru context, iar la final intrebarea elevului. Lectia si intrebarea sunt despartite de caracterele '%%%'. Orice ai face nu mentiona caracterele %%%."



export default function Chat(props){
    const [messages, setMessages] = useState("");
    const [response, setResponse] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");



async function openAIRequest() {
    setMessages("");
    setResponse("");
    setDisplayMessage(messages);
    const response = await fetch('/api/posts/chatLectieAPI',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: initPrompt + JSON.stringify(props.lessonContent) + "%%%" + messages }),
        })
        const data = await response.json(); //AI's response
        setResponse(data);
    }

    return (
        <div className={props.classes}>
            <div className="max-w-[800px]">
                <div className="">
                    {
                        displayMessage !== "" ?
                        <div className='flex justify-end items-center my-[25px]'>
                            <div className='bg-primary py-[15px] px-[22px] rounded-2xl max-w-[70%]'>
                                <p className="text-white text-2xl whitespace-normal">{displayMessage}</p>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="">
                    {
                        response !== "" ?
                        <div className='flex justify-start items-center my-[25px]'>
                            <div className='bg-secondary py-[15px] px-[22px] rounded-2xl max-w-[70%]'>
                                <p className="text-white text-2xl whitespace-normal">{response}</p>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <div className='flex flex-center items-stretch my-[20px]'>
                    <textarea 
                    onChange={(e) => setMessages(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          openAIRequest();
                        }
                    }}
                    value={messages} placeholder="Send your message here" 
                    className='bg-transparent border-2 border-r-0 rounded-l-3xl border-primary placeholder-gray-500 w-full h-20 focus:outline-none text-black text-xl pt-[22px] pb-[8px] pl-[30px] pr-[50px] resize-none' 
                    id="" cols="30" rows="10">
                    </textarea>
                    <button onClick={openAIRequest} className='text-2xl px-[20px] bg-darker text-light rounded-r-3xl bg-transparent border-2 border-l-[0px] border-primary'>Trimite</button>
                </div>
            </div>
        </div>
    );
};


 