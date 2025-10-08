import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({className , spanDesign} : {className?: string , spanDesign?: string}) => {

 

  return (
    <Link href={"/"} className={cn("text-2xl font-black text-green-950 tracking-wider hover:text-green-700 hoverEffect group font-sans" , className )} >
      MASSDRO<span className={cn("group-hover:text-green-950 hoverEffect text-green-700", spanDesign)} >P</span>
    </Link>
  )
}

export default Logo
