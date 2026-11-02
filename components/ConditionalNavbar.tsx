"use client"
import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";

function ConditionalNavbar(){
    const pathname = usePathname();

    if(pathname === "/isAdmin" || pathname === "/admin" || pathname === "/login"){
        return null;
    }
   return <Navbar/>
}

export default ConditionalNavbar;