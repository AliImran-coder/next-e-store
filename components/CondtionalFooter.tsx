"use client"
import { usePathname } from "next/navigation";

import FooterNavbar from "@/components/Footer";


function ConditionalFooter(){
    const pathname = usePathname();

    if(pathname === "/isAdmin" || pathname === "/admin" || pathname ==="/login"){
        return null;
    }

    return <FooterNavbar/>
}

export default ConditionalFooter;