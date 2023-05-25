import Logo from "./logo"

export default function Footer(props){
    return(
        <div className={props.classes}>
            <div className="flex items-start justify-around px-[500px] py-[15px] darkLightBackground">
                    <div className="flex flex-col justify-start items-start px-[70px]">
                        <p className="textColorDark text-2xl font-semibold py-[20px]">About Us</p>
                        <p className="textColorDark text-xl font-medium py-[5px]">About</p>
                        <p className="textColorDark text-xl font-medium py-[5px]">Blog</p>
                        <p className="textColorDark text-xl font-medium py-[5px]">Story</p>
                    </div>
                    <div className="flex flex-col justify-start items-start px-[70px]">
                        <p className="textColorDark text-2xl font-semibold py-[20px]">Support</p>
                        <p className="textColorDark text-xl font-medium py-[5px]">FAQ</p>
                        <p className="textColorDark text-xl font-medium py-[5px]">Contact Us</p>
                    </div>                
                    <div className="flex flex-col justify-start items-start px-[70px]">
                        <p className="textColorDark text-2xl font-semibold py-[20px]">Ghid</p>
                        <p className="textColorDark text-xl font-medium py-[5px]">Ghid utilizare</p>
                        <p className="textColorDark text-xl font-medium py-[5px]">Ghid suport</p>   
                    </div>                
            </div>
        </div>  
    )
}