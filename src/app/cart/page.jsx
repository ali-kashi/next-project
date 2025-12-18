import ClientFile from "./clientFile"

export function generateMetadata(){
    return {
        title: "Home|Your online cart",
        description: "Browse amazing cart products...",
        openGraph:{
            title: "Home|Your online cart social media",
            description: "Browse amazing cart products social media",
        }
    }
}

export default function Cart()
{
    return(
       <ClientFile/>
    )
}