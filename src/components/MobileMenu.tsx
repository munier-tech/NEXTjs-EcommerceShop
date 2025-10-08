"use client"
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import SideBarMenu from './SideBarMenu';

const MobileMenu = () => {

  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsMenuBarOpen(!isMenuBarOpen)} className='text-gray-500 hover:text-green-400 hoverEffect cursor-pointer md:hidden flex' title="Open menu" aria-label="Open menu">
        <AlignLeft/>
      </button>
      <SideBarMenu isOpen={isMenuBarOpen} onClose={() => setIsMenuBarOpen(false)} />
    </div>
  )
}

export default MobileMenu
