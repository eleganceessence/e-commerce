'use client'

import Link from "next/link"

export default function Nav() {
  return (
    <div className="flex fixed w-full h-[50px] ">
      <div>
        <Link>Store</Link>
        <Link>About</Link>
        <Link>Contact</Link>
      </div>
      
      <div>
        Name
      </div>
      
      <div>
        <Link>Store</Link>
        <Link>Store</Link>
      </div>
    </div>
  )
}