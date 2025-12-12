'use client'

import Link from "next/link"

export default function Nav() {
  return (
    <div className="flex fixed w-full h-[50px] justify-between items-center">
      <div className="flex items-center gap-10">
        <Link href="#">Store</Link>
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>
      </div>
      
      <div>
        Name
      </div>
      
      <div className="flex items-center gap-10">
        <Link href="#">Store</Link>
        <Link href="#">Store</Link>
      </div>
    </div>
  )
}