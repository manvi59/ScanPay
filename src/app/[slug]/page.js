"use client"
 
import { useParams } from "next/navigation";
import Design from "../design/page";
 

export default function Home() {
  const params = useParams();
 
   return (
    <div 
     
    >
     
       <Design mainSlug={params?.slug}/>
       
      </div>

  );
}
