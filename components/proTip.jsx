import { useState } from "react";
import Typewriter from 'typewriter-effect';



export default function ProTip(props){
    
    const [show, setShow] = useState(false);
    const [proTip, setProTip] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function openAIRequest() {
        const messages = "Scrie un scurt (maxim 10 cuvinte) fun fact despre domeniul tehnologiei"
        setProTip("")
        setLoading(true);
        setShow(true);
        console.log(show); 
        const response = await fetch('/api/posts/proTipAPI',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: messages }),
        })
        const data = await response.json(); //AI's response
        if(data.length < 100){setProTip(data);}
        setLoading(false);
    }

    return(
        <div className={props.classes + "relative flex justify-content-end"}>
            {
            show && proTip.length > 0 && proTip.length < 100 && 
            <div className="absolute hidden md:block top-[55%] align-self-start md:whitespace-nowrap right-[90%]">
                <div className="border-2 border-primary rounded-xl py-[5px] px-[5px]">
                <p className="w-[50vw] sm:w-[100%]">
                    <Typewriter
                        key={proTip}
                        options={{autoStart: true, loop: false, delay: Math.random() * (75 - 25) + 25}}
                        onInit={(typewriter) => {
                            typewriter.typeString(proTip)
                                .start();
                        }}
                    />
                </p>
                </div>
            </div>
            }
        </div>
    )
}