'use client'

import Link from "next/link"

export default function Nav() {
  return (
    <div className="flex fixed w-full h-[50px] ">
      <div>
        <Link href="#">Store</Link>
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>
      </div>
      
      <div>
        Name
      </div>
      
      <div>
        <Link href="#">Store</Link>
        <Link href="#">Store</Link>
      </div>
    </div>
  )
}