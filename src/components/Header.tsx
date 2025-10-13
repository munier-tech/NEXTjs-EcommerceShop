import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeadeMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavouriteButton from './FavouriteButton'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs'

const Header = async  () => {

  const user = await currentUser()
  console.log(user)

  return (
    <header
     className='m-auto py-5 backdrop-blur-3xl bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 text-black border-b border-b-black/20 sticky top-0 z-50'>
      <Container>
        
      
      <div className='flex items-center justify-between'>
        {/* logo */}
      <div className='flex w-auto md:w-1/3 gap-2.5 md:gap-0 items-center justify-start'>
        <MobileMenu/>
        <Logo/>
      </div>
      {/* nav */}
      <nav className=' transform hover:scale-105 transition-transform duration-200'>
        <HeaderMenu/>
      </nav>
      <div className='flex w-auto md:w-1/3 items-center justify-end gap-5'>
       <div className='hidden sm:block transform hover:scale-110 transition-transform duration-200'>
         <SearchBar/>
       </div>
       <div className='transform hover:scale-110 transition-transform duration-200 hover:text-rose-500'>
         <CartIcon/>
       </div>
       <div className='transform hover:scale-110 transition-transform duration-200 hover:text-rose-500'>
         <FavouriteButton/>
       </div>
       <ClerkLoaded>
       <div className='transform hover:scale-105 transition-transform duration-200'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
         {!user && <SignIn/>}
       </div>
       </ClerkLoaded>
      </div>
      </div>
      </Container>
    </header>
  )
}

export default Header