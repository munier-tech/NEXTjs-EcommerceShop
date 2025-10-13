import { Facebook, Instagram, Linkedin } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SocialMedia = ({ className , iconClassName} : { className?: string  , iconClassName?: string }) => {

  const socialMedia = [
    {title: 'Facebook', icon: <Facebook/>, link: 'https://www.facebook.com'},
    {title: 'Instagram', icon: <Instagram/>, link: 'https://www.instagram.com'},
    {title: 'Linkedin', icon: <Linkedin/>, link: 'https://www.Linkedin.com'},
  ]
  return (
    <TooltipProvider>
      <div className='flex gap-2 items-center' >
        {socialMedia?.map((item) => (
          <Tooltip key={item?.title}>
          <TooltipTrigger asChild>
          <Link href={item.link} target='_blank' className={cn('border-2 text-gray-400 rounded-full p-2  hover:text-white hover:border-green-400 hoverEffect mr-2', className)} >
            <span>
              {item?.icon}
            </span>
          </Link>
          </TooltipTrigger>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export default SocialMedia
