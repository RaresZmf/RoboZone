'use client'
import { useState } from "react"


export default function ProTipComponent(){
    const [proTip, setProTip] = useState("")
    const proTipPrompt = "Vreau sa imi generezi un pro tip foarte foarte scurt, maxim 15 cuvinte pentru un loading screen pentru un website despre arduino. Uite o lista de pro tips dintr-un joc video, dar care sunt in engleza. Eu imi doresc pro-tip-ul in romana:Nearby questgivers that are awaiting your return are shown as a question mark on your mini-map. Your spell casting can be cancelled by moving, jumping or hitting the escape key. Clicking on a player name in the chat window lets you send a private message to them. If you <Shift>Click on a player name in the chat window it tells you additional information about them. You can <Control>-Click on an item to see how you would look wearing that item. An item with its name in gray is a poor quality item and generally can be sold to a vendor. An item with its name in white is useful to players in some way and can be used or sold at the auction house. If you are lost trying to complete a quest, the quest log will often tell you what to do next. You can send mail to other players or even to your other characters from any mailbox in game. You can <Shift>-Click on an item to place an item link into a chat message. Vreau sa respecti cu strictete limita de 15 cuvinte, orice ar fi, si sa nu uiti ca proTip-urile sunt pentru arduino"
    
    async function openAIRequest() {
        const response = await fetch('/api/hello',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt:  proTipPrompt}),
        })
        const data = await response.json(); //AI's response
        setProTip(data);
    }

    useState(() => {
        openAIRequest();
    });

    return(
        <div>
            {
                proTip.length < 150 ?
                    <div className="border-2 border-primary mt-[60px] flex justify-start items-center rounded-2xl">
                        <p className="py-[20px] px-[25px] text-xl">{proTip}</p>
                        <button className=" bg-darker py-[25px] rounded-r-2xl px-[20px] text-lg" onClick={function(){openAIRequest()}}>Genereaza <br /> ProTip</button>
                    </div>
                :
                    <div>
                        <button className="bg-darker py-[25px] px-[20px] rounded-2xl mt-[60px] text-xl" onClick={function(){openAIRequest()}}>Genereaza Pro Tip</button>
                    </div>
            }
        </div>
    )
}
