"use client"
import React from 'react'
import { usePathname } from 'next/navigation';

const Header = () => {
    const router = usePathname();
    const links = [{
        name: "Home",
        path: "/"
    },{ name: "Modell",
        path: "/modell"},
    {   name: "Contact",
        path: "/contact"}]
  return (
    <div className="w-full h-[60px] fixed top-0 flex justify-between px-10">
        <div className="text-[12px]"> Here is Logo..</div>
        <div className="flex flex-row">
            links.map(({path, name}) => { return(
                <a key={name} href={`${path}`} className={`${router === `${path}` ? "scale-110" : "scale-100" } transition-all self-center px-4 cursor-pointer`}>{name}</a>
            )}) 
        </div>
    </div>
  )
}

export default Header