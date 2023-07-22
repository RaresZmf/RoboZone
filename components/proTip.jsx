import Image from "next/image";
import { useState } from "react";
import Typewriter from 'typewriter-effect';



export default function ProTip(){
    
    const [show, setShow] = useState(false);
    const [proTip, setProTip] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function openAIRequest() {
        const messages = "Vreau sa imi generezi un pro tip foarte foarte scurt, maxim 15 cuvinte pentru un loading screen pentru un website despre arduino. Învăță C/C++ pentru Arduino. Este esențial pentru înțelegerea hardware-ului; 2. Folosește motoare pas cu pas pentru precizie mai mare în mișcare; 3. Un voltmeter este vital pentru testarea circuitelor; 4. Învăță despre PWM pentru controlul vitezei motorului; 5. Bateriile LiPo oferă un raport bun putere-greutate; 6. Folosește condensatori pentru a preveni interferențele electromagnetice; 7. Învăță Python. Este folosit în multe platforme de robotică; 8. Familiarizează-te cu legile lui Ohm și Kirchhoff; 9. Învață despre senzori ultrasonici pentru detectarea distanței; 10. Senzorii de temperatură sunt esențiali pentru prevenirea supraîncălzirii; 11. Învăță despre Raspberry Pi pentru aplicații de robotică complexe; 12. Biblioteca Servo în Arduino este utilă pentru controlul motorului; 13. Folosește un breadboard pentru prototiparea rapidă; 14. Familiarizează-te cu PID pentru un control mai bun al motorului; 15. Senzorii de mișcare pot adăuga funcționalitate autonomă; 16. Un osciloscop poate ajuta la diagnosticarea problemelor de semnal; 17. Folosește cuplaje flexibile pentru a preveni tensiunile pe ax; 18. Familiarizează-te cu ROS pentru aplicații de robotică avansate; 19. Învăță despre comunicațiile I2C și SPI pentru periferice; 20. Întotdeauna testează într-un mediu sigur înainte de utilizarea pe scară largă. Te rog sa te inspiri din pro tipurile furnizate, si sa il generezi cat mai catchy. Vreau sa generezi un signur pro tip."
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
        <div className="relative d-flex justify-content-end">
            <button onClick={function(){openAIRequest()}} disabled={loading}>
                <Image src={'https://res.cloudinary.com/dvntmruhr/image/upload/v1689724243/UI%20Icons/Chatbot_f8xvfz.png'} width={300} height={300} alt="" className='animate-floatingsmall2' />
            </button>
            {
            show && proTip.length > 0 && proTip.length < 100 && 
            <div className="absolute top-[55%] align-self-start whitespace-nowrap right-[90%]">
                <div className="border-2 border-primary rounded-xl rounded-tr-none py-[5px] px-[5px]">
                <Typewriter
                    key={proTip}
                    options={{autoStart: true, loop: false, delay: Math.random() * (75 - 25) + 25}}
                    onInit={(typewriter) => {
                        typewriter.typeString(proTip)
                            .start();
                    }}
                />
                </div>
            </div>
            }
        </div>
    )
}